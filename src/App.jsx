import React, { useState } from 'react';
import HeroPanel from './components/HeroPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HelpModal from './components/HelpModal';
import { HelpCircle } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <div className="app-container">
      
      {/* Toast Notification Popup */}
      {toast && (
        <div className="toast-msg">
          {toast.message}
        </div>
      )}

      {/* Render Layout based on view */}
      {view === 'login' ? (
        /* SCREENSHOT 1: Split Screen Layout */
        <div className="split-layout">
          {/* Left Hero Showcase */}
          <HeroPanel />

          {/* Right Login Form */}
          <div className="form-panel">
            <LoginForm 
              onSwitchToRegister={() => setView('register')}
              onShowToast={showToast}
            />
          </div>
        </div>
      ) : (
        /* SCREENSHOT 2: Centered Register Layout */
        <div className="centered-layout">
          <RegisterForm 
            onSwitchToLogin={() => setView('login')}
            onShowToast={showToast}
          />
        </div>
      )}

      {/* Floating Bottom-Right Help (?) Button */}
      <button 
        className="help-floating-btn"
        onClick={() => setIsHelpModalOpen(true)}
        title="UX Project Information"
      >
        <HelpCircle size={18} />
      </button>

      {/* Help Modal */}
      <HelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

    </div>
  );
}
