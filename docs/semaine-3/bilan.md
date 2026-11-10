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

Les chiffres ci-dessous ont été fournis par les membres du groupe à partir de leurs
statistiques disponibles. Ibrahim n'avait pas accès à GitHub Copilot.

| Membre | Crédit/utilisation Copilot | Source et date de consultation |
|---|---:|---|
| Amrani Yassir | 38 crédits | Statistiques GitHub Copilot, 10/11/2026 |
| Anas Azaizaoui | 16,2 crédits | Statistiques GitHub Copilot, 10/11/2026 |
| Ibrahim Yahia | 0 crédit — pas d'accès à GitHub Copilot | Déclaration du membre, 10/11/2026 |

## Points restant à faire avant la soumission

1. Vérifier la checklist de la PR et demander la review du collègue.
2. Poster dans le devoir le lien de la PR ouverte vers `main`.
3. Effectuer, si possible, un parcours manuel dans le navigateur et l'ajouter à la
   description ou aux commentaires de la PR.
