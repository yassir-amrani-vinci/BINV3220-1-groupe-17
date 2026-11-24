# Bilan — semaine 5

## Qu’ai-je appris ?

J’ai appris à distinguer l’exploration interactive avec Playwright MCP des tests de
régression écrits avec Playwright Test. MCP permet de piloter le navigateur et d’observer
le parcours ; les tests automatisés vérifient ensuite les mêmes attentes de façon
reproductible. J’ai aussi vu qu’un test doit être mis à l’épreuve : en désactivant
temporairement le filtre, le scénario a détecté la régression.

## Qu’est-ce qui a bien fonctionné ?

Les scénarios ont été définis à partir d’un compte et de données de démonstration stables.
Les tests E2E ont réussi deux fois de suite, et `npm run check` a validé lint, types,
tests et builds. L’exécution depuis l’Agent VS Code a confirmé le résultat nominal dans
le navigateur.

## Qu’est-ce qui a moins bien fonctionné ?

Une première saisie dans le champ de recherche a échoué à cause du sélecteur utilisé ;
il a fallu reprendre en s’appuyant sur le champ observé. La configuration et le pilotage
de MCP ont aussi demandé plusieurs étapes. Enfin, conserver fidèlement les conversations
et distinguer les traces complètes des résumés a nécessité une correction.
