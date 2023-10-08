export interface socialNetworkClass {
  name: String,
  href: String,
  picto: String
}

const socialNetwork: socialNetworkClass[] = [
  { name: 'Email', href: 'mailto:phbord@gmail.com', picto: 'plane-light.svg' },
  { name: 'Linkdin', href: 'https://www.linkedin.com/in/', picto: 'linkedin.svg' },
  { name: 'Github', href: 'https://github.com/phbord' , picto: 'github.svg'},
  { name: 'Gitlab', href: 'https://gitlab.com/phbord', picto: 'gitlab.svg' },
  { name: 'Codepen', href: 'https://codepen.io/phbord', picto: 'codepen.svg' },
];

export default socialNetwork;