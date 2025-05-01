import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { YogaAction, ListParams } from '../../types';
import YogaCard from './YogaCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import SearchFilters from './SearchFilters';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useBookmarks } from '../../hooks/useBookmarks';

const YogaList: React.FC = () => {
  const [items, setItems] = useState<YogaAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<ListParams>({
    page: 1,
    limit: 5,
  });
  const { bookmarkedItems, isBookmarked } = useBookmarks();
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const fetchItems = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.yoga.getList({
        ...params,
        page: String(params.page),
        limit: String(params.limit),
      });

      let newItems = response.items;
      if (showBookmarkedOnly) {
        newItems = newItems.filter(item => isBookmarked(item.id));
      }

      setItems(prev => isLoadMore ? [...prev, ...newItems] : newItems);
      setHasMore(response.pagination.page * response.pagination.limit < response.pagination.total);
    } catch (err) {
      setError('載入瑜伽動作時發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [loading, hasMore]);

  useInfiniteScroll(loadMore, hasMore, loading);

  useEffect(() => {
    setParams(prev => ({ ...prev, page: 1 }));
    setItems([]);
    fetchItems();
  }, [params.search, params.category, params.sort, params.order, showBookmarkedOnly]);

  const handleSearch = (searchParams: Partial<ListParams>) => {
    setParams(prev => ({
      ...prev,
      ...searchParams,
      page: 1,
    }));
  };

  return (
    <div className="yoga-list">
      <SearchFilters 
        onSearch={handleSearch}
        showBookmarkedOnly={showBookmarkedOnly}
        onToggleBookmarkedOnly={() => setShowBookmarkedOnly(prev => !prev)}
      />

      {error && <ErrorMessage message={error} />}

      <div className="yoga-grid">
        {items.map(item => (
          <YogaCard 
            key={item.id} 
            yoga={item}
            isBookmarked={isBookmarked(item.id)}
          />
        ))}
      </div>

      {loading && <Loading />}

      {!loading && !hasMore && items.length > 0 && (
        <div className="no-more">沒有更多瑜伽動作了</div>
      )}
    </div>
  );
};

export default YogaList; 