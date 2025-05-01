import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { validateUsername, validatePassword } from '../../utils/validation';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證表單
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    if (usernameError || passwordError) {
      setErrors({
        username: usernameError || undefined,
        password: passwordError || undefined
      });
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      onClose();
    } catch (error) {
      setErrors({
        general: '登入失敗，請檢查您的使用者名稱和密碼'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">使用者名稱</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
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
            disabled={loading}
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        {errors.general && (
          <div className="error general-error">{errors.general}</div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? '登入中...' : '登入'}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; 