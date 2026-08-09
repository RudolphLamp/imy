import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function RegisterForm({ onSwitchToLogin, onShowToast }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) {
      onShowToast('Please enter your full name.', 'error');
      return;
    }
    if (!email) {
      onShowToast('Please enter your email address.', 'error');
      return;
    }
    if (!password) {
      onShowToast('Please create a password.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      onShowToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Account created for ${fullName}! Redirecting to login...`, 'success');
      setTimeout(() => onSwitchToLogin(), 1000);
    }, 800);
  };

  return (
    <div className="form-container">
      
      {/* Back Link */}
      <button 
        type="button" 
        onClick={onSwitchToLogin}
        style={{
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          fontSize: '13px',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={14} /> Back to login
      </button>

      {/* Header Title */}
      <h2 className="form-header-title">Create account</h2>
      <p className="form-header-sub">Join 50,000+ multimedia creators</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        
        <div className="input-group">
          <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Full name</label>
          <input
            type="text"
            className="input-control"
            placeholder="Jane Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            className="input-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            className="input-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Confirm password</label>
          <input
            type="password"
            className="input-control"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit-purple" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

      </form>

    </div>
  );
}
