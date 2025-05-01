import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <header className="header">
      <h1>瑜伽動作列表</h1>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button onClick={logout}>登出</button>
        ) : (
          <>
            <button onClick={() => handleAuthClick('login')}>登入</button>
            <button onClick={() => handleAuthClick('register')}>註冊</button>
          </>
        )}
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