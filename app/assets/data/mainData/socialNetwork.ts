export interface socialNetworkClass {
  name: String,
  href: String,
  picto: String
}

const socialNetwork: socialNetworkClass[] = [
  { name: 'Email', href: 'mailto:phbord@gmail.com', picto: 'plane-light.svg' },
  { name: 'Linkdin', href: 'https://www.linkedin.com/in/', picto: 'linkedin.webp' },
  { name: 'Github', href: 'https://github.com/phbord' , picto: 'github.webp'},
  { name: 'Gitlab', href: 'https://gitlab.com/phbord', picto: 'gitlab.webp' },
  { name: 'Codepen', href: 'https://codepen.io/phbord', picto: 'codepen.webp' },
];

export default socialNetwork;