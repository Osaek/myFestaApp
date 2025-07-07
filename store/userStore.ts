import {create} from 'zustand';

export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  following: number;
  followers: number;
  likes: number;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  userLogin: (user: User) => void;
  userlogout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  isLoggedIn: false,
  userLogin: (user: User) => set({user, isLoggedIn: true}),
  userlogout: () => set({user: null, isLoggedIn: false}),
  updateUser: (updates: Partial<User>) =>
    set(state => ({
      user: state.user ? {...state.user, ...updates} : null,
    })),
}));
