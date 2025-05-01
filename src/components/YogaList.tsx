import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';

interface YogaItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  category?: string;
  difficulty?: string;
}

interface SearchFilters {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

const YogaList = () => {
  const { isLoggedIn } = useAuth();
  const { bookmarkedItems, isBookmarked, toggleBookmark } = useBookmarks();
  
  const [items, setItems] = useState<YogaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  
  const ITEMS_PER_PAGE = 5;

  const fetchItems = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL('https://dae-mobile-assignment.hkit.cc/api/yoga-poses');
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', ITEMS_PER_PAGE.toString());
      
      // 添加搜尋和過濾參數
      if (filters.search) url.searchParams.set('search', filters.search);
      if (filters.category) url.searchParams.set('category', filters.category);
      if (filters.sort) {
        url.searchParams.set('sort', filters.sort);
        url.searchParams.set('order', filters.order || 'asc');
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.error === "Error injected for testing purposes") {
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchItems(isLoadMore), 1000);
          return;
        }
      }

      let filteredItems = data.items;
      
      // 如果只顯示收藏項目
      if (showBookmarkedOnly) {
        filteredItems = filteredItems.filter(item => isBookmarked(item.id));
      }

      if (isLoadMore) {
        setItems(prev => [...prev, ...filteredItems]);
      } else {
        setItems(filteredItems);
      }

      setHasMore(data.items.length === ITEMS_PER_PAGE);
      setRetryCount(0);

    } catch (err) {
      console.error('載入錯誤:', err);
      setError('載入瑜伽動作時發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 處理搜尋和過濾
  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchItems();
  };

  // 處理收藏切換
  const handleBookmarkToggle = async (itemId: number) => {
    try {
      await toggleBookmark(itemId);
      // 如果只顯示收藏項目，則重新載入列表
      if (showBookmarkedOnly) {
        fetchItems();
      }
    } catch (err) {
      console.error('收藏操作失敗:', err);
    }
  };

  // 初始載入
  useEffect(() => {
    fetchItems();
  }, [showBookmarkedOnly]); // 當切換顯示收藏項目時重新載入

  // 無限捲動
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      if (!loading && hasMore) {
        setPage(prev => prev + 1);
        fetchItems(true);
      }
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="yoga-list">
      <div className="filters">
        <input
          type="text"
          placeholder="搜尋瑜伽動作..."
          onChange={e => handleSearch({ ...filters, search: e.target.value })}
          className="search-input"
        />
        
        <select
          onChange={e => handleSearch({ ...filters, category: e.target.value })}
          className="category-select"
        >
          <option value="">所有類別</option>
          <option value="初階">初階</option>
          <option value="中階">中階</option>
          <option value="進階">進階</option>
        </select>

        <select
          onChange={e => handleSearch({ 
            ...filters, 
            sort: e.target.value,
            order: filters.order || 'asc'
          })}
          className="sort-select"
        >
          <option value="">排序方式</option>
          <option value="title">名稱</option>
          <option value="difficulty">難度</option>
        </select>

        {isLoggedIn && (
          <label className="bookmark-filter">
            <input
              type="checkbox"
              checked={showBookmarkedOnly}
              onChange={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            />
            只顯示已收藏
          </label>
        )}
      </div>

      {loading && page === 1 && (
        <div className="loading">
          載入中...
          {retryCount > 0 && <div>第 {retryCount + 1} 次嘗試</div>}
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button onClick={() => {
            setPage(1);
            setRetryCount(0);
            fetchItems();
          }} className="retry-button">
            重試
          </button>
        </div>
      )}

      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="yoga-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} />
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleBookmarkToggle(item.id)}
                className={`bookmark-button ${isBookmarked(item.id) ? 'bookmarked' : ''}`}
              >
                {isBookmarked(item.id) ? '❤️ 取消收藏' : '🤍 收藏'}
              </button>
            )}
          </div>
        ))}
      </div>

      {hasMore && !loading && !error && (
        <button onClick={() => {
          setPage(prev => prev + 1);
          fetchItems(true);
        }} className="load-more">
          載入更多
        </button>
      )}

      {loading && page > 1 && (
        <div className="loading">載入更多...</div>
      )}
    </div>
  );
};

export default YogaList; 