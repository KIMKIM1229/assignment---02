import React, { useState } from 'react';
import { ListParams } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface SearchFiltersProps {
  onSearch: (params: Partial<ListParams>) => void;
  showBookmarkedOnly: boolean;
  onToggleBookmarkedOnly: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  showBookmarkedOnly,
  onToggleBookmarkedOnly,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { isAuthenticated } = useAuth();

  const categories = [
    '初學者',
    '進階',
    '冥想',
    '伸展',
    '力量',
    '平衡',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search: searchTerm,
      category,
      sort: sortField,
      order: sortOrder,
    });
  };

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit}>
        <div className="search-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋瑜伽動作..."
            className="search-input"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">所有類別</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-row">
          <div className="sort-controls">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="sort-select"
            >
              <option value="">排序方式</option>
              <option value="title">名稱</option>
              <option value="difficulty">難度</option>
              <option value="duration">時長</option>
            </select>

            {sortField && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="order-select"
              >
                <option value="asc">升序</option>
                <option value="desc">降序</option>
              </select>
            )}
          </div>

          {isAuthenticated && (
            <label className="bookmark-filter">
              <input
                type="checkbox"
                checked={showBookmarkedOnly}
                onChange={onToggleBookmarkedOnly}
              />
              只顯示已收藏
            </label>
          )}
        </div>

        <button type="submit" className="search-button">
          搜尋
        </button>
      </form>
    </div>
  );
};

export default SearchFilters; 