# Portfolio de Pierre-Henri Bord

## Documentation et technologies utilisées

- Liste de tâches à faire
  - [Todolist](./TODOLIST.md)
- Remix 2.0.0
  - Framework fullstack basé sur la librairie Javascript React
  - [Remix Docs](https://remix.run/docs)
- Typescript
- Framework front-end CSS
  - Framework front-end CSS
  - [Tailwind CSS](https://tailwindcss.com/)
- Composants basés sur Tailwind CSS
  - [Tailwind UI](https://tailwindui.com/)
- Gestionnaire d'états pour React
  - [Recoil](https://recoiljs.org/fr)
- Base de données
  - API basée sur Postgres
  - [Supabase](https://supabase.com/)
- Tests unitaires
  - [Jest](https://jestjs.io/)
- Tests E2E
  - [Cypress](https://www.cypress.io/)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
