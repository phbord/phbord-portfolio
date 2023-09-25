# Portfolio de Pierre-Henri Bord

## Documentation et technologies utilisées

- Remix 2.0.0
  - Framework fullstack basé sur la librairie Javascript React
  - [Remix Docs](https://remix.run/docs)
- Typescript
- Tailwind CSS
  - Framework front-end CSS
  - [https://tailwindcss.com/](https://tailwindcss.com/)
- Tailwind UI
  - Composants basés sur Tailwind CSS
  - [https://tailwindui.com/](https://tailwindui.com/)
- Recoil
  - Gestionnaire d'états pour React
  - [https://recoiljs.org/fr](https://recoiljs.org/fr)
- Supabase
  - API basée sur Postgres
  - [https://supabase.com/](https://supabase.com/)
- Prisma
  - ORM en Typescript
  - [https://www.prisma.io/](https://www.prisma.io/)

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
