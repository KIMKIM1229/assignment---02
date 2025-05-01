import React, { useState, useEffect } from 'react';

const TestAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [autoRetry, setAutoRetry] = useState(false);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dae-mobile-assignment.hkit.cc/api/yoga-actions');
      const text = await response.text();
      
      console.log('API 響應狀態:', response.status);
      console.log('API 響應內容:', text);
      
      // 嘗試解析 JSON
      try {
        const data = JSON.parse(text);
        if (data.error === "Error injected for testing purposes") {
          // 這是預期中的測試錯誤
          setResult({
            status: response.status,
            error: data.error,
            details: data.details,
            failureProbability: data.failureProbability,
            timePassed: data.timePassed,
            probabilityWindow: data.probabilityWindow
          });
          
          // 如果開啟了自動重試，等待一段時間後重試
          if (autoRetry && retryCount < 10) {
            const retryDelay = Math.max(data.probabilityWindow - data.timePassed, 1000);
            console.log(`將在 ${retryDelay/1000} 秒後重試...`);
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
              testAPI();
            }, retryDelay);
          }
        } else {
          setResult({
            status: response.status,
            data: data
          });
        }
      } catch (e) {
        setResult({
          status: response.status,
          text: text
        });
      }
    } catch (err) {
      console.error('測試錯誤:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testAPI} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? '測試中...' : '測試 API'}
        </button>

        <label style={{ marginLeft: '10px' }}>
          <input 
            type="checkbox" 
            checked={autoRetry} 
            onChange={e => setAutoRetry(e.target.checked)}
          />
          自動重試
        </label>

        {retryCount > 0 && (
          <span style={{ marginLeft: '10px' }}>
            重試次數: {retryCount}
          </span>
        )}
      </div>
      
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '10px', 
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          錯誤: {error}
        </div>
      )}
      
      {result && (
        <div style={{ 
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px'
        }}>
          <h3>測試結果:</h3>
          <div>狀態碼: {result.status}</div>
          {result.error && (
            <>
              <div>錯誤類型: {result.error}</div>
              <div>錯誤詳情: {result.details}</div>
              <div>失敗機率: {(result.failureProbability * 100).toFixed(2)}%</div>
              <div>已過時間: {result.timePassed}ms</div>
              <div>時間窗口: {result.probabilityWindow}ms</div>
              <div>建議等待時間: {Math.max(result.probabilityWindow - result.timePassed, 0)}ms</div>
            </>
          )}
          {!result.error && (
            <pre style={{ 
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {JSON.stringify(result.data || result.text, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default TestAuth; 