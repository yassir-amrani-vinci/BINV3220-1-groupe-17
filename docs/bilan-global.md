# Bilan global du projet

## Ce que nous avons appris

Au fil du projet, nous avons appris à travailler à partir d’un cahier des charges, à
repérer les règles métier et à comprendre l’architecture avant de modifier le code. Nous
avons vu comment une fonctionnalité traverse les couches du backend et du frontend, et
pourquoi les validations importantes — droits, visibilité et transitions d’état — doivent
être imposées côté serveur. Les migrations, les contraintes de base de données, les
contrats API et les exemples HTTP rendent ces règles plus cohérentes et vérifiables.

Nous avons aussi appris à utiliser l’agent de manière plus méthodique : découper le travail,
examiner les changements, demander des tests ciblés, lire les échecs et ne pas traiter le
résumé de l’agent comme une preuve. La pratique du TDD, l’audit des lacunes de tests et
`npm run check` nous ont montré comment combiner tests, lint, vérification de types et
builds. Enfin, l’essai temporaire d’une régression a appris à vérifier qu’un test détecte
réellement le comportement qu’il prétend protéger.

Les séances sur les skills, les hooks et Playwright nous ont fait découvrir différents
moyens d’encadrer l’agent et d’observer son travail. Nous avons distingué l’exploration
interactive avec Playwright MCP des tests Playwright Test, qui sont versionnés et
réexécutables sans agent.

## Ce que nous aurions aimé approfondir

Nous aurions aimé mettre en place une intégration continue complète pour exécuter
automatiquement les vérifications et les tests E2E à chaque pull request. Nous aurions
aussi aimé approfondir la couverture des cas limites relevés par les audits, les tests
d’accessibilité et les validations sur plusieurs navigateurs. Enfin, davantage de temps
aurait permis d’explorer plus systématiquement les limites des outils agentiques, la
sécurité des workflows automatisés et la façon de mesurer la fiabilité des résultats
fournis par l’agent.
