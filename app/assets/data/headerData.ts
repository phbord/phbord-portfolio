export interface headerDataClass {
  name: String,
  href: String,
  isDownload?: boolean
}

const headerData: headerDataClass[] = [
  { name: 'Compétences', href: '/' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Formations', href: '/training' },
  { name: 'Liens', href: '/links' },
  { name: 'Téléchargements', href: '/downloads' },
  { name: 'Stratégies Obliques', href: '/oblique-strategies' },
  {
    name: 'CV à télécharger',
    href: 'https://www.dropbox.com/s/myarm5ozn29wwim/CV_pierre-henri_bord_dev-front.pdf?dl=0',
    isDownload: true
  },
];

export default headerData;