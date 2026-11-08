# Bilan — séance des candidatures

## Qu’ai-je appris ?

J’ai appris à commencer une fonctionnalité par une analyse du projet et de son schéma,
puis à la découper en étapes avant de modifier le code. J’ai aussi appris à distinguer
les règles métier qui doivent être contrôlées par le backend des éléments seulement
présentés ou masqués dans l’interface.

## Qu’est-ce qui a bien fonctionné ?

Le découpage en trois étapes — candidater, consulter ses candidatures et retirer une
candidature — a permis de réutiliser l’architecture existante. Les tests backend et
frontend ont aidé à vérifier les droits, les statuts et l’isolation des candidatures
entre étudiants. La commande `npm run check` a finalement réussi avec les contrôles
de lint, de typage, les tests et les builds.

## Qu’est-ce qui a moins bien fonctionné ?

Le premier dépôt cloné ne contenait pas encore les dépendances, ce qui a fait échouer
la première vérification de typage avant l’installation avec `npm ci`. Un test frontend
et deux tests backend ont aussi dû être corrigés après leur première exécution. La
validation dans un navigateur n’a pas encore été réalisée dans cette session.

## Choix métier

- Une seule candidature active est autorisée pour un étudiant et une offre.
- Une nouvelle candidature est possible après le retrait de la précédente.
- Le retrait ne supprime pas l’historique et n’est possible que pour une candidature
  `IN_PROGRESS`.

## Modifications et validation

La fonctionnalité ajoute une migration d’unicité, les couches backend des candidatures,
les routes `GET /applications`, `POST /applications` et
`POST /applications/:id/withdraw`, la documentation API et l’exemple REST. Le frontend
ajoute l’affichage des candidatures, la candidature depuis la liste des offres et le
retrait d’une candidature en cours.

Commandes exécutées :

- `npm ci` — réussi ;
- `npx vitest run backend/tests/applications.test.ts backend/tests/db/migrations.test.ts backend/tests/offers.test.ts` — 25 tests réussis ;
- `npm run check` — réussi : 119 tests backend, 49 tests frontend, lint, vérification TypeScript et builds réussis.
