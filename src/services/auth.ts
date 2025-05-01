const BASE_URL = 'https://dae-mobile-assignment.hkit.cc';
const API_PATH = '/api';  // 添加基礎端點

export const authService = {
  async signup(username: string, password: string) {
    try {
      const response = await fetch(`${BASE_URL}${API_PATH}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      console.log('註冊響應狀態:', response.status);
      const text = await response.text();
      console.log('註冊響應內容:', text);
      
      if (!response.ok) {
        throw new Error(`註冊失敗: ${response.status}`);
      }
      
      return JSON.parse(text);
    } catch (error) {
      console.error('註冊錯誤:', error);
      throw error;
    }
  }
}; 