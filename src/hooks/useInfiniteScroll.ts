import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  onLoadMore: () => void,
  hasMore: boolean,
  loading: boolean,
  threshold: number = 100
) => {
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      onLoadMore();
    }
  }, [loading, hasMore, onLoadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}; 