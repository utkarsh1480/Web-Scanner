import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search, Sparkles, Flame, Check, Loader2 } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../Context/LanguageContext';

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
  const form = useRef();

  // Cycle through the 6 metrics during analysis loading
  useEffect(() => {
    let interval;
    if (loading) {
      setScanStep(0);
      interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev >= 5) {
            return 0; // Loop scanning highlights
          }
          return prev + 1;
        });
      }, 1100);
    } else {
      setScanStep(-1);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let checkedUrl = url.trim();
      if (!/^https?:\/\//i.test(checkedUrl)) {
        checkedUrl = 'https://' + checkedUrl;
      }
      try {
        new URL(checkedUrl);
      } catch (e) {
        setError('Please enter a valid and complete URL (e.g., https://example.com)');
        setLoading(false);
        return;
      }

      const { analyzeWebsite } = await import('../services/api.js');
      const data = await analyzeWebsite(checkedUrl);

      const { scores, metrics, recommendations, url: verifiedUrl } = data;

      const performanceScore = scores.details.find(d => d.label === 'Performance')?.score || 0;
      const accessibilityScore = scores.details.find(d => d.label === 'Accessibility')?.score || 0;
      const bestPracticesScore = scores.details.find(d => d.label === 'Best Practices')?.score || 0;
      const seoScore = scores.details.find(d => d.label === 'SEO')?.score || 0;

      const emailContent = `
        ${verifiedUrl}
        Performance Score: ${performanceScore}
        Accessibility Score:${accessibilityScore}
        Best Practices Score: ${bestPracticesScore}
        SEO Score: ${seoScore}
        Aggregate Score: ${(
          (performanceScore + accessibilityScore + bestPracticesScore + seoScore) /
          4
        ).toFixed(1)}
      `;

      await emailjs.send(
        'service_sd4ada7',
        'template_xcy5z5u',
        {
          from_name: 'Web Scanner',
          to_email: email.trim(),
          message: emailContent,
        },
        '-243iobnGw0PSzPnp'
      );

      navigate('/lighthouse', { state: { analysisData: data } });
    } catch (error) {
      setError(`Failed to fetch performance data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (!loading) return 'Start Audit Run →';
    switch (scanStep) {
      case 0: return 'Auditing Performance...';
      case 1: return 'Verifying Lighthouse...';
      case 2: return 'Measuring Speed Index...';
      case 3: return 'Analyzing SEO Metrics...';
      case 4: return 'Checking SSL Certificates...';
      case 5: return 'Evaluating Accessibility...';
      default: return 'Running Full Audit...';
    }
  };

  const badgeClass = (index, positionClass) => {
    const base = `ch-floating-badge ${positionClass}`;
    if (!loading) return base;
    return scanStep === index 
      ? `${base} scanning-highlight` 
      : `${base} scanning-dim`;
  };

  const mobileBadgeClass = (index) => {
    if (!loading) return 'ch-mobile-badge-card';
    return scanStep === index 
      ? 'ch-mobile-badge-card scanning-highlight' 
      : 'ch-mobile-badge-card scanning-dim';
  };

  const formElement = (isMobile = false) => (
    <div className={`${isMobile ? "ch-scanner-card-mobile" : "ch-scanner-card"} ${loading ? "scanning" : ""}`}>
      <div className={`ch-scanner-header-box ${loading ? "scanning" : ""}`}>
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <Zap className="w-5 h-5 fill-white" />
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        Live Auditor Engine
      </h3>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-5 leading-relaxed">
        Enter website details to analyze all core scores.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Website URL</label>
          <input
            id={isMobile ? "ch-url-input-mobile" : "ch-url-input"}
            ref={isMobile ? null : form}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="ch-input"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">E-mail Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="ch-input"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="ch-submit-btn font-bold tracking-wide"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
          <span>{getButtonText()}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/github/dashboard')}
          disabled={loading}
          className="w-full bg-slate-50 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-full text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2 disabled:opacity-50 hover:-translate-y-[1px]"
        >
          Scan Repository →
        </button>
      </form>

      {error && (
        <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-semibold mt-3 animate-in fade-in duration-200">
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="ch-wrapper">
      <div className="ch-container">
        
        {/* Centered Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/15 text-xs font-bold text-orange-600 dark:text-orange-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <span>✨</span>
          <span>Core Audits & Real-Time Performance</span>
        </div>

        {/* Centered Headline */}
        <h1 className="ch-headline tracking-tight leading-none mb-6">
          Analyze, audit, and optimize
          <br />
          your web performance globally.
        </h1>

        {/* Subtitle */}
        <p className="ch-sub mb-10">
          Identify slow load times, SEO gaps, security vulnerabilities, and accessibility compliance issues instantly with our premium auditing suite.
        </p>

        {/* Main Centered CTA */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => {
              const el = document.getElementById(window.innerWidth < 1024 ? "ch-url-input-mobile" : "ch-url-input");
              if (el) el.focus();
            }}
            className="ch-btn-orange"
          >
            Start scanning free <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#more-info"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(window.innerWidth < 1024 ? "ch-url-input-mobile" : "ch-url-input");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ch-btn-text"
          >
            <span>Run a live demo</span>
            <span>→</span>
          </a>
        </div>

        {/* CONNECTION HUB (Desktop Grid View) */}
        <div className="ch-hub-wrapper">
          
          {/* SVG Connection Lines with animate paths */}
          <svg className="ch-svg-paths" viewBox="0 0 1000 500">
            {/* Left paths */}
            <path d="M 500 260 C 350 260, 200 180, 120 120" className="ch-svg-line" />
            <path d="M 500 260 C 350 260, 200 180, 120 120" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />

            <path d="M 500 260 C 420 260, 320 270, 220 270" className="ch-svg-line" />
            <path d="M 500 260 C 420 260, 320 270, 220 270" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />

            <path d="M 500 260 C 350 260, 200 340, 130 400" className="ch-svg-line" />
            <path d="M 500 260 C 350 260, 200 340, 130 400" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />
            
            {/* Right paths */}
            <path d="M 500 260 C 650 260, 800 180, 880 120" className="ch-svg-line" />
            <path d="M 500 260 C 650 260, 800 180, 880 120" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />

            <path d="M 500 260 C 580 260, 680 270, 780 270" className="ch-svg-line" />
            <path d="M 500 260 C 580 260, 680 270, 780 270" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />

            <path d="M 500 260 C 650 260, 800 340, 870 400" className="ch-svg-line" />
            <path d="M 500 260 C 650 260, 800 340, 870 400" className={loading ? "ch-svg-line-scanning" : "ch-svg-line-active"} />
          </svg>

          {/* Left 1: Performance */}
          <div className={badgeClass(0, 'ch-badge-left-1')}>
            <div className="ch-badge-icon-box bg-amber-500/10 text-amber-500">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Performance</span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">99 / 100</span>
            </div>
          </div>

          {/* Left 2: Google Verified */}
          <div className={badgeClass(1, 'ch-badge-left-2')}>
            <div className="ch-badge-icon-box bg-orange-500/10 text-orange-600">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[8px] font-black text-orange-600 uppercase tracking-widest">Verified by</span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Lighthouse 11.0</span>
            </div>
          </div>

          {/* Left 3: Speed index */}
          <div className={badgeClass(2, 'ch-badge-left-3')}>
            <div className="ch-badge-icon-box bg-blue-500/10 text-blue-500">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Speed Index</span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">0.4s Fast</span>
            </div>
          </div>


          {/* FLOATING BADGES (RIGHT SIDE) */}
          
          {/* Right 1: SEO */}
          <div className={badgeClass(3, 'ch-badge-right-1')}>
            <div className="ch-badge-icon-box bg-blue-500/10 text-blue-500">
              <Search className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">SEO Audit</span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">100% Score</span>
            </div>
          </div>

          {/* Right 2: Secure SSL */}
          <div className={badgeClass(4, 'ch-badge-right-2')}>
            <div className="ch-badge-icon-box bg-emerald-500/10 text-emerald-500">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[8px] font-black text-emerald-500 uppercase tracking-widest">SSL Security</span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">HTTPS Secure</span>
            </div>
          </div>

          {/* Right 3: Accessibility */}
          <div className={badgeClass(5, 'ch-badge-right-3')}>
            <div className="ch-badge-icon-box bg-indigo-500/10 text-indigo-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Accessibility</span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">WCAG Compliant</span>
            </div>
          </div>

          {/* CENTRAL CARD */}
          {formElement(false)}

        </div>

        {/* MOBILE FALLBACK CONTAINER */}
        <div className="ch-hub-mobile-container">
          
          {/* Center Card */}
          {formElement(true)}

          {/* Mobile badges list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            
            <div className={mobileBadgeClass(0)}>
              <div className="ch-badge-icon-box bg-amber-500/10 text-amber-500">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Performance</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">99 / 100</span>
              </div>
            </div>

            <div className={mobileBadgeClass(1)}>
              <div className="ch-badge-icon-box bg-orange-500/10 text-orange-600">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[8px] font-black text-orange-600 uppercase tracking-widest">Verified by</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Lighthouse 11.0</span>
              </div>
            </div>

            <div className={mobileBadgeClass(2)}>
              <div className="ch-badge-icon-box bg-blue-500/10 text-blue-500">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Speed Index</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">0.4s Fast</span>
              </div>
            </div>

            <div className={mobileBadgeClass(3)}>
              <div className="ch-badge-icon-box bg-blue-500/10 text-blue-500">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">SEO Audit</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">100% Score</span>
              </div>
            </div>

            <div className={mobileBadgeClass(4)}>
              <div className="ch-badge-icon-box bg-emerald-500/10 text-emerald-500">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[8px] font-black text-emerald-500 uppercase tracking-widest">SSL Security</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">HTTPS Secure</span>
              </div>
            </div>

            <div className={mobileBadgeClass(5)}>
              <div className="ch-badge-icon-box bg-indigo-500/10 text-indigo-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Accessibility</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">WCAG Compliant</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default WebsiteGrader;
