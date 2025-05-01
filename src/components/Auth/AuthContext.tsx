import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AuthResponse } from '../../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user_id: number | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 從 localStorage 恢復登入狀態
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      checkAuthStatus(storedToken);
    }
  }, []);

  const checkAuthStatus = async (authToken: string) => {
    try {
      const response = await api.get('/auth/check', {}, authToken);
      setIsAuthenticated(true);
      setUserId(response.user_id);
    } catch (error) {
      logout();
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        username,
        password,
      });
      setToken(response.token);
      setUserId(response.user_id);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw new Error('登入失敗');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', {
        username,
        password,
      });
      setToken(response.token);
      setUserId(response.user_id);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw new Error('註冊失敗');
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user_id: userId,
        token,
        login,
        register,
        logout,
      }}
    >
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