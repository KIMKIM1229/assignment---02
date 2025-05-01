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
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證輸入
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    if (usernameError || passwordError) {
      setErrors({
        username: usernameError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onSuccess();
    } catch (error) {
      setErrors({
        general: mode === 'login' 
          ? '登入失敗，請檢查用戶名和密碼' 
          : '註冊失敗，請稍後再試',
      });
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
        {errors.username && (
          <span className="error">{errors.username}</span>
        )}
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
        {errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      {errors.general && (
        <div className="error general-error">
          {errors.general}
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