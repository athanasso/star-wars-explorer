'use client';

import { useState, useEffect } from 'react';
import { swapi } from '@/app/utils/api';
import { Character, Planet, Starship } from '@/app/types/swapi';
import LoadingSpinner from '@/app/components/Common/LoadingSpinner';
import { useFavoritesStore } from '@/app/store/favoritesStore';

interface EntityDetailModalProps {
    url: string;
    onClose: () => void;
}

export default function EntityDetailModal({ url, onClose }: EntityDetailModalProps) {
    const [details, setDetails] = useState<Character | Planet | Starship | null>(null);
    const [loading, setLoading] = useState(true);
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const entityDetails = await swapi.getDetails(url);
                setDetails(entityDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching entity details:', error);
                setLoading(false);
            }
        }

        fetchDetails();
    }, [url]);

    const toggleFavorite = () => {
        if (!details) return;

        if (isFavorite(url)) {
            removeFavorite(url);
        } else {
            addFavorite({ name: details.name, url });
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!details) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-[110]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{details.name}</h2>
                    <button
                        onClick={toggleFavorite}
                        className="text-2xl absolute top-2 right-2"
                    >
                        {isFavorite(url) ? '❤️' : '🤍'}
                    </button>
                </div>

                {/* Existing details rendering code remains the same */}
                {'height' in details && (
                    <div>
                        <p>Height: {details.height}</p>
                        <p>Mass: {details.mass}</p>
                        <p>Hair Color: {details.hair_color}</p>
                        <p>Skin Color: {details.skin_color}</p>
                        <p>Eye Color: {details.eye_color}</p>
                        <p>Birth Year: {details.birth_year}</p>
                        <p>Gender: {details.gender}</p>
                    </div>
                )}

                {('rotation_period' in details) && (
                    <div>
                        <p>Rotation Period: {details.rotation_period}</p>
                        <p>Orbital Period: {details.orbital_period}</p>
                        <p>Diameter: {details.diameter}</p>
                        <p>Climate: {details.climate}</p>
                        <p>Gravity: {details.gravity}</p>
                        <p>Terrain: {details.terrain}</p>
                        <p>Population: {details.population}</p>
                    </div>
                )}

                {('model' in details) && (
                    <div>
                        <p>Model: {details.model}</p>
                        <p>Manufacturer: {details.manufacturer}</p>
                        <p>Cost: {details.cost_in_credits} credits</p>
                        <p>Length: {details.length}</p>
                        <p>Max Speed: {details.max_atmosphering_speed}</p>
                        <p>Crew: {details.crew}</p>
                        <p>Passengers: {details.passengers}</p>
                        <p>Cargo Capacity: {details.cargo_capacity}</p>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}