// src/store/favoritesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface FavoritesState {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) =>
        set((state) => ({ favorites: [...state.favorites, product] })),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),
      isFavorite: (productId) => get().favorites.some((p) => p.id === productId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);