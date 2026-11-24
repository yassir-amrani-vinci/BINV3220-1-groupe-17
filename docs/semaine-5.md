# Bilan — Playwright MCP et tests E2E

## Scénarios

Les deux scénarios sont décrits dans [`e2e/recherche-offres/scenarios.md`](../e2e/recherche-offres/scenarios.md).
Ils utilisent la base de démonstration initialisée, le profil étudiant Lucas Dupont et
les offres publiées visibles par un étudiant.

1. **Recherche avec résultat** : saisir `api rest` ; seule l’offre « API REST de facturation »
   doit rester affichée.
2. **Recherche sans résultat** : saisir `zzz-introuvable` ; aucune offre ne doit rester affichée
   et le message « Aucune offre ne correspond à la recherche. » doit apparaître.

Ces cas couvrent un résultat nominal et une recherche vide, sans modifier les données ni
dépendre de l’ordre d’exécution.

## Playwright MCP

Le serveur MCP local a été lancé avec
`npx -y @playwright/mcp@latest --isolated --port 8931`. La configuration du client est dans
[`.mcp.json`](../.mcp.json). Le backend et le frontend tournaient sur `localhost:3000` et
`localhost:5173`.

Les deux scénarios ont été exécutés dans le navigateur par les outils du serveur MCP,
appelés avec des requêtes HTTP JSON-RPC depuis cette session :

- **Scénario 1 — conforme.** `browser_navigate` a ouvert `http://localhost:5173` et a renvoyé
  l’URL ainsi que le titre « Gesta ». `browser_snapshot` a exposé l’écran de connexion et les
  utilisateurs de démonstration. Après les appels `browser_click` pour sélectionner Lucas et
  ouvrir **Offres**, `browser_type` a rempli le champ « Rechercher par mot-clé » avec `api rest`.
  Le snapshot suivant a montré exactement une offre, « API REST de facturation ».
- **Scénario 2 — conforme.** `browser_type` a rempli le même champ avec `zzz-introuvable`.
  Le snapshot a montré « Aucune offre ne correspond à la recherche. » et aucune table d’offres.

Le serveur MCP a ensuite été arrêté. Les observations ci-dessus décrivent les retours réellement
renvoyés par les outils, pas seulement une conclusion de l’agent.

Une vérification complémentaire a ensuite été réalisée depuis Copilot Agent dans VS Code :
la conversation fournie montre la lecture du scénario, la navigation dans l'application,
la connexion comme Lucas et l'ouverture d'**Offres** avec les outils Playwright MCP. Une
première tentative de saisie a expiré ; après reprise sur le champ observé, la recherche
`api rest` a affiché uniquement **API REST de facturation**. Aucun test automatisé ni
changement de fichier n'a été effectué pendant cette exécution. Le déroulement est résumé
dans [`docs/semaine-5/conversation-2.md`](semaine-5/conversation-2.md). Cette trace est
rédigée à partir de la conversation fournie ; ce n'est pas un export brut **Copy All**.

## Playwright Test

Fichiers créés :

- [`playwright.config.ts`](../playwright.config.ts) configure `testDir: "./e2e"`, Chromium et
  `baseURL: "http://localhost:5173"`.
- [`e2e/recherche-offres/recherche-offres.spec.ts`](../e2e/recherche-offres/recherche-offres.spec.ts)
  contient les deux scénarios.

Le test 1 vérifie le titre de l’offre attendue, un total de deux lignes de tableau (en-tête et
résultat) et l’absence d’une autre offre publiée. Le test 2 vérifie le message d’absence de
résultat et l’absence de tableau. Les deux tests se connectent via le bouton de démonstration
Lucas et utilisent le champ de recherche accessible par son libellé.

Les serveurs de développement ont été démarrés séparément avec `npm run setup` puis
`npm run dev`. Les deux commandes consécutives `npx playwright test` ont toutes deux réussi :

- première exécution : 2 tests réussis ;
- deuxième exécution : 2 tests réussis.

## Vérification de détection d’un défaut

Le passage de `search` a été retiré temporairement de l’appel au repository dans
`backend/src/services/offers.service.ts`. Le test
`scénario 1 — recherche avec résultat` a échoué sur son assertion du nombre de lignes :
**5 reçues au lieu de 2**. L’échec provenait donc bien du défaut de filtrage, pas d’un problème
de configuration ou de connexion.

Le code d’origine a été restauré, puis le même test a réussi à nouveau. Le défaut temporaire
n’est pas destiné à être conservé.

## Vérifications du projet

`npm run check` a réussi après la configuration et les tests Playwright :

- lint et typecheck réussis ;
- 125 tests backend et 52 tests frontend réussis ;
- builds backend et frontend réussis.

Cette commande n’inclut pas les tests E2E ; ceux-ci ont été lancés séparément avec
`npx playwright test`. Vitest a affiché une note de performance sur jsdom, sans échec.

## Comparaison des approches

1. **Ce que MCP apporte :** Copilot peut interagir avec le navigateur par des outils et observer
   son état. Dans cette séance, `browser_navigate` a ouvert l’application, `browser_click` a
   sélectionné Lucas et ouvert la liste des offres, et `browser_type` a saisi les recherches.
2. **Ce qu’apportent les tests Playwright Test :** des scripts versionnés, déterministes et
   réexécutables sans agent, avec des assertions explicites. Un compte rendu MCP ne remplace pas
   cette preuve reproductible.
3. **Quand choisir chaque approche :** MCP convient à l’exploration interactive, à la découverte
   d’un parcours ou à l’observation d’un problème inattendu. Playwright Test convient à la
   régression répétée, à la vérification d’exigences stables et à une future exécution en CI.

## Limites et remarques

Les tests E2E nécessitent que les serveurs et les données de démonstration soient préparés. Ils
utilisent ces données locales en lecture seule. La configuration ne démarre pas automatiquement
les serveurs. Le rapport npm de scaffolding a signalé une vulnérabilité de sévérité élevée dans
l’arbre des dépendances ; aucune mise à jour automatique n’a été lancée dans le cadre de cette
séance.

## Conversations et remise

Les traces limitées au travail des séances sont enregistrées dans
[`docs/semaine-5/conversation-1.md`](semaine-5/conversation-1.md) et
[`docs/semaine-5/conversation-2.md`](semaine-5/conversation-2.md). Elles excluent
l'historique des semaines précédentes et sont identifiées comme résumés, pas comme exports
bruts **Copy All**. Si l'enseignant exige un export original, il faudra fournir l'export
propre à la séance depuis VS Code.
