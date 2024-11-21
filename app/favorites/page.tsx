'use client';

import { useState, useMemo } from 'react';
import EntityCard from '../components/Search/EntityCard';
import { EntityType } from '../types/swapi';
import { useFavoritesStore } from '../store/favoritesStore';

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore();
    const [filter, setFilter] = useState<EntityType | 'all'>('all');

    const filteredFavorites = useMemo(() => {
        if (filter === 'all') return favorites;

        return favorites.filter(fav => {
            const type = fav.url.split('/')[4] as EntityType;
            return type === filter;
        });
    }, [favorites, filter]);

    const getFavoriteTypeCounts = () => {
        return {
            all: favorites.length,
            people: favorites.filter(fav => fav.url.includes('/people/')).length,
            planets: favorites.filter(fav => fav.url.includes('/planets/')).length,
            starships: favorites.filter(fav => fav.url.includes('/starships/')).length,
        };
    };

    const typeCounts = getFavoriteTypeCounts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Your Favorites
            </h1>

            {/* Filters */}
            <div className="flex justify-center space-x-4 mb-8">
                {(['all', 'people', 'planets', 'starships'] as const).map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`
                    px-2 py-2 rounded-lg transition-colors
                    ${filter === type
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                    }
                    `}
                >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                    <span className="ml-2 text-sm">({typeCounts[type]})</span>
                </button>
                ))}
            </div>

            {/* Favorites Grid */}
            {filteredFavorites.length === 0 ? (
                <div className="text-center text-gray-500">
                <p className="text-2xl">No favorites yet!</p>
                <p className="mt-4">
                    Start exploring and add some Star Wars entities to your favorites.
                </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredFavorites.map((entity) => (
                    <EntityCard key={entity.url} entity={entity} />
                ))}
                </div>
            )}

            {/* Stats */}
            <div className="mt-8 text-center">
                <p className="text-lg">
                Total Favorites: {typeCounts.all}
                </p>
            </div>
        </div>
    );
}