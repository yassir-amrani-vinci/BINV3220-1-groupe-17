# Matrice d'identification et de classification des guides et senseurs

## Légende

- **Guide** : information disponible avant la modification (feedforward).
- **Senseur** : mécanisme qui observe le résultat après une modification (feedback).
- **Inférentiel** : dépend d'une analyse humaine ou de l'IA.
- **Computationnel** : produit un résultat déterministe par un programme.

## Inventaire du dépôt

| Élément | Type | Axe | Source dans le dépôt | Rôle |
|---|---|---|---|---|
| Cahier des charges | Guide | Inférentiel | `docs/cdc_gesta_developpement.md` | Définit les acteurs, exigences, règles métier et périmètre. |
| Architecture | Guide | Inférentiel | `docs/architecture.md` | Décrit les couches, les responsabilités et les parcours de référence. |
| Instructions du dépôt | Guide | Inférentiel | `.github/copilot-instructions.md` | Fixe les commandes, conventions, règles de sécurité et de documentation. |
| README | Guide | Inférentiel | `README.md` | Explique l'installation, le périmètre actuel et les limites connues. |
| Documentation API | Guide | Inférentiel | `backend/API.md` | Décrit les routes, les DTO, les statuts et les erreurs attendues. |
| Données de démonstration | Guide | Computationnel | `docs/seed.md`, `backend/src/db/seed/` | Fournit des identités et scénarios reproductibles. |
| Modèles TypeScript | Guide | Computationnel | `backend/src/models/`, `frontend/src/models/` | Formalise les formes de données et les statuts autorisés. |
| Migrations SQL | Guide | Computationnel | `backend/src/db/migrations/` | Décrit le schéma, les clés étrangères, les unicités et les contraintes. |
| TypeScript | Senseur | Computationnel | `npm run typecheck` | Détecte les incohérences de types et les erreurs de compilation. |
| Oxlint | Senseur | Computationnel | `npm run lint` | Vérifie les règles de qualité et les erreurs statiques. |
| Tests backend | Senseur | Computationnel | `backend/tests/` | Vérifient API, droits, visibilité, contraintes et données de seed. |
| Tests frontend | Senseur | Computationnel | `frontend/tests/` | Vérifient navigation, rendu, appels API et comportements d'interface. |
| Build | Senseur | Computationnel | `npm run build` | Vérifie que le backend et le frontend sont compilables et livrables. |
| Revue du diff | Senseur | Inférentiel | `git diff`, revue GitHub | Vérifie l'intention, la portée, la lisibilité et les fichiers modifiés. |
| Vérification manuelle | Senseur | Inférentiel | Parcours dans le navigateur et REST Client | Vérifie le comportement réel avec les profils de démonstration. |
| Revue humaine de la PR | Senseur | Inférentiel | PR GitHub vers `main` | Apporte une validation indépendante avant fusion. |

## Couverture par rapport aux bonnes pratiques Web 2

| Bonne pratique Web 2 | Couverture | Éléments de preuve | Limite ou action restante |
|---|---|---|---|
| Comprendre le besoin avant de coder | Couverte | Cahier des charges, exigences EF/RG, bilan par semaine | Les exigences non implémentées restent explicitement listées. |
| Décrire une architecture cohérente | Couverte | `docs/architecture.md`, séparation contrôleur/service/repository | L'architecture ne couvre pas encore les modules métier futurs. |
| Documenter les conventions de contribution | Couverte | `.github/copilot-instructions.md`, modèle de PR | La checklist doit être complétée par chaque PR. |
| Utiliser des données reproductibles | Couverte | Seed, identifiants stables, bases SQLite en mémoire | Les données sont fictives et ne remplacent pas un jeu de données de production. |
| Vérifier automatiquement les comportements | Couverte | Vitest, Supertest, Testing Library, `npm run check` | La couverture ne garantit pas l'absence de scénarios non testés. |
| Vérifier les types et la qualité statique | Couverte | TypeScript et Oxlint | Les outils ne remplacent pas une revue fonctionnelle. |
| Vérifier le livrable construit | Couverte | Build backend et frontend dans `npm run check` | Le déploiement réel n'est pas automatisé dans ce dépôt. |
| Contrôler les droits côté serveur | Couverte | Middleware `authenticate`, `authorize`, services de permissions | Le mode démo ne constitue pas une authentification de production. |
| Vérifier les réponses et erreurs API | Couverte | Contrat dans `backend/API.md`, tests 400/401/403/404 | Les routes futures devront ajouter leur documentation et leurs tests. |
| Utiliser une boucle de correction | Couverte | Corrections guidées par typecheck, lint et tests | La trace complète de chaque itération dépend de l'archive de conversation. |
| Faire une revue humaine | Partielle | PR vers `main`, checklist et review demandée | La revue doit encore être réalisée par le collègue. |
| Tester l'interface dans un navigateur | Partielle | Tests jsdom présents, parcours manuel documenté | Une validation navigateur réelle reste à effectuer et à consigner. |
| Protéger les données personnelles | Partielle | DTO limités, pas de données personnelles dans les URL | Le mode démo et les données de démonstration sont uniquement adaptés au développement local. |
| Mesurer l'utilisation de l'IA | Non couverte | Aucun relevé chiffré présent dans le dépôt | Chaque membre doit ajouter sa consommation Copilot réelle au bilan. |

## Conclusion

Le dépôt possède une boucle de guidage et de feedback solide pour le développement local :
les exigences et conventions guident les changements, puis les vérifications
automatiques et humaines fournissent un retour. Les principales lacunes sont la
validation manuelle dans le navigateur, la revue par un collègue et la mesure réelle
des crédits Copilot.
