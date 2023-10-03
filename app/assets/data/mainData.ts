import strategiesObliquesEn from "./strategiesObliquesEn";
import strategiesObliquesFr from "./strategiesObliquesFr";

const mainData = {
  // FRANCAIS
  fr: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Intégrateur / Développeur front-end',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo de Pierre-Henri Bord',
      logoProfileText: 'Logo de profil de Pierre-Henri Bord',
      logoBurgerText: 'Logo burger menu',
      noDataText: 'Pas de données',
      header: [
        { name: 'Compétences', href: '/' },
        { name: 'Expériences', href: '/experiences' },
        { name: 'Formations', href: '/training' },
        { name: 'Liens', href: '/links' },
        { name: 'Téléchargements', href: '/downloads' },
        { name: 'Stratégies Obliques', href: '/oblique-strategies' },
        {
          name: 'CV à télécharger',
          href: 'https://www.dropbox.com/s/myarm5ozn29wwim/CV_pierre-henri_bord_dev-front.pdf?dl=0',
          isDownload: true
        },
      ],
      authentification: [
        { name: 'Inscription', href: '/signup' },
        { name: 'Connexion', href: '/signin' },
        { name: 'Déconnexion', href: '/disconnection' },
      ],
      socialNetwork: [
        { name: 'email', href: 'mailto:phbord@gmail.com', picto: 'plane-light.svg' },
        { name: 'linkdin', href: 'https://www.linkedin.com/in/', picto: 'linkedin.svg' },
        { name: 'github', href: 'https://github.com/phbord' , picto: 'github.svg'},
        { name: 'gitlab', href: 'https://gitlab.com/phbord', picto: 'gitlab.svg' },
        { name: 'codepen', href: 'https://codepen.io/phbord', picto: 'codepen.svg' },
      ],
      mainKeywords: [
        "Responsive",
        "Mobile first",
        "BEM",
        "Ergonomie",
        "Testing",
        "Scrum",
        "Javascript",
        "Typescript",
        "React",
      ],
      technologiesUsed: [
        { name: 'Remix', href: 'https://remix.run/', picto: 'remix.svg' },
        { name: 'React', href: 'https://fr.legacy.reactjs.org/', picto: 'react.svg' },
        { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.svg' },
        { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.svg' },
        { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.png' },
        { name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
      ],
      strategiesObliques: strategiesObliquesFr,
    }
  },

  // ANGLAIS
  en: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Integrator / Front-end developer',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo of Pierre-Henri Bord',
      logoProfileText: 'Logo of Pierre-Henri Bord profile',
      logoBurgerText: 'Burger menu logo',
      noDataText: 'No data',
      header: [
        { name: 'Knowledges', href: '/' },
        { name: 'Experiences', href: '/experiences' },
        { name: 'Training', href: '/training' },
        { name: 'Links', href: '/links' },
        { name: 'Downloads', href: '/downloads' },
        { name: 'Oblique Strategies', href: '/oblique-strategies' },
        {
          name: 'CV à télécharger',
          href: 'https://www.dropbox.com/s/myarm5ozn29wwim/CV_pierre-henri_bord_dev-front.pdf?dl=0',
          isDownload: true
        },
      ],
      authentification: [
        { name: 'Sign up', href: '/signup' },
        { name: 'Sign in', href: '/signin' },
        { name: 'Disconnection', href: '/disconnection' },
      ],
      socialNetwork: [
        { name: 'email', href: 'mailto:phbord@gmail.com', picto: 'plane.svg' },
        { name: 'React', href: 'https://fr.legacy.reactjs.org/', picto: 'react.svg' },
        { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.svg' },
        { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.svg' },
        { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.png' },
        { name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
      ],
      mainKeywords: [
        "Responsive",
        "Mobile first",
        "BEM",
        "Ergonomics",
        "Testing",
        "Scrum",
        "Javascript",
        "Typescript",
        "React",
      ],
      technologiesUsed: [
        { name: 'Remix', href: 'https://remix.run/', picto: 'remix.svg' },
        { name: 'React', href: 'https://fr.legacy.reactjs.org/', picto: 'react.svg' },
        { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.svg' },
        { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.svg' },
        { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.png' },
        { name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
      ],
      strategiesObliques: strategiesObliquesEn,
    }
  }
};

export default mainData;