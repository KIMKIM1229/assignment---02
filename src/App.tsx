import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import YogaList from './components/YogaList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main>
          <YogaList />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App; 