export interface socialNetworkClass {
  name: String,
  href: String,
  picto: String
}

const socialNetwork: socialNetworkClass[] = [
  { name: 'email', href: 'mailto:phbord@gmail.com', picto: 'plane-light.svg' },
  { name: 'linkdin', href: 'https://www.linkedin.com/in/', picto: 'linkedin.svg' },
  { name: 'github', href: 'https://github.com/phbord' , picto: 'github.svg'},
  { name: 'gitlab', href: 'https://gitlab.com/phbord', picto: 'gitlab.svg' },
  { name: 'codepen', href: 'https://codepen.io/phbord', picto: 'codepen.svg' },
];

export default socialNetwork;