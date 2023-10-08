import { create } from 'zustand';


const useScrollYPosition = create((set) => ({
  newScrollYPosition: 0,
  setNewScrollYPosition: (newScrollY: number = window.scrollY) => set(
    (set: {newScrollYPosition: number}) => ({newScrollYPosition: newScrollY})
  )
}));

export default useScrollYPosition;