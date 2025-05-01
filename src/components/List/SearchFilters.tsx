import React, { useState } from 'react';
import { ListParams } from '../../types';
import { useAuth } from '../Auth/AuthContext';

interface SearchFiltersProps {
  onSearch: (params: Partial<ListParams>) => void;
  showBookmarkedOnly: boolean;
  onToggleBookmarkedOnly: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  showBookmarkedOnly,
  onToggleBookmarkedOnly
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search: searchTerm,
      category,
      sort: sortField,
      order: sortOrder
    });
  };

  const categories = [
    '程式基礎',
    '網頁開發',
    '行動應用',
    '資料科學',
    '人工智慧'
  ];

  const sortOptions = [
    { value: 'title', label: '標題' },
    { value: 'category', label: '分類' }
  ];

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋課程..."
          />
        </div>

        <div className="filter-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">所有分類</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">排序方式</option>
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {sortField && (
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">升序</option>
              <option value="desc">降序</option>
            </select>
          )}
        </div>

        {isAuthenticated && (
          <div className="bookmark-filter">
            <label>
              <input
                type="checkbox"
                checked={showBookmarkedOnly}
                onChange={onToggleBookmarkedOnly}
              />
              只顯示已收藏
            </label>
          </div>
        )}

        <button type="submit">搜尋</button>
      </form>
    </div>
  );
};

export default SearchFilters; 