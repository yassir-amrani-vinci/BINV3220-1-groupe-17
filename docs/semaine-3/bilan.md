# Bilan — semaine 3

## Objectif

Cette semaine porte sur l'analyse du harnais agentique du projet : identifier les
guides qui orientent le développement, les senseurs qui produisent du feedback et
relier les tests existants aux requirements du cahier des charges.

## Livrables

- [matrice-guides-senseurs.md](./matrice-guides-senseurs.md) : inventaire et
  classification des guides/senseurs, avec comparaison aux bonnes pratiques Web 2.
- [matrice-tracabilite-tests.md](./matrice-tracabilite-tests.md) : traçabilité des
  tests par rapport aux exigences et règles de gestion.
- [conversation-1.md](./conversation-1.md) : archive de la conversation de travail.

## Ce qui a été appris

Le projet ne dépend pas seulement du modèle de code : le cahier des charges,
l'architecture, les conventions du dépôt et les données de seed guident les
changements. Les senseurs automatiques (types, lint, tests et build) donnent un
feedback rapide, tandis que la revue du diff, la vérification manuelle et la PR
apportent un feedback humain.

La traçabilité permet aussi de distinguer une exigence réellement testée d'une
exigence seulement représentée dans le schéma ou la documentation. Plusieurs
fonctionnalités prévues par le cahier des charges restent donc explicitement
marquées comme non couvertes.

## Validation

La suite de validation attendue est :

```bash
npm run check
```

Cette commande regroupe le lint, la vérification TypeScript, les tests backend et
frontend, ainsi que les builds. Les tests existants couvrent notamment
l'authentification démo, les entreprises, les offres, le filtrage par période et les
candidatures.

## Crédits d'IA

Les chiffres ne sont pas inventés. Chaque membre du groupe doit compléter le tableau
avec sa statistique GitHub Copilot réelle avant la soumission du devoir.

| Membre | Crédit/utilisation Copilot | Source et date de consultation |
|---|---:|---|
| Membre 1 | À compléter | Statistiques GitHub Copilot |
| Membre 2 | À compléter | Statistiques GitHub Copilot |
| Membre 3 | À compléter | Statistiques GitHub Copilot |

## Points restant à faire avant la soumission

1. Remplacer les trois valeurs « À compléter » par les statistiques réelles.
2. Vérifier la checklist de la PR et demander la review du collègue.
3. Poster dans le devoir le lien de la PR ouverte vers `main`.
4. Effectuer, si possible, un parcours manuel dans le navigateur et l'ajouter à la
   description ou aux commentaires de la PR.
