import { headerInterface } from "~/interfaces/mainData/headerInterface";

const headerEn: headerInterface[] = [
  { name: 'Technical skills', href: '/' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Training', href: '/training' },
  { name: 'Links', href: '/links' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Oblique Strategies', href: '/oblique-strategies' },
  {
    name: 'CV à télécharger',
    href: 'https://www.dropbox.com/s/myarm5ozn29wwim/CV_pierre-henri_bord_dev-front.pdf?dl=0',
    isDownload: true,
    isBlank: true
  },
];

export default headerEn;