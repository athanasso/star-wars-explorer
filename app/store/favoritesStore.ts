import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BaseEntity } from '../types/swapi';

interface FavoritesState {
    favorites: BaseEntity[];
    addFavorite: (entity: BaseEntity) => void;
    removeFavorite: (url: string) => void;
    isFavorite: (url: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
        favorites: [],
        addFavorite: (entity) =>
            set(state => ({
            favorites: [...state.favorites, entity]
            })),
        removeFavorite: (url) =>
            set(state => ({
            favorites: state.favorites.filter(fav => fav.url !== url)
            })),
        isFavorite: (url) =>
            get().favorites.some(fav => fav.url === url)
        }),
        {
        name: 'star-wars-favorites',
        storage: createJSONStorage(() => localStorage)
        }
    )
);