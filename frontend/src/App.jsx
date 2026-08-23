import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import WebsiteGrader from "./components/WebsiteGrader";
import Lighthouse from "./components/Lighthouse";
import GitHubScan from "./components/GitHub/GitHubScan";
import Contact from './components/Contact';
import Services from "./components/Servicepage";
import { useLanguage } from "./Context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Profile from "./Pages/Profile";

// Google-style colored dot logo mark
const LogoDots = () => (
  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4285f4', display: 'block' }} />
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ea4335', display: 'block' }} />
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbc04', display: 'block' }} />
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34a853', display: 'block' }} />
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>

      {/* ── NAVIGATION ── */}
      <nav className="gs-nav">


        {/* Main nav bar */}
        <div className="gs-nav-main">
          <div className="gs-nav-main-left">
            {/* Logo */}
            <Link to="/" className="gs-logo-link">
              <LogoDots />
              <span className="gs-logo-text">Web Scanner</span>
            </Link>

            {/* Nav items — desktop */}
            <div className="hidden md:flex items-center">
              <Link to="/" className="gs-nav-item">Home</Link>
              <Link to="/lighthouse" className="gs-nav-item">Lighthouse</Link>
              <Link to="/github/dashboard" className="gs-nav-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code Scan
              </Link>
              <Link to="/cms" className="gs-nav-item">{t.navServices}</Link>
              <Link to="/contact" className="gs-nav-item">{t.navContact}</Link>
            </div>
          </div>

          <div className="gs-nav-main-right">
            {/* Language picker — desktop */}
            <div className="hidden md:flex items-center">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  className="h-8 w-auto border-0 bg-transparent text-sm text-gray-600 focus:ring-0 shadow-none gap-1"
                  style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: 8 }}>
                  {[['en','🇺🇸 EN'],['de','🇩🇪 DE'],['es','🇪🇸 ES'],['fr','🇫🇷 FR'],['ja','🇯🇵 JA'],['pt','🇵🇹 PT']].map(([val, label]) => (
                    <SelectItem key={val} value={val}><span style={{ color: '#202124', fontSize: '0.875rem' }}>{label}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  <img src={user.avatar} alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #e8eaed', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#3c4043', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.username}</span>
                </Link>
                <button onClick={logout} className="gs-btn-signin" style={{ fontSize: '0.8125rem', padding: '0.375rem 0.875rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="gs-btn-signin">Sign in</Link>
                <Link to="/register" className="gs-btn-start">Start now</Link>
              </div>
            )}

            {/* Hamburger — mobile */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368' }}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {isMobileMenuOpen ? (
                  <path d="M2 2L18 18M2 18L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobileMenuOpen && (
          <div style={{
            borderTop: '1px solid #e8eaed',
            background: '#fff',
            padding: '0.5rem 0 1rem',
          }}>
            {[['/', 'Home'], ['/lighthouse', 'Lighthouse'], ['/github/dashboard', 'Code Scan'], ['/cms', 'Services'], ['/contact', 'Contact']].map(([href, label]) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'block', padding: '0.625rem 1.5rem', fontSize: '0.9375rem', fontWeight: 500, color: '#3c4043', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid #e8eaed', margin: '0.75rem 1.5rem', paddingTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              {user ? (
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="gs-btn-signin" style={{ width: '100%', justifyContent: 'center' }}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="gs-btn-signin" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
                  <Link to="/register" className="gs-btn-start" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Start now</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<WebsiteGrader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/lighthouse" element={<ProtectedRoute><Lighthouse /></ProtectedRoute>} />
          <Route path="/github/dashboard" element={<ProtectedRoute><GitHubScan /></ProtectedRoute>} />
          <Route path="/cms" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </main>

      {/* ── FOOTER ── */}
      <footer className="gs-footer">
        <div className="gs-footer-inner">
          <div className="gs-footer-top">
            <div>
              <Link to="/" className="gs-logo-link" style={{ marginBottom: '0.75rem', display: 'inline-flex', textDecoration: 'none' }}>
                <LogoDots />
                <span className="gs-logo-text">Web Scanner</span>
              </Link>
              <p style={{ fontSize: '0.8125rem', color: '#5f6368', marginTop: '0.5rem', lineHeight: 1.6 }}>
                {t.footerAbout}
              </p>
            </div>

            <div>
              <p className="gs-footer-col-title">Tools</p>
              <Link to="/" className="gs-footer-link">Web Grader</Link>
              <Link to="/lighthouse" className="gs-footer-link">Lighthouse Audit</Link>
              <Link to="/github/dashboard" className="gs-footer-link">Code Scanner</Link>
            </div>

            <div>
              <p className="gs-footer-col-title">Company</p>
              <Link to="/cms" className="gs-footer-link">Services</Link>
              <Link to="/contact" className="gs-footer-link">Contact Us</Link>
            </div>

            <div>
              <p className="gs-footer-col-title">Account</p>
              <Link to="/login" className="gs-footer-link">Sign in</Link>
              <Link to="/register" className="gs-footer-link">Create account</Link>
            </div>
          </div>

          <div className="gs-footer-bottom">
            <span className="gs-footer-copy">© {new Date().getFullYear()} Web Scanner · {t.footerRights}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;