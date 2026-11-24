# Trace de conversation — vérification Playwright MCP dans VS Code

> Trace rédigée à partir de la conversation fournie le 24 novembre 2026.
> Elle résume la séance dédiée à la vérification depuis Copilot Agent dans VS Code ;
> ce n'est pas un export brut « Copy All ».

## Objectif

Après la première exécution des scénarios via des appels HTTP JSON-RPC au serveur
Playwright MCP, l'étudiant a demandé de vérifier le point restant : exécuter un scénario
depuis Copilot Agent dans VS Code et conserver la conversation comme preuve. L'archive
de conversation a été remise à plus tard pour se concentrer sur cette vérification.

## Préparation et guidage

- Le serveur Playwright MCP et l'application locale ont été démarrés.
- L'étudiant a ouvert le dépôt dans VS Code et a vérifié que le serveur Playwright était
  en cours d'exécution.
- L'étudiant a choisi de garder le contrôle de son poste et d'être guidé plutôt que de
  laisser l'agent piloter l'interface.
- La consigne exécutée dans le chat Agent demandait de lire
  `e2e/recherche-offres/scenarios.md`, de jouer manuellement le scénario 1 avec
  Playwright MCP, sans tests automatisés ni modification de fichiers.

## Exécution observée dans la conversation fournie

Les appels d'outils visibles dans la conversation indiquent que l'Agent a :

1. lu `e2e/recherche-offres/scenarios.md` ;
2. ouvert `http://localhost:5173` et observé l'écran de connexion de démonstration ;
3. sélectionné Lucas Dupont, puis ouvert **Offres** ;
4. observé les offres publiées et le champ **Rechercher par mot-clé** ;
5. rencontré un délai d'attente lors d'une première tentative de saisie avec un sélecteur
   `aria-label` ;
6. réessayé avec l'outil de saisie sur le champ observé, en entrant `api rest` ;
7. relu la page : une seule offre était affichée, **API REST de facturation**.

Le résultat du scénario 1 est conforme. Aucun test automatisé n'a été lancé et aucun
fichier n'a été modifié pendant cette exécution manuelle. Le premier échec de saisie et
la reprise réussie sont conservés dans cette trace afin de rendre compte du déroulement
complet.
