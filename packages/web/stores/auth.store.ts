import { AuthResponse } from '@pern-template/shared';
import create from 'zustand';

type AuthStoreState = {
  isReady: boolean; // For initialization i.e. fetching cookie
  tokens: AuthResponse | null;
  readyAuth: (tokens: AuthResponse | null) => void;
  setAuth: (tokens: AuthResponse) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isReady: false,
  tokens: null,
  readyAuth: (tokens) => set({ isReady: true, tokens }),
  setAuth: (tokens) => set({ tokens }),
  clearAuth: () => set({ tokens: null }),
}));
