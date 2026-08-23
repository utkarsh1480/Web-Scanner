import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { Loader2, Zap } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../Context/LanguageContext';

/* ─────────────────────────────────────────
   Animated visual circle (like Google Ads hero)
───────────────────────────────────────── */
const HeroVisual = ({ scanning, scanStep, t }) => {
  const features = [
    { label: t.performance || 'Performance', color: '#fbbc04', bg: '#fff8e1' },
    { label: t.seo || 'SEO Score', color: '#4285f4', bg: '#e8f0fe' },
    { label: t.security || 'SSL Secure', color: '#34a853', bg: '#e6f4ea' },
    { label: t.accessibility || 'Accessibility', color: '#9c27b0', bg: '#f3e5f5' },
    { label: t.mobile || 'Mobile Ready', color: '#ea4335', bg: '#fce8e6' },
    { label: 'Speed Index', color: '#1a73e8', bg: '#e8f0fe' },
  ];

  return (
    <div style={{
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #e8f0fe 0%, #fce8e6 40%, #e6f4ea 80%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 40px rgba(66,133,244,0.15), 0 2px 12px rgba(0,0,0,0.06)',
      flexShrink: 0,
    }}>
      {/* Center circle */}
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}>
        {scanning ? (
          <Loader2 size={24} style={{ color: '#1a73e8', animation: 'spin 1s linear infinite' }} />
        ) : (
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4285f4' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ea4335' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34a853' }} />
          </div>
        )}
      </div>

      {/* Orbiting feature chips */}
      {features.map((f, i) => {
        const angle = (i / features.length) * 2 * Math.PI - Math.PI / 2;
        const radius = 108;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = scanning && (i === scanStep % features.length);

        return (
          <div
            key={f.label}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              display: 'flex',
              alignItems: 'center',
              background: isActive ? f.bg : '#ffffff',
              border: `1px solid ${isActive ? f.color : '#e8eaed'}`,
              borderRadius: 9999,
              padding: '6px 14px',
              boxShadow: isActive
                ? `0 4px 16px ${f.color}30`
                : '0 2px 6px rgba(0,0,0,0.06)',
              transition: 'all 0.35s ease',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isActive ? f.color : '#3c4043',
              whiteSpace: 'nowrap',
              zIndex: 2,
            }}
          >
            {f.label}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const WebsiteGrader = () => {
  useEffect(() => {
    emailjs.init('-243iobnGw0PSzPnp');
  }, []);

  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanStep, setScanStep] = useState(-1);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (loading) {
      setScanStep(0);
      interval = setInterval(() => {
        setScanStep((prev) => (prev >= 5 ? 0 : prev + 1));
      }, 1100);
    } else {
      setScanStep(-1);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url.trim()) { setError('Please enter a URL'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address'); return;
    }
    setLoading(true);
    setError(null);
    try {
      let checkedUrl = url.trim();
      if (!/^https?:\/\//i.test(checkedUrl)) checkedUrl = 'https://' + checkedUrl;
      try { new URL(checkedUrl); } catch {
        setError('Please enter a valid URL (e.g. https://example.com)');
        setLoading(false); return;
      }
      const { analyzeWebsite } = await import('../services/api.js');
      const data = await analyzeWebsite(checkedUrl);
      const { scores, url: verifiedUrl } = data;
      const perf = scores.details.find(d => d.label === 'Performance')?.score || 0;
      const a11y = scores.details.find(d => d.label === 'Accessibility')?.score || 0;
      const bp   = scores.details.find(d => d.label === 'Best Practices')?.score || 0;
      const seo  = scores.details.find(d => d.label === 'SEO')?.score || 0;

      await emailjs.send('service_sd4ada7', 'template_xcy5z5u', {
        from_name: 'Web Scanner',
        to_email: email.trim(),
        message: `${verifiedUrl}\nPerformance: ${perf}\nAccessibility: ${a11y}\nBest Practices: ${bp}\nSEO: ${seo}\nAggregate: ${((perf+a11y+bp+seo)/4).toFixed(1)}`,
      }, '-243iobnGw0PSzPnp');

      navigate('/lighthouse', { state: { analysisData: data } });
    } catch (err) {
      setError(`Failed to fetch performance data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (!loading) return t.startNow || 'Start now';
    const steps = ['Auditing Performance…', 'Verifying Lighthouse…', 'Measuring Speed…', 'Analyzing SEO…', 'Checking SSL…', 'Evaluating Accessibility…'];
    return steps[scanStep] || 'Running Audit…';
  };

  return (
    <div>
      {/* ── ANNOUNCEMENT BANNER ── */}
      <div className="gs-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="gs-banner-text">
            <strong>{t.bannerText?.split('?')[0]}?</strong> {t.bannerText?.split('?')[1] || t.bannerText}
          </span>
        </div>
        <a
          href="#scanner"
          className="gs-banner-cta"
          onClick={e => { e.preventDefault(); document.getElementById('gs-url-input')?.focus(); }}
        >
          {t.bannerCta || 'Scan now ↓'}
        </a>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="gs-hero" id="scanner">
        <div className="gs-hero-inner">

          {/* LEFT — headline + CTAs */}
          <div className="gs-hero-left">
            <h1 className="gs-hero-headline">
              <span className="line1">{t.heroTitleLine1 || 'Stand out'}</span>
              <span className="line2">{t.heroTitleLine2 || 'with Web Scanner'}</span>
            </h1>

            <p className="gs-hero-subtext">
              {t.heroSubtext || 'Whatever your performance goal, identify slow load times, SEO gaps, security risks, and accessibility issues instantly.'}
            </p>

            <div className="gs-hero-ctas">
              <a
                href="#scan-form"
                className="gs-cta-primary"
                onClick={e => { e.preventDefault(); document.getElementById('gs-url-input')?.focus(); }}
              >
                {t.startNow || 'Start now'}
              </a>
              <a
                href="#scan-form"
                className="gs-cta-secondary"
                onClick={e => { e.preventDefault(); document.getElementById('gs-url-input')?.focus(); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#5f6368" strokeWidth="1.2"/>
                  <path d="M5 7l2 2 3-3" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t.runFreeAudit || 'Run a free audit'}
              </a>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {[
                t.lighthousePowered || 'Lighthouse powered',
                t.sslVerified || 'SSL verified',
                t.realTimeResults || 'Real-time results',
              ].map((text) => (
                <span key={text} style={{ fontSize: '0.8125rem', color: '#5f6368', fontWeight: 500 }}>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — visual circle + scanner form */}
          <div className="gs-hero-right">
            <HeroVisual scanning={loading} scanStep={scanStep} t={t} />

            {/* Scanner form card */}
            <div id="scan-form" className="gs-scanner-card" style={{ marginTop: '1.5rem' }}>
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: loading ? '#fbbc04' : '#1a73e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s',
                }}>
                  {loading
                    ? <Loader2 size={14} style={{ color: '#fff', animation: 'spin 1s linear infinite' }} />
                    : <Zap size={14} style={{ color: '#fff' }} fill="#fff" />
                  }
                </div>
                <div>
                  <p className="gs-scanner-title">{t.liveAuditorEngine || 'Live Auditor Engine'}</p>
                  <p className="gs-scanner-sub">{t.enterDetailsToAnalyze || 'Enter details to analyze all core scores'}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label className="gs-field-label" htmlFor="gs-url-input">{t.websiteUrlLabel || 'Website URL'}</label>
                  <input
                    id="gs-url-input"
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="gs-input"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="gs-field-label">{t.emailAddressLabel || 'Email address'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="gs-input"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" disabled={loading} className="gs-submit" style={{ marginTop: '0.25rem' }}>
                  {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                  {getButtonText()}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/github/dashboard')}
                  disabled={loading}
                  className="gs-submit-ghost"
                >
                  {t.scanRepoBtn || 'Scan Repository →'}
                </button>
              </form>

              {error && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  background: '#fce8e6',
                  border: '1px solid #f5c6c2',
                  borderRadius: 8,
                  color: '#c5221f',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                }}>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="gs-stats-bar">
        <div className="gs-stats-inner">
          {[
            { number: '99/100', label: t.maxPerfScore || 'Max performance score' },
            { number: '< 0.5s', label: t.avgSpeedIndex || 'Average speed index' },
            { number: 'WCAG', label: t.wcagStandard || 'Accessibility standard' },
            { number: 'A+', label: t.sslRating || 'SSL security rating' },
          ].map(({ number, label }) => (
            <div key={label} className="gs-stat-item">
              <div className="gs-stat-number">{number}</div>
              <div className="gs-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES SECTION ── */}
      <section className="gs-features">
        <div className="gs-features-inner">
          <p className="gs-section-label">{t.whatWeAudit || 'What we audit'}</p>
          <h2 className="gs-section-title">
            {t.featuresMainTitle || 'Everything your website needs to rank and convert'}
          </h2>

          <div className="grid-responsive">
            {[
              { title: t.performance || 'Performance', desc: t.performanceDesc || 'Core Web Vitals, LCP, FID, CLS and full Lighthouse performance score with actionable tips.' },
              { title: t.seo || 'SEO Analysis', desc: t.seoDesc || 'Meta tags, heading structure, sitemap validation, canonical URLs and search visibility audit.' },
              { title: t.security || 'Security & SSL', desc: t.securityDesc || 'HTTPS validation, mixed content check, security headers and vulnerability scanning.' },
              { title: t.accessibility || 'Accessibility', desc: t.accessibilityDesc || 'WCAG 2.1 compliance, ARIA labels, color contrast ratios and keyboard navigation testing.' },
              { title: t.mobile || 'Mobile Audit', desc: t.mobileDesc || 'Responsive design check, mobile usability score and viewport configuration review.' },
              { title: t.aiSuggestions || 'AI Suggestions', desc: t.aiSuggestionsDesc || 'Smart recommendations prioritized by impact so you fix what matters most first.' },
            ].map(({ title, desc }) => (
              <div key={title} className="gs-feature-card">
                <div className="gs-feature-title">{title}</div>
                <div className="gs-feature-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WebsiteGrader;
