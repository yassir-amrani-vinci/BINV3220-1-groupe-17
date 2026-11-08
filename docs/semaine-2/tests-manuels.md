# Cas de tests manuels end-to-end

Ces cas couvrent la fonctionnalité des candidatures. Les résultats doivent être
complétés après un essai dans le navigateur.

## Préparation

1. Depuis la racine du projet, exécuter `npm ci`, puis `npm run setup`.
2. Démarrer l'application avec `npm run dev`.
3. Ouvrir `http://localhost:5173`.
4. Utiliser les utilisateurs de démonstration proposés par l'application.

## Cas fonctionnels

| ID | Précondition et action | Résultat attendu | Résultat observé |
|---|---|---|---|
| E2E-01 | Se connecter comme étudiant, ouvrir **Offres**, cliquer sur **Candidater**, saisir un message et envoyer. | La candidature est créée et apparaît avec le statut **En cours**. | À compléter |
| E2E-02 | Candidater à une autre offre sans saisir de message. | La candidature est créée sans message. | À compléter |
| E2E-03 | Ouvrir **Mes candidatures**, puis recharger la page. | La candidature et son statut sont toujours présents. | À compléter |
| E2E-04 | Depuis une candidature **En cours**, cliquer sur **Retirer**. | Le statut devient **Retirée** et l'historique est conservé après rechargement. | À compléter |
| E2E-05 | Après un retrait, recandidater à la même offre. | Une nouvelle candidature **En cours** peut être créée. | À compléter |
| E2E-06 | Ouvrir une candidature **Retenue** ou **Non retenue**. | Le bouton **Retirer** n'est pas disponible. | À compléter |
| E2E-07 | Se connecter avec un deuxième étudiant. | Seules les candidatures du deuxième étudiant sont affichées. | À compléter |

## Cas de refus

| ID | Action | Résultat attendu | Résultat observé |
|---|---|---|---|
| E2E-08 | Se connecter comme administrateur ou contact d'entreprise. | Le bouton **Candidater** et la page **Mes candidatures** ne sont pas accessibles. | À compléter |
| E2E-09 | Tenter de candidater à une offre non publiée via l'API. | Le serveur refuse la requête avec une erreur `400`. | Testé par `backend/tests/applications.test.ts` |
| E2E-10 | Tenter de retirer une candidature déjà traitée via l'API. | Le serveur refuse la requête avec une erreur `409`. | Testé par `backend/tests/applications.test.ts` |

## Validation automatisée associée

La commande `npm run check` a été exécutée avec succès : lint, vérification
TypeScript, 119 tests backend, 49 tests frontend et builds des deux applications.
