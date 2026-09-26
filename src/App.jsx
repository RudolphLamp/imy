import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import HeroPanel from './components/HeroPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProductsView from './components/products/ProductsView';
import HelpModal from './components/HelpModal';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('products'); // 'products', 'login', 'register', 'landing'
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('createit_user');
      const account = saved ? JSON.parse(saved) : { name: 'Jane Smith', email: 'jane.smith@createit.academy', isPro: true };
      return { ...account, id: account.id || account.email?.toLowerCase() || 'demo-jane' };
    } catch {
      return { id: 'jane.smith@createit.academy', name: 'Jane Smith', email: 'jane.smith@createit.academy', isPro: true };
    }
  });
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLoginSuccess = (user) => {
    const account = { ...user, id: user.id || user.email?.toLowerCase() };
    setCurrentUser(account);
    try {
      localStorage.setItem('createit_user', JSON.stringify(account));
    } catch {}
    setView('products');
  };

  const handleRegisterSuccess = (user) => {
    const account = { ...user, id: user.id || user.email?.toLowerCase() };
    setCurrentUser(account);
    try {
      localStorage.setItem('createit_user', JSON.stringify(account));
    } catch {}
    setView('products');
  };

  return (
    <div className="app-container">
      
      {/* Toast Notification Popup */}
      {toast && (
        <div role="status" aria-live="polite" className={`toast-msg ${toast.type === 'error' ? 'toast-error' : toast.type === 'success' ? 'toast-success' : ''}`}>
          {toast.message}
        </div>
      )}

      {/* Render Layout based on view */}
      {view === 'landing' ? (
        <LandingPage onNavigate={(targetView) => setView(targetView)} />
      ) : view === 'products' ? (
        <ProductsView 
          user={currentUser}
          onUpdateUser={(updatedUser) => {
            setCurrentUser(updatedUser);
            localStorage.setItem('createit_user', JSON.stringify(updatedUser));
          }}
          onLogout={() => {
            showToast('Signed out successfully.', 'info');
            setView('login');
          }}
          onBackToHome={() => setView('landing')}
          onShowToast={showToast}
          onNavigateView={(targetView) => setView(targetView)}
        />
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
              onLoginSuccess={handleLoginSuccess}
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
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      )}

      {/* Floating Bottom-Right Help (?) Button */}
      {view !== 'products' && (
        <button 
          className="help-floating-btn"
          onClick={() => setIsHelpModalOpen(true)}
          title="UX Project Information"
        >
          <HelpCircle size={18} />
        </button>
      )}

      {/* Help Modal */}
      <HelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

    </div>
  );
}
