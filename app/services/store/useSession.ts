import { create } from 'zustand';
import { isSbSession } from '../cookies';


const useSession = create((set) => ({
  isSession: false,
  setSession: () => set((state: { isSession: boolean; }) => (
    { isSession: isSbSession() }
  ))
}));

export default useSession;