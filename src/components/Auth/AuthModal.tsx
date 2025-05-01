import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './AuthForm';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <AuthForm mode={mode} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default AuthModal; 