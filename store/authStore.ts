import { create } from "zustand";
import type { Session } from "@supabase/auth-js/src/lib/types";
import type { ProfileType } from "../types/db";
import { createSelectors } from "./createSelectors";


interface State {
  isAuthenticated: boolean;
  session: Session | null;
  profile: ProfileType | null;
}

type Actions = {
  setSession: (session: Session | null) => void;
  setProfile: (profile: ProfileType | null) => void;
};

const INITIAL_STATE: State = {
  isAuthenticated: false,
  session: null,
  profile: null,
};

const authStore = create<State & Actions>()((set, get) => ({
  ...INITIAL_STATE,

  setSession: (session: Session | null) => {
    set({ isAuthenticated: !!session, session });    
  },
  setProfile: (profile: ProfileType | null) => {
    set({ profile });
  },
}));

export const useAuthStore = createSelectors(authStore);
