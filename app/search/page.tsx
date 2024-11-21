'use client';

import { useEffect } from 'react';
import SearchBar from '../components/Search/SearchBar';
import SearchResults from '../components/Search/SearchResults';
import { useSearchStore } from '../store/searchStore';
import { EntityType } from '../types/swapi';

export default function SearchPage({
    searchParams
    }: {
        searchParams?: { type?: EntityType }
    }) {
    const { entityType, setEntityType } = useSearchStore();

    useEffect(() => {
        if (searchParams?.type) {
            setEntityType(searchParams.type);
        }
    }, [searchParams?.type, setEntityType]);

    return (
        <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center capitalize">
            Search {entityType}
        </h1>
        <SearchBar />
        <SearchResults />
        </div>
    );
}