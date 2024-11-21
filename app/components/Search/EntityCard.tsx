'use client';

import { useState } from 'react';
import { BaseEntity } from '@/app/types/swapi';
import { useFavoritesStore } from '@/app/store/favoritesStore';
import EntityDetailModal from '../EntityDetail/EntityDetailModal';

interface EntityCardProps {
    entity: BaseEntity;
}

export default function EntityCard({ entity }: EntityCardProps) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite(entity.url)) {
            removeFavorite(entity.url);
        } else {
            addFavorite(entity);
        }
    };

    return (
        <>
        <div
            onClick={() => setIsDetailOpen(true)}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer relative"
        >
            <h2 className="text-lg font-bold">{entity.name}</h2>
            <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2"
            >
            {isFavorite(entity.url) ? '❤️' : '🤍'}
            </button>
        </div>
        {isDetailOpen && (
            <EntityDetailModal
                url={entity.url}
                onClose={() => setIsDetailOpen(false)}
                />
        )}
        </>
    );
}