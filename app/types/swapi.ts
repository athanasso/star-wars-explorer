export interface BaseEntity {
    name: string;
    url: string;
}

export interface Character extends BaseEntity {
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
}

export interface Planet extends BaseEntity {
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    population: string;
}

export interface Starship extends BaseEntity {
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
}

export type EntityType = 'people' | 'planets' | 'starships';

export interface SearchResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: BaseEntity[];
}