import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import HeroPanel from './components/HeroPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HelpModal from './components/HelpModal';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'login', or 'register'
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
      {view === 'landing' ? (
        <LandingPage onNavigate={(targetView) => setView(targetView)} />
      ) : view === 'login' ? (
        /* Split Screen Login Layout */
        <div className="split-layout">
          {/* Left Hero Showcase */}
          <HeroPanel />

          {/* Right Login Form */}
          <div className="form-panel">
            <button 
              type="button" 
              className="btn-back-home"
              onClick={() => setView('landing')}
              title="Return to home page"
            >
              <ArrowLeft size={14} /> Home
            </button>
            <LoginForm 
              onSwitchToRegister={() => setView('register')}
              onShowToast={showToast}
            />
          </div>
        </div>
      ) : (
        /* Centered Register Layout */
        <div className="centered-layout">
          <button 
            type="button" 
            className="btn-back-home-top"
            onClick={() => setView('landing')}
            title="Return to home page"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
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
