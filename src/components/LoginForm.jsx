import React, { useState } from 'react';

export default function LoginForm({ onSwitchToRegister, onShowToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      onShowToast('Please enter your email address.', 'error');
      return;
    }
    if (!password) {
      onShowToast('Please enter your password.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Signed in successfully as ${email}!`, 'success');
    }, 800);
  };

  const handleGoogleLogin = () => {
    onShowToast('Google SSO Authentication initialized...', 'info');
  };

  return (
    <div className="form-container">
      
      {/* Title & Subtitle */}
      <h2 className="form-header-title">Welcome back</h2>
      <p className="form-header-sub">Sign in to continue learning</p>

      {/* Google SSO Button */}
      <button type="button" className="btn-google" onClick={handleGoogleLogin}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="divider">or</div>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        
        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label">Email address</label>
          </div>
          <input
            type="email"
            className="input-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label">Password</label>
            <a href="#" className="link-forgot" onClick={(e) => { e.preventDefault(); onShowToast('Password reset link dispatched.', 'info'); }}>
              Forgot?
            </a>
          </div>
          <input
            type="password"
            className="input-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit-purple" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in to Create.IT'}
        </button>

      </form>

      {/* Switch Link */}
      <div className="switch-footer">
        New to Create.IT?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Create an account
        </button>
      </div>

    </div>
  );
}
