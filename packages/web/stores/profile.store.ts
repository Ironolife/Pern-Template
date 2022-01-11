import { ProfileResposne, UserProfile } from '@pern-template/shared';
import create from 'zustand';

type ProfileStoreState = {
  profile: UserProfile | null;
  setProfile: ({ profile }: ProfileResposne) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStoreState>((set) => ({
  profile: null,
  setProfile: ({ profile }) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
