import { create } from 'zustand';
import { BaseEntity, EntityType } from '../types/swapi';

interface SearchState {
    query: string;
    entityType: EntityType;
    results: BaseEntity[];
    page: number;
    hasMore: boolean;
    setQuery: (query: string) => void;
    setEntityType: (type: EntityType) => void;
    setResults: (results: BaseEntity[]) => void;
    setPage: (page: number) => void;
    setHasMore: (hasMore: boolean) => void;
    reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    query: '',
    entityType: 'people',
    results: [],
    page: 1,
    hasMore: true,
    setQuery: (query) => set({ query, page: 1, results: [] }),
    setEntityType: (entityType) => set({ entityType, page: 1, results: [] }),
    setResults: (newResults) =>
        set(state => ({
        results: [...state.results, ...newResults]
        })),
    setPage: (page) => set({ page }),
    setHasMore: (hasMore) => set({ hasMore }),
    reset: () => set({
        query: '',
        entityType: 'people',
        results: [],
        page: 1,
        hasMore: true
    })
}));