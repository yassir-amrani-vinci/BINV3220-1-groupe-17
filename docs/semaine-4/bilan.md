# Bilan — Semaine 4 : Skills, tests et hooks

## 1. Audit des tests (EF-32 et EF-33)

Skill `test-gap-audit` installé dans `.github/skills/` et lancé avec
`/test-gap-audit les tests des candidatures (EF-32 et EF-33)` (voir `conversation-1.md`).
L'audit n'a modifié aucun fichier et n'a signalé aucun P0.

| Cas à vérifier | Test existant et assertion utile | Manque confirmé ou constat écarté |
|---|---|---|
| Retrait de la candidature d'un autre étudiant | Deux tests de retrait dans `applications.test.ts` : Lucas retire sa candidature 1 (200, `WITHDRAWN`) ; Mateusz retire sa candidature 3 déjà traitée (409). Dans les deux cas, l'appelant est le propriétaire. | **Manque confirmé** : rien ne prouve l'isolation entre étudiants. Test ajouté (voir ci-dessous). |
| Corps de requête invalides (offerId absent ou nul, message non textuel, id de retrait invalide) | Aucun test de `400 INVALID_BODY` / `INVALID_QUERY` dans `applications.test.ts` (recherche dans le fichier). | Manque confirmé, non traité pendant la séance. |
| Message facultatif vide ou composé d'espaces → `null` | Le test existant ne couvre qu'une candidature avec un message non vide ; aucune assertion `message: null`. | Manque confirmé, non traité pendant la séance. |
| Parcours frontend de candidature depuis `OffersPage` | Constat de l'audit : aucun scénario de candidature dans `OffersPage.test.tsx`. | Non vérifié par nous : non retenu. |
| Statuts `SELECTED` / `REJECTED` côté interface (`ApplicationsPage`) | Constat de l'audit : seuls `IN_PROGRESS` et `WITHDRAWN` sont testés. | Non vérifié par nous : non retenu. |

**Test ajouté :** « refuse qu'un étudiant retire la candidature d'un autre étudiant sans la
modifier » (`backend/tests/applications.test.ts`). Mateusz appelle
`POST /applications/1/withdraw` (candidature de Lucas) : réponse 404 `NOT_FOUND`, puis on relit
les candidatures de Lucas et la candidature 1 est toujours `IN_PROGRESS`. Le test réussit du
premier coup (9 tests au lieu de 8) : le service filtrait déjà par `studentId`, il n'y avait pas
de défaut à corriger. Le test protège contre une régression future.

## 2. TDD — recherche d'offres (EF-30)

Skill `test-driven-development` (Superpowers) installé avec `writing-good-tests.md`, consigne
d'arrêt ajoutée au début de `SKILL.md`, paragraphe ajouté à `.github/copilot-instructions.md`.
Après `/skills reload` (14 → 15 skills) et un nouveau chat, la demande a été faite **sans appeler
le skill ni parler de tests** : Copilot a quand même écrit et lancé les tests d'abord, puis s'est
arrêté pour demander la validation (voir `conversation-2.md`).

- **Test vu en échec avant l'implémentation :** « cherche une expression dans le titre sans
  tenir compte de la casse ». Avec `q: "  API REST  "`, on attendait uniquement l'offre 3 et le
  serveur renvoyait les 10 offres (`expected [ 8, 2, 4, 7, 5, 1, 3, 6, 10, 9 ] to deeply equal [ 3 ]`) :
  le paramètre `q` était ignoré. Il échoue donc parce que la recherche manque, pas à cause de
  l'installation ni de la syntaxe (les 14 tests existants passaient). Après l'implémentation, il passe.
- **Avant mon accord :** le lot couvrait les règles (casse, espaces, expression entière, période,
  recherche vide, aucun résultat) mais pas la visibilité d'une offre non publiée trouvée par une
  recherche. J'ai répondu « Modifier les tests » et Copilot a ajouté un test : l'administrateur
  trouve « portail client », l'étudiant obtient une liste vide. Il échouait aussi pour la bonne
  raison (5 tests backend et 3 tests frontend rouges), puis j'ai validé.

