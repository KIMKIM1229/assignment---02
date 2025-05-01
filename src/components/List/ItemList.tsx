import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { Item, ListResponse, ListParams } from '../../types';
import { useAuth } from '../Auth/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import ItemCard from './ItemCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import SearchFilters from './SearchFilters';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<ListParams>({
    limit: 3,
    page: 1
  });

  const { token } = useAuth();

  const fetchItems = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get<ListResponse>('/courses', params);
      
      if (isLoadMore) {
        setItems(prev => [...prev, ...response.items]);
      } else {
        setItems(response.items);
      }
      
      setHasMore(response.pagination.page * response.pagination.limit < response.pagination.total);
    } catch (err) {
      setError('載入資料時發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setParams(prev => ({ ...prev, page: nextPage }));
      fetchItems(true);
    }
  };

  return (
    <div className="item-list">
      {error && <ErrorMessage message={error} />}
      
      <div className="items-grid">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {loading && <Loading />}
      
      {hasMore && !loading && (
        <button 
          className="load-more-button"
          onClick={loadMore}
          disabled={loading}
        >
          載入更多
        </button>
      )}
    </div>
  );
};

export default ItemList; 