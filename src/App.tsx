import React, { useState } from 'react';
import { AuthProvider } from './components/Auth/AuthContext';
import ItemList from './components/List/ItemList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App: React.FC = () => {
  const [showAuth, setShowAuth] = useState<'login' | 'register' | null>(null);

  return (
    <AuthProvider>
      <div className="app">
        <header>
          <h1>課程列表</h1>
          <div className="auth-buttons">
            {showAuth === null ? (
              <>
                <button onClick={() => setShowAuth('login')}>登入</button>
                <button onClick={() => setShowAuth('register')}>註冊</button>
              </>
            ) : (
              <button onClick={() => setShowAuth(null)}>返回</button>
            )}
          </div>
        </header>

        <main>
          {showAuth === 'login' && <Login onClose={() => setShowAuth(null)} />}
          {showAuth === 'register' && <Register onClose={() => setShowAuth(null)} />}
          {showAuth === null && <ItemList />}
        </main>
      </div>
    </AuthProvider>
  );
};

export default App; 