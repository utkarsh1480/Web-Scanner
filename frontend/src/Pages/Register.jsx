import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Lock, Mail, User, Eye, EyeOff, Loader2 } from 'lucide-react';

const LogoDots = () => (
  <div style={{ display: 'flex', gap: '2px' }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4285f4', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ea4335', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbc04', display: 'block' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34a853', display: 'block' }} />
  </div>
);

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!username.trim() || !email.trim() || !password.trim()) {
      setFormError('All fields are required.'); return;
    }
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters.'); return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.'); return;
    }
    setIsSubmitting(true);
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const iconStyle = {
    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
    color: '#9aa0a6', pointerEvents: 'none',
  };

  return (
    <div className="gs-auth-page">
      <div className="gs-auth-card">
        {/* Logo */}
        <Link to="/" className="gs-auth-logo">
          <LogoDots />
          <span className="gs-auth-logo-text">Web Scanner</span>
        </Link>

        <h1 className="gs-auth-title">Create account</h1>
        <p className="gs-auth-subtitle">to get started with Web Scanner</p>

        {formError && <div className="gs-auth-error">{formError}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="gs-auth-field">
            <label className="gs-auth-label" htmlFor="reg-username">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={iconStyle} />
              <input
                id="reg-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="gs-auth-input"
                style={{ paddingLeft: '2.375rem' }}
                required
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="gs-auth-field">
            <label className="gs-auth-label" htmlFor="reg-email">Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={iconStyle} />
              <input
                id="reg-email"
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

          {/* Password */}
          <div className="gs-auth-field">
            <label className="gs-auth-label" htmlFor="reg-password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={iconStyle} />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="gs-auth-input"
                style={{ paddingLeft: '2.375rem', paddingRight: '2.75rem' }}
                required
                disabled={isSubmitting}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, color: '#9aa0a6', cursor: 'pointer', display: 'flex' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="gs-auth-field">
            <label className="gs-auth-label" htmlFor="reg-confirm">Confirm password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={iconStyle} />
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                className="gs-auth-input"
                style={{ paddingLeft: '2.375rem' }}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="gs-auth-btn">
            {isSubmitting
              ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating account…</>
              : 'Create account'
            }
          </button>
        </form>

        <p className="gs-auth-footer" style={{ marginTop: '1.25rem' }}>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Register;
