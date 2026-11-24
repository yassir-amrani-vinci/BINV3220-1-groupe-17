# Scénarios E2E — recherche d’offres (EF-30)

Les scénarios utilisent la base de démonstration initialisée par `npm run setup`.
Dans les deux cas, se connecter comme étudiant **Lucas Dupont**, puis ouvrir la page
**Offres de stage**. Un étudiant ne voit que les offres publiées. Aucun filtre de
période n’est sélectionné au départ.

| Numéro | État initial et données | Scénario et actions dans l’interface | Résultat observable attendu |
|---|---|---|---|
| 1 | Utilisateur connecté : Lucas Dupont (étudiant). La base de démonstration contient l’offre publiée « API REST de facturation » et d’autres offres publiées. | Dans « Rechercher par mot-clé », saisir `api rest`. | La liste contient uniquement « API REST de facturation » parmi les offres visibles pour Lucas. Les offres publiées sans cette expression ne sont pas affichées. |
| 2 | Même utilisateur et même état initial ; aucun changement de données nécessaire. | Effacer le champ de recherche si nécessaire, puis saisir `zzz-introuvable`. | Aucune offre n’est affichée et le message « Aucune offre ne correspond à la recherche. » est visible. |

Ces scénarios couvrent un résultat nominal et une recherche sans résultat, et peuvent
être rejoués sans modifier les données de démonstration.
