"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface InfiniteScrollProps {
    children: ReactNode;
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    threshold?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children,
    hasMore,
    loading,
    onLoadMore,
}) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore && !loading) {
                onLoadMore();
            }
        }, observerOptions);

        if (loadMoreTriggerRef.current) {
            observer.observe(loadMoreTriggerRef.current);
        }

        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loading, onLoadMore]);

    return (
        <div>
        {children}
        {hasMore && (
            <div
            ref={loadMoreTriggerRef}
            className="w-full flex justify-center my-4"
            >
            {loading ? <LoadingSpinner /> : "Loading more..."}
            </div>
        )}
        </div>
    );
};

export default InfiniteScroll;
