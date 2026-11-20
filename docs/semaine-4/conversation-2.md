User: Ajoute la recherche par mot-clé prévue par EF-30, limitée au titre des offres. Voici les règles :
- rechercher un texte contenu dans le titre, sans distinguer majuscules et minuscules ;
- ignorer les espaces au début et à la fin du texte saisi ;
- avec une recherche vide, afficher les offres normalement accessibles ;
- sans correspondance, afficher une liste vide et un message adapté ;
- combiner la recherche avec le filtre par période s'il est déjà présent ;
- conserver les règles de visibilité : un étudiant ne voit que les offres publiées.
Si plusieurs mots sont saisis, recherche l'expression entière. La recherche approximative et la gestion particulière des accents restent hors périmètre.

Copilot: Read skill `test-driven-development`
Completed with input: {"skill":"test-driven-development"}

Je vais préparer un lot ciblé côté API et interface, puis exécuter uniquement ces tests pour constater l’échec attendu avant toute modification applicative.

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/.github/skills/test-driven-development/writing-good-tests.md"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/tests/offers.test.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/tests/OffersPage.test.tsx"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/controllers/offers.controller.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/pages/OffersPage.tsx"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/services/offers.service.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/repositories/offers.repository.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/hooks/useOffers.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/services/offers.service.ts"
}

Search for `period|GET /offers|Aucune offre`

Read , lines 137 to 176
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/API.md",
  "view_range": [
    137,
    176
  ]
}

Read , lines 28 to 38
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/http/offers.http",
  "view_range": [
    28,
    38
  ]
}

Search for `chatbot|qualité|flotte|facturation|title`

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/tests/helpers/fetchMock.ts"
}

Read , lines 18 to 140
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/db/seed/offersData.ts",
  "view_range": [
    18,
    140
  ]
}

Search for `EF-30|mot-clé|keyword|recherche`

Read , lines 45 to 95
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/tests/companies.test.ts",
  "view_range": [
    45,
    95
  ]
}

Read , lines 35 to 75
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/tests/CompaniesPage.test.tsx",
  "view_range": [
    35,
    75
  ]
}

Search for `search|query|LIKE|trim`

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/controllers/companies.controller.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/backend/src/repositories/companies.repository.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/pages/CompaniesPage.tsx"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/hooks/useCompanies.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/src/services/companies.service.ts"
}

Je vais aligner le contrat sur le paramètre existant `q`, déjà utilisé pour la recherche d’entreprises, afin d’éviter une divergence API entre les deux fonctionnalités.

Edit , 

Ran terminal command: npx vitest run backend/tests/offers.test.ts frontend/tests/OffersPage.test.tsx

Les tests backend sont rouges pour la bonne raison : `q` est actuellement ignoré. La commande racine ne charge pas l’environnement jsdom frontend ; je vérifie la configuration du workspace avant de relancer le lot rouge frontend isolément.

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/package.json"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/package.json"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/vite.config.ts"
}

Read 
Completed with input: {
  "path": "/Users/anas/Documents/Vinci-Bloc-3/IA/projet_IA/BINV3220-1-groupe-17/frontend/tests/setup.ts"
}

Ran terminal command: npm test -w frontend -- OffersPage.test.tsx

Requested chat rename
Completed with input: {
  "title": "Recherche d’offres EF-30",
  "automatic": true
}

Ask User
Completed with input: {
  "message": "Les tests rouges ont été préparés et vérifiés : les 4 tests backend échouent parce que `q` est ignoré, et les 3 tests frontend échouent parce que le champ de recherche est absent. Les résultats attendus couvrent casse/espaces, expression entière, combinaison période/recherche, visibilité étudiant et message sans correspondance. Validez-vous ce lot de tests pour passer à l’implémentation ?",
  "requestedSchema": {
    "properties": {
      "validation": {
        "type": "string",
        "title": "Validation",
        "enum": [
          "Valider les tests",
          "Modifier les tests"
        ],
        "default": "Valider les tests"
      }
    }
  }
}

J’ajoute uniquement le test de visibilité demandé, avec le même mot-clé pour l’administrateur et l’étudiant, puis je relance les tests rouges sans toucher au code applicatif.

Edit 

Ran terminal command: npx vitest run backend/tests/offers.test.ts

Ran terminal command: npm test -w frontend -- OffersPage.test.tsx

Ask User
Completed with input: {
  "message": "Le lot final a été relancé. Résultat attendu/observé : côté backend, 5 tests de recherche échouent sur l’absence de filtrage (`q` ignoré), et 14 tests existants passent ; côté frontend, 3 tests échouent sur l’absence du champ et 5 passent. Le test demandé confirme aussi qu’il captera la fuite de visibilité si un étudiant pouvait retrouver une offre non publiée. Validez-vous maintenant ces tests pour implémenter EF-30 ?",
  "requestedSchema": {
    "properties": {
      "validation": {
        "type": "string",
        "title": "Validation finale des tests",
        "enum": [
          "Valider les tests et implémenter",
          "Modifier les tests"
        ],
        "default": "Valider les tests et implémenter"
      }
    }
  }
}

Les tests sont validés ; j’implémente maintenant le même contrat bout-en-bout, avec `q`, une recherche limitée au titre et la combinaison avec `period`.

Edit , , , , , , , 

Search for `getOffers\(|useOffers\(`

Ran terminal command: npx vitest run backend/tests/offers.test.ts

Ran terminal command: npm test -w frontend -- OffersPage.test.tsx

La seule régression verte restante est un détail d’encodage : `URLSearchParams` produit `+`, tandis que le test attend `%20`. L’API accepte les deux, mais je normalise explicitement avec `%20` pour satisfaire le contrat frontend attendu.

Edit 

Ran terminal command: npx vitest run backend/tests/offers.test.ts

Ran terminal command: npm test -w frontend -- OffersPage.test.tsx

Edit 

Les tests ciblés passent. Je lance maintenant la vérification globale du workspace pour détecter une régression hors des offres.

Ran terminal command: npm run check

EF-30 est implémenté :

- Recherche par mot-clé limitée aux titres.
- Casse ignorée, espaces externes supprimés, expression entière conservée.
- Combinaison avec le filtre de période.
- Liste vide adaptée et visibilité étudiant préservée.
- Documentation API mise à jour.

Validation : `npm run check` passe avec 177 tests réussis et les builds frontend/backend.