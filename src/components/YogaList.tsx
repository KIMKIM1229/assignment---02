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
  const MAX_RETRIES = 3;

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // 明確指定要獲取全部 20 個式
      const url = 'https://dae-mobile-assignment.hkit.cc/api/yoga-poses?limit=20&page=1';
      console.log('發送請求到:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('API 回應:', data);

      // 如果是測試錯誤，等待後重試
      if (data.error === "Error injected for testing purposes") {
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          const waitTime = Math.max(data.probabilityWindow - data.timePassed, 1000);
          setTimeout(fetchItems, waitTime);
          return;
        }
      }

      // 確保有 items 且是陣列
      if (data.items && Array.isArray(data.items)) {
        console.log(`獲取到 ${data.items.length} 個瑜伽動作`);
        setItems(data.items);
        setRetryCount(0);
      } else {
        throw new Error('無法獲取瑜伽動作列表');
      }

    } catch (err) {
      console.error('載入錯誤:', err);
      setError('載入瑜伽動作時發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="yoga-list">
      {loading && (
        <div className="loading">
          載入中...
          {retryCount > 0 && <div>第 {retryCount + 1} 次嘗試</div>}
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button onClick={() => {
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
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          目前顯示: {items.length} 個瑜伽動作
        </div>
      )}
    </div>
  );
};

export default YogaList; 