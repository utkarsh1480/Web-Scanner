import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

// Google-style colored dots logo
const LogoDots = () => (
  <div style={{ display: 'flex', gap: '2px' }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4285f4', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ea4335', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbc04', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34a853', display: 'block' }} />
  </div>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email.trim() || !password.trim()) {
      setFormError('Email and password are required.'); return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gs-auth-page">
      <div className="gs-auth-card">
        {/* Logo */}
        <Link to="/" className="gs-auth-logo">
          <LogoDots />
          <span className="gs-auth-logo-text">Web Scanner</span>
        </Link>

        <h1 className="gs-auth-title">Sign in</h1>
        <p className="gs-auth-subtitle">to continue to Web Scanner</p>

        {formError && <div className="gs-auth-error">{formError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="gs-auth-field">
            <label className="gs-auth-label" htmlFor="login-email">Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9aa0a6', pointerEvents: 'none' }} />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="gs-auth-input"
                style={{ paddingLeft: '2.375rem' }}
                required
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="gs-auth-field">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label className="gs-auth-label" htmlFor="login-password" style={{ margin: 0 }}>Password</label>
              <Link
                to="/forgot-password"
                style={{ fontSize: '0.875rem', color: '#1a73e8', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >
                Forgot password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9aa0a6', pointerEvents: 'none' }} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="gs-auth-input"
                style={{ paddingLeft: '2.375rem', paddingRight: '2.75rem' }}
                required
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', padding: 0,
                  color: '#9aa0a6', cursor: 'pointer', display: 'flex',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#5f6368'}
                onMouseLeave={e => e.currentTarget.style.color = '#9aa0a6'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="gs-auth-btn">
            {isSubmitting
              ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in…</>
              : 'Sign in'
            }
          </button>
        </form>

        <div className="gs-auth-divider">or</div>

        <p className="gs-auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create account</Link>
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;
