import { create } from 'zustand';


const useSidebarStore = create((set) => ({
  isSideBarOpened: false,
  setSideBarOpened: () => set((state) => ({ isSideBarOpened: !state.isSideBarOpened }))
}));

export default useSidebarStore;