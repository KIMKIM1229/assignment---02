import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { validateUsername, validatePassword } from '../../utils/validation';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess }) => {
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onSuccess();
    } catch (err) {
      console.error('認證錯誤:', err);
      setError(mode === 'login' ? '登入失敗' : '註冊失敗');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{mode === 'login' ? '登入' : '註冊'}</h2>
      
      <div className="form-group">
        <label htmlFor="username">用戶名</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          placeholder="請輸入用戶名"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">密碼</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="請輸入密碼"
        />
      </div>

      {error && (
        <div className="error general-error">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading}
        className="submit-button"
      >
        {isLoading 
          ? '處理中...' 
          : mode === 'login' ? '登入' : '註冊'
        }
      </button>
    </form>
  );
};

export default AuthForm; 