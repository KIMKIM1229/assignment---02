import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 從 localStorage 恢復登入狀態
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(Number(savedUserId));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('https://dae-mobile-assignment.hkit.cc/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('登入失敗');
      }

      const data = await response.json();
      setToken(data.token);
      setUserId(data.user_id);
      setIsLoggedIn(true);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', String(data.user_id));
    } catch (error) {
      console.error('登入錯誤:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await fetch('https://dae-mobile-assignment.hkit.cc/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('註冊失敗');
      }

      const data = await response.json();
      setToken(data.token);
      setUserId(data.user_id);
      setIsLoggedIn(true);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', String(data.user_id));
    } catch (error) {
      console.error('註冊錯誤:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const value = {
    isLoggedIn,
    userId,
    token,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 