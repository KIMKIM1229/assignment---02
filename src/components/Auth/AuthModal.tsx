import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './AuthForm';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
          <AuthForm mode={mode} onSuccess={onClose} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal; 