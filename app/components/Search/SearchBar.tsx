'use client';

import { useSearchStore } from '@/app/store/searchStore';
import { swapi } from '@/app/utils/api';
import { EntityType } from '@/app/types/swapi';

export default function SearchBar() {
    const {
        query,
        setQuery,
        entityType,
        setEntityType,
        setResults,
        setPage,
        setHasMore
    } = useSearchStore();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setResults([]);

        try {
            const searchResult = await swapi.search(entityType, query);
            setResults(searchResult.results);
            setHasMore(!!searchResult.next);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-4">
            <div className="flex space-x-4">
                <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value as EntityType)}
                    className="bg-gray-800 p-2 rounded"
                >
                    <option value="people">Characters</option>
                    <option value="planets">Planets</option>
                    <option value="starships">Starships</option>
                </select>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${entityType}...`}
                    className="flex-grow bg-gray-800 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600"
                >
                Search
                </button>
            </div>
        </form>
    );
}