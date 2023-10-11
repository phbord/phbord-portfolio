import { create } from 'zustand';


const useScrollYPositionStore = create((set) => ({
  newScrollYPosition: 0,
  setNewScrollYPosition: (newScrollY: number = window.scrollY) => set(
    (set: {newScrollYPosition: number}) => ({newScrollYPosition: newScrollY})
  )
}));

export default useScrollYPositionStore;