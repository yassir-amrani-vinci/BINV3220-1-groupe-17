# Matrice de traçabilité des cas de test par rapport aux requirements

Les tests existants sont regroupés par comportement vérifié. Une exigence indiquée
comme partiellement couverte possède une structure de données ou un contrôle indirect,
mais pas encore le parcours fonctionnel complet.

| Requirement | Comportement attendu | Tests ou preuves | Couverture |
|---|---|---|---|
| EF-01 | Connexion par lien e-mail à usage unique | `backend/tests/auth.test.ts`, mode démo documenté dans `backend/API.md` | Partielle : le lien e-mail réel n'est pas implémenté. |
| EF-10 | Rechercher, créer, modifier et archiver une entreprise | `backend/tests/companies.test.ts`, `frontend/tests/CompaniesPage.test.tsx` | Partielle : consultation et recherche couvertes, création/modification/archivage absents. |
| EF-20 | Déposer une offre | Schéma `offers`, données de seed | Non couverte : aucune route de création. |
| EF-21 | Modifier ou retirer une offre avant publication | Statuts et contraintes dans `001_initial.sql` | Non couverte : aucune route de modification ou de retrait. |
| EF-22 | Relecture et publication d'une offre | Statuts et contraintes dans `001_initial.sql` | Non couverte : aucune action d'administration. |
| EF-23 | Créer une offre au nom d'une entreprise | Schéma `offers`, seed d'une offre créée par un administrateur | Non couverte : aucune route de création. |
| EF-30 | Consulter et filtrer le catalogue des offres publiées | `backend/tests/offers.test.ts`, `frontend/tests/OffersPage.test.tsx` | Partielle : consultation et période couvertes, recherche/entreprise/localité absentes. |
| EF-32 | Candidater à une offre publiée avec message facultatif et retirer avant traitement | `backend/tests/applications.test.ts`, `frontend/tests/ApplicationsPage.test.tsx` | Couverte. |
| EF-33 | Consulter ses candidatures et leur statut | `backend/tests/applications.test.ts`, `frontend/tests/ApplicationsPage.test.tsx` | Couverte pour les statuts et l'isolation par étudiant. |
| EF-34 | Sélectionner un candidat et créer le stage | Contraintes et seed dans `backend/tests/db/constraints.test.ts` et `seed.test.ts` | Partielle : la cohérence du modèle est testée, pas l'action API. |
| EF-40 | Déclarer un stage | Table `internships`, contraintes SQL | Non couverte : aucune route de déclaration. |
| EF-41 | Valider ou refuser un stage déclaré | Statuts SQL uniquement | Non couverte : aucune route d'administration. |
| EF-50 | Contenir les informations complètes d'un stage | `backend/tests/db/constraints.test.ts`, `backend/tests/db/seed.test.ts` | Partielle : structure et seed couverts, API absente. |
| EF-53 | Afficher les stages d'un étudiant | Table `internships` uniquement | Non couverte : aucune consultation frontend/API. |
| EF-54 | Afficher les stages suivis par un promoteur | Relations et rôle dans le schéma | Non couverte : aucune route dédiée. |
| EF-60 à EF-65 | Gérer et suivre les conventions | Aucun test dédié | Non couverte. |
| EF-70 à EF-72 | Gérer les années, périodes et filtres par défaut | `backend/tests/db/constraints.test.ts`, `migrations.test.ts`, `offers.test.ts` | Partielle : schéma et filtre d'offres couverts, administration absente. |
| EF-80 à EF-81 | Exporter les contacts à relancer | Aucun test dédié | Non couverte. |
| EF-90 à EF-91 | Administrer et exporter les comptes et données | Aucun test dédié | Non couverte. |
| RG-01 | Une offre correspond à une place | Contrainte `offer_id UNIQUE` pour les stages, seed cohérent | Partielle : la règle complète dépend de la sélection, non implémentée. |
| RG-02/RG-03 | Une offre non publiée n'est pas visible ou candidatable | `backend/tests/offers.test.ts`, `backend/tests/applications.test.ts` | Couverte pour visibilité et candidature. |
| RG-04 | Offre attribuée, candidat retenu et autres candidatures cohérents | `backend/tests/db/seed.test.ts` | Partielle : seed cohérent, transition API absente. |
| RG-07/RG-08 | Contacts multi-entreprises et rattachement requis | `backend/tests/permissions.test.ts`, `companies.test.ts`, `seed.test.ts`, `constraints.test.ts` | Couverte par les données, permissions et contraintes. |
| RG-09/RG-10 | Année/période et historique des stages | `backend/tests/db/constraints.test.ts`, `seed.test.ts` | Partielle : modèle couvert, consultation absente. |
| RG-11 | Promoteur rattaché à l'entreprise et doté du rôle adéquat | `backend/tests/db/constraints.test.ts`, `seed.test.ts` | Couverte au niveau schéma et seed. |
| RG-13 | Une fiche « À vérifier » provient d'un stage déclaré | `backend/tests/db/seed.test.ts` | Couverte pour le seed. |
| ENF-02 | Interface en français | `frontend/tests/*.test.tsx`, libellés dans `frontend/src/utils/labels.ts` | Couverte pour les écrans implémentés. |
| ENF-03 | Contrôle d'accès vérifié côté serveur | `backend/tests/auth.test.ts`, `permissions.test.ts`, `companies.test.ts`, `offers.test.ts`, `applications.test.ts` | Couverte pour les routes existantes. |
| ENF-04 | Limiter les données personnelles exposées | Tests de DTO dans `companies.test.ts` et `offers.test.ts` | Couverte pour ces deux listes ; à étendre aux futures routes. |

## Commandes de validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check
```

Les tests backend utilisent SQLite en mémoire et les tests frontend utilisent Testing
Library avec un mock de `fetch`. La base de développement n'est jamais utilisée par les
tests.
