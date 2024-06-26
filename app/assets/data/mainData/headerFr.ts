import { headerInterface } from "~/interfaces/mainData/headerInterface";

const headerFr: headerInterface[] = [
  { name: 'Compétences techniques', href: '/' },
  { name: 'Expériences', href: '/experiences' },
  { name: 'Formations', href: '/training' },
  { name: 'Projets', href: '/links' },
  { name: 'Téléchargements', href: '/downloads' },
  /* { name: 'Stratégies Obliques', href: '/oblique-strategies' }, */
  {
    name: 'CV à télécharger',
    href: 'https://www.dropbox.com/s/myarm5ozn29wwim/CV_pierre-henri_bord_dev-front.pdf?dl=0',
    isDownload: true, 
    isBlank: true
  },
  { name: 'Contacts', href: '/contacts' },
];

export default headerFr;