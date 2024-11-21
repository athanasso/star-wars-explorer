'use client';

import InfiniteScroll from '../Common/InfiniteScroll';
import EntityCard from './EntityCard';
import { useSearchStore } from '@/app/store/searchStore';
import { swapi } from '@/app/utils/api';

export default function SearchResults() {
    const {
        results,
        query,
        entityType,
        page,
        hasMore,
        setResults,
        setPage,
        setHasMore
    } = useSearchStore();

    const loadMore = async () => {
        if (!hasMore) return;

        try {
            const searchResult = await swapi.search(entityType, query, page + 1);
            setResults(searchResult.results);
            setPage(page + 1);
            setHasMore(!!searchResult.next);
        } catch (error) {
            console.error('Load more error:', error);
        }
    };

    return (
        <InfiniteScroll
            loading={false}
            hasMore={hasMore}
            onLoadMore={loadMore}
        >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((entity) => (
                <EntityCard key={entity.url} entity={entity} />
            ))}
        </div>
        </InfiniteScroll>
    );
}