import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface YogaItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

const YogaList = () => {
  const [items, setItems] = useState<YogaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = 'https://dae-mobile-assignment.hkit.cc/api/yoga-poses';
      console.log(`開始請求 API: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('API 響應狀態:', response.status);
      console.log('API 響應標頭:', Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log('API 響應內容:', text);

      if (!response.ok) {
        throw new Error(`API 錯誤: ${response.status} - ${text}`);
      }

      const data = JSON.parse(text);
      console.log('解析後的數據:', data);

      if (!Array.isArray(data.items)) {
        throw new Error(`數據格式錯誤: ${JSON.stringify(data)}`);
      }

      setItems(data.items);
      setRetryCount(0);
    } catch (err) {
      console.error('完整錯誤信息:', err);
      setError(`載入失敗: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        載入中...
        {retryCount > 0 && <div className="retry-info">第 {retryCount + 1} 次嘗試</div>}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => fetchItems()} className="retry-button">
          重試
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="no-data">暫無資料</div>;
  }

  return (
    <div className="yoga-list">
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="yoga-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YogaList; 