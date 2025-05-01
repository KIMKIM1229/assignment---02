import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../Auth/AuthModal';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>瑜伽動作集</h1>
        
        <div className="auth-controls">
          {isAuthenticated ? (
            <div className="user-info">
              <span>歡迎, {user?.username}</span>
              <button onClick={logout} className="logout-button">
                登出
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => handleAuthClick('login')}>
                登入
              </button>
              <button onClick={() => handleAuthClick('register')}>
                註冊
              </button>
            </div>
          )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </header>
  );
};

export default Header; 