# TODOLIST

## Fonctionnalités

### Supabase
- créer une base + tables
- remplir partiellement les tables
- rendre les tables `public`
### fonctions CRUD
- authentification
  - création de compte
  - connexion
- affichage de liste
- affichage d'un élement
- création
- édition
- suppression
### Authentification
- création de comptes
- connexion
- déconnexion
### i18n
- configuration
- langues (`fr`, `en`)
  - stockage : localstorage
- intervention sur
  - fichiers dans `assets/data`
  - supabase
    - doublage et renommage des champs des tables
      - ex: `Knowledges_fr`
### Zustand
- gestion de l'affichage de la "sidebar"
### LocalStorage
- connexion
- langue sélectionnée
### Tailwind
- configuration
- création de classes globales (utilities classes)
### Développement
- composants
  - layout
  - header
  - sidebar
  - footer
- pages
  - création de compte
  - connexion
  - 404
  - accueil
  - experiences
  - training
  - links
  - downloads
  - oblique-strategies
### Améliorations
- validation W3C
- performances
- SEO
- rich snippets
- accessibilité

## Déploiement sur Vercel

## Test
- tests unitaires
- tests d'intégration
- tests E2E

## Routes
- /
- /signup
- /signin
- /disconnection
- /knomledges/:id/creation
- /knomledges/:id/edition
- /knomledges/:id/suppression
- /experiences
- /experiences/:id/creation
- /experiences/:id/edition
- /experiences/:id/suppression
- /training
- /training/:id/creation
- /training/:id/edition
- /training/:id/suppression
- /links
- /links/:id/creation
- /links/:id/edition
- /links/:id/suppression
- /downloads
- /downloads/:id/creation
- /downloads/:id/edition
- /downloads/:id/suppression
- /oblique-strategies
- /oblique-strategies/:id/creation
- /oblique-strategies/:id/edition
- /oblique-strategies/:id/suppression