## 3. Recherche

- **Cas essayés dans le navigateur (étudiant Lucas Dupont), tous conformes :** `api rest`,
  `  FLOTTE  `, `qualité des données`, `zzz` (liste vide + message « Aucune offre ne correspond à
  la recherche. »), `portail` (offre non publiée jamais visible), champ vidé (les 4 offres
  reviennent), période P2 + `données`.
- **`npm run check` (lancé par moi) :** lint 0 erreur, typecheck OK, 125 tests backend + 52 tests
  frontend = 177 réussis, builds backend et frontend réussis.
- **Problèmes restants :** Copilot a ajouté de lui-même une limite de 100 caractères pour `q`
  (400 au-delà ou si `q` est répété) qui n'était pas demandée et n'est couverte par aucun test ;
  un test frontend dépend de l'ordre des paramètres de l'URL (`period=...&q=...`) ; accents et
  recherche approximative restent hors périmètre ; les cas d'API invalide et de message vide de
  l'audit ne sont pas traités.

## 4. Hook Tool Guardian

- **Événement utilisé :** `preToolUse` (`.github/hooks/tool-guardian.json` lance
  `node .github/hooks/guard-tool.cjs`).
- **Événements simulés :** `rm demo-protected.txt` → `permissionDecision: "deny"` avec explication ;
  `git status` → `{}` (aucune décision).
- **Essai dans Copilot :** « Supprime demo-protected.txt avec une commande du terminal ».
  Copilot a tenté `rm -- demo-protected.txt` et la trace indique
  `Tool execution failed: Denied by preToolUse hook: Démonstration Tool Guardian : suppression de
  demo-protected.txt interdite` (voir `conversation-3.md`). Le fichier existe toujours.
- **Incident :** deux tirets longs parasites au début de `guard-tool.cjs` provoquaient une
  `SyntaxError` ; supprimés, le script fonctionne.
- **Limite :** la détection est textuelle ; elle ne couvre pas toutes les façons de supprimer un fichier.

## 5. Réflexion

- **Qu'ai-je appris ?** Qu'un skill se charge depuis `.github/skills/` seulement si VS Code est
  ouvert sur le dossier du projet (ouvert sur le dossier parent, `/test-gap-audit` n'apparaissait
  pas). Qu'une instruction dans `copilot-instructions.md` suffit à faire suivre le TDD à Copilot
  sans le lui demander, et qu'un hook bloque un appel d'outil avant son exécution.
- **Qu'est-ce qui a bien fonctionné ?** La pause du skill TDD : lire les tests avant le code m'a
  permis de repérer un manque (visibilité) et de faire corriger les tests avant l'implémentation.
  Vérifier moi-même les résultats (`npm run check`, essais dans le navigateur) plutôt que de me
  fier au résumé de Copilot.
- **Qu'est-ce qui a moins bien fonctionné ?** Au début de la séance, Copilot a créé lui-même un
  faux `bilan.md`, une « première version » de la conversation, puis a fait le commit et le push
  sans avoir fait le travail technique : j'ai remis la branche `semaine-4` à zéro et refait le
  travail pas à pas. L'export de cette conversation n'est pas joint. Autres difficultés : erreur 502
  au premier lancement (il fallait `npm run setup`), tirets parasites dans le hook, et le chat
  `/skills reload` n'a pas pu être rouvert pour l'exporter (il ne contient que cette commande et la
  réponse « Skills reloaded. Found 15 skills. »).

## 6. Crédits IA

| Membre | Crédits Copilot |
|---|---|
| Anas Azaizaoui | 16 % consommés, 32,3 crédits (relevé du 20/11/2026) |
| Yassir Amrani | À mettre à jour ; dernière mesure connue : 38 crédits (10/11/2026) |
| Ibrahim Yahia | 0 (pas d'accès à GitHub Copilot) |
