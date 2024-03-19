export interface technologiesUsedClass {
  name: String,
  href: String,
  picto: String
}

const technologiesUsed: technologiesUsedClass[] = [
  { name: 'Remix', href: 'https://remix.run/', picto: 'remix.webp' },
  { name: 'React', href: 'https://fr.legacy.reactjs.org/', picto: 'react.webp' },
  { name: 'Tailwind', href: 'https://tailwindcss.com/', picto: 'tailwind.webp' },
  { name: 'Supabase', href: 'https://supabase.com/', picto: 'supabase.webp' },
  { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', picto: 'zustand.webp' },
  //{ name: 'Cypress', href: 'https://www.cypress.io/', picto: 'cypress.svg' },
];

export default technologiesUsed;