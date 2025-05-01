import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { YogaAction, ListParams } from '../../types';
import YogaCard from './YogaCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import SearchFilters from './SearchFilters';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useBookmarks } from '../../hooks/useBookmarks';

interface YogaItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

const YogaList: React.FC = () => {
  const [items, setItems] = useState<YogaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<ListParams>({
    page: 1,
    limit: 5,
  });
  const { bookmarkedItems, isBookmarked } = useBookmarks();
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getItems();
      console.log('API 響應:', response);
      setItems(response.items || []);
    } catch (err) {
      console.error('載入錯誤:', err);
      setError('載入瑜伽動作時發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (searchParams: Partial<ListParams>) => {
    setParams(prev => ({
      ...prev,
      ...searchParams,
      page: 1,
    }));
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="error-container">
      <ErrorMessage message={error} />
      <button 
        className="retry-button"
        onClick={loadData}
      >
        重試
      </button>
    </div>
  );

  return (
    <div className="yoga-list">
      <SearchFilters 
        onSearch={handleSearch}
        showBookmarkedOnly={showBookmarkedOnly}
        onToggleBookmarkedOnly={() => setShowBookmarkedOnly(prev => !prev)}
      />

      <div className="yoga-grid">
        {items.map(item => (
          <YogaCard 
            key={item.id} 
            yoga={item}
            isBookmarked={isBookmarked(item.id)}
          />
        ))}
      </div>

      {!loading && !error && items.length === 0 && (
        <div className="no-results">沒有找到相關的瑜伽動作</div>
      )}
    </div>
  );
};

export default YogaList; 