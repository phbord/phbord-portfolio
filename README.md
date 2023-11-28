# Portfolio de Pierre-Henri Bord

## URL
- [https://phbord-portfolio-force.vercel.app/](https://phbord-portfolio-force.vercel.app/)

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
  - [Zustand](https://github.com/pmndrs/zustand)
- Système d'internationalisation
  - [i18next](https://react.i18next.com/)
- Base de données
  - API basée sur Postgres
  - [Supabase](https://supabase.com/)

## Développement

Sur le terminal:

```sh
npm run dev
```

Cela démarre votre application en mode développement, en reconstruisant les assets lors des modifications de fichiers.

## Déploiement

Tout d’abord, créez votre application pour la production :

```sh
npm run build
```

Exécutez ensuite l’application en mode production :

```sh
npm start
```

Vous devrez maintenant choisir un hôte sur lequel le déployer.

### DIY

Si vous êtes habitué au déploiement d'applications Node, le serveur d'applications Remix intégré est prêt pour la production.

Assurez-vous de déployer la sortie de `remix build`

- `build/`
- `public/build/`
