import axios from 'axios';
import { EntityType, SearchResult } from '../types/swapi';

const SWAPI_BASE_URL = 'https://swapi.dev/api';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

class ApiCache {
    private cache: Map<string, { data: unknown, timestamp: number }> = new Map();

    set(key: string, data: unknown) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    get(key: string) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }
        return null;
    }

    clear(key?: string) {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }
}

export const apiCache = new ApiCache();

export const swapi = {
    async search(type: EntityType, query: string, page: number = 1): Promise<SearchResult> {
        const cacheKey = `${type}-search-${query}-${page}`;
        const cachedResult = apiCache.get(cacheKey) as SearchResult | null;

        if (cachedResult) return cachedResult;

        try {
            const response = await axios.get(`${SWAPI_BASE_URL}/${type}`, {
                params: { search: query, page }
            });

            apiCache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            console.error('API Search Error:', error);
            throw error;
        }
    },

    async getDetails(url: string) {
        const cacheKey = url;
        const cachedResult = apiCache.get(cacheKey);

        if (cachedResult) return cachedResult;

        try {
            const response = await axios.get(url);
            apiCache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            console.error('API Details Error:', error);
            throw error;
        }
    }
};