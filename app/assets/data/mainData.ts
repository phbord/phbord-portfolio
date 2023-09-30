const mainData = {
  fr: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Intégrateur / Développeur front-end',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo de Pierre-Henri Bord',
      logoBurgerText: 'Logo burger menu',
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
      footer: [],
      socialNetwork: [
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
        "Tests E2E",
        "Scrum",
        "Javascript",
        "Typescript",
        "React",
      ],
      technologiesUsed: [
        { name: 'Remix', href: 'https://remix.run/', picto: 'remix.svg' },
        { name: 'React', href: 'https://remix.run/', picto: 'react.svg' },
        { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.svg' },
        { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.svg' },
        { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.png' },
        { name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
      ],
    }
  },
  en: {
    translation: {
      firstName: 'Pierre-henri',
      lastName: 'Bord',
      position: 'Integrator / Front-end developer',
      email: 'phbord@gmail.com',
      linkedin: 'https://www.linkedin.com/in/phbord/',
      logoHeaderText: 'Logo of Pierre-Henri Bord',
      logoBurgerText: 'Burger menu logo',
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
      footer: [],
      socialNetwork: [
        { name: 'email', href: 'mailto:phbord@gmail.com"' },
        { name: 'linkdin', href: 'https://www.linkedin.com/in/' },
        { name: 'github', href: 'https://github.com/phbord' },
        { name: 'gitlab', href: 'https://gitlab.com/phbord' },
        { name: 'codepen', href: 'https://codepen.io/phbord' },
      ],
      mainKeywords: [
        "Responsive",
        "Mobile first",
        "BEM",
        "Ergonomics",
        "E2E testing",
        "Scrum",
        "Javascript",
        "Typescript",
        "React",
      ],
    }
  }
};

export default mainData;