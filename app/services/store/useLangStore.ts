import { create } from 'zustand';


const useLangStore = create((set) => ({
  newLang: 'fr',
  setNewLang: () => set((state: { newLang: string; }) => ({ newLang: !localStorage.getItem('lang') || state.newLang === 'en' ? 'fr' : 'en' }))
}));

export default useLangStore;