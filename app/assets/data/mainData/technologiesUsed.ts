export interface technologiesUsedClass {
  name: String,
  href: String,
  picto: String
}

const technologiesUsed: technologiesUsedClass[] = [
  { name: 'Remix', href: 'https://remix.run/', picto: 'remix.svg' },
  { name: 'React', href: 'https://fr.legacy.reactjs.org/', picto: 'react.svg' },
  { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.svg' },
  { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.svg' },
  { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.png' },
  //{ name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
];

export default technologiesUsed;