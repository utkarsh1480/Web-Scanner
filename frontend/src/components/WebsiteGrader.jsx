import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon, CheckIcon, ArrowRight, Shield, Zap, Search, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React from 'react';

import Contact from './Contact'

import { useLanguage } from '../Context/LanguageContext'

const WebsiteGrader = () => {
  useEffect(() => {
    emailjs.init('-243iobnGw0PSzPnp');
  }, []);

  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useLanguage()

  const navigate = useNavigate()
  const form = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault()





    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Validate and auto-correct URL input
      let checkedUrl = url.trim();
      if (!/^https?:\/\//i.test(checkedUrl)) {
        checkedUrl = 'https://' + checkedUrl;
      }
      // Check for valid URL format
      try {
        new URL(checkedUrl);
      } catch (e) {
        setError('Please enter a valid and complete URL (e.g., https://example.com)');
        setLoading(false);
        return;
      }

      // Call backend API instead of calling PageSpeed directly
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

      // Send email with the results using EmailJS
      await emailjs.send(
        'service_sd4ada7', // Replace with your EmailJS service ID
        'template_xcy5z5u', // Replace with your EmailJS template ID
        {
          from_name: 'Web Scanner',
          to_email: email.trim(), // Use the email input by the user
          message: emailContent, // Send the generated email content
        },
        '-243iobnGw0PSzPnp' // Replace with your EmailJS public key
      );

      navigate('/lighthouse', { state: { analysisData: data } })
    } catch (error) {
      setError(`Failed to fetch performance data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent relative pb-20 text-white">
      
      {/* Hero Section */}
      <section className="container-custom px-4 pt-12 pb-20 md:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Live Speed Ticker Banner */}
            <div className="inline-flex items-center gap-6 px-5 py-2.5 rounded-full bg-black/45 border border-white/15 backdrop-blur-md text-white text-xs font-semibold animate-in fade-in duration-500 shadow-lg">
              <span className="flex items-center gap-2">
                <span className="opacity-60 font-medium">Google</span>
                <span className="text-emerald-400 font-bold">98</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="flex items-center gap-2">
                <span className="opacity-60 font-medium">Github</span>
                <span className="text-emerald-400 font-bold">95</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="flex items-center gap-2">
                <span className="opacity-60 font-medium">Vercel</span>
                <span className="text-emerald-400 font-bold">92</span>
              </span>
            </div>

            {/* Title & Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-[4.75rem] font-extrabold tracking-wider leading-none text-white uppercase font-sans">
                ANALYZE SMARTER,
                <br />
                GROW FASTER
              </h1>
              <h2 className="text-2xl sm:text-3xl font-serif text-white/95 font-medium italic">
                Diversify your metrics
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed font-normal">
              Audit globally with 100% precision on PageSpeed performance, code coverage, and real-time improvements in one place.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("scanner-glass-box");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-zinc-100 text-zinc-950 font-bold px-8 h-12 rounded-full shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center"
              >
                Start scanning
              </button>
              <Link
                to="/github/dashboard"
                className="border border-white/20 hover:bg-white/10 text-white font-bold px-8 h-12 rounded-full transition-all text-xs uppercase tracking-wider flex items-center justify-center"
              >
                Review repositories
              </Link>
            </div>

            {/* Glass Scanner Form Panel */}
            <div id="scanner-glass-box" className="bg-black/35 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl space-y-4 max-w-md scroll-mt-24">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Input
                    ref={form}
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Your Website URL"
                    className="w-full h-12 bg-white/10 border-white/15 text-white placeholder-white/40 rounded-full px-5 text-base focus-visible:ring-white/45"
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your E-mail"
                    className="w-full h-12 bg-white/10 border-white/15 text-white placeholder-white/40 rounded-full px-5 text-base focus-visible:ring-white/45"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-white text-zinc-950 font-bold rounded-full shadow-lg hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Get Audit Score</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Premium Glowing Grader Structure Rendering */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-12 select-none">
            
            {/* Ambient Background Warm Glows */}
            <div className="absolute w-80 h-80 rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl pointer-events-none" />
            
            {/* The Futuristic Terminal Model */}
            <div className="relative animate-float transition-all duration-500 hover:scale-105">
              
              {/* Grader Terminal Glass Structure */}
              <div className="w-80 sm:w-96 h-[460px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                
                {/* Horizontal light beam reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                
                {/* Top Section: Glowing status terminal */}
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_10px_rgb(251,146,60)]" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60">Web Scanner Terminal</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 font-mono">SYS.OK_</span>
                </div>

                {/* Middle: Architectural Glowing Glass Panels representing scores */}
                <div className="my-6 space-y-4 flex-grow flex flex-col justify-center">
                  
                  {/* Performance panel */}
                  <div className="bg-black/55 border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
                    <div className="space-y-1">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/50">Performance</span>
                      <span className="block text-xl font-extrabold text-white">98 / 100</span>
                    </div>
                    {/* Tiny glowing server light */}
                    <div className="w-8 h-8 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(251,146,60)]" />
                    </div>
                  </div>

                  {/* SEO panel */}
                  <div className="bg-black/55 border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/50">SEO Index</span>
                      <span className="block text-xl font-extrabold text-white">100 / 100</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]" />
                    </div>
                  </div>

                  {/* Code Health panel */}
                  <div className="bg-black/55 border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/50">Code Coverage</span>
                      <span className="block text-xl font-extrabold text-white">94%</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgb(96,165,250)]" />
                    </div>
                  </div>

                </div>

                {/* Bottom Status bar */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-white/60">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest font-black opacity-60">Status index</span>
                    <span className="block text-xs font-extrabold text-white">Autonomous</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] uppercase tracking-widest font-black opacity-60">Verified BY</span>
                    <span className="block text-xs font-bold text-white">Google Lighthouse</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Horizontal Stats Row Banner */}
      <section className="border-t border-b border-white/10 bg-black/20 backdrop-blur-sm py-10 my-12">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
            {[
              { num: "98+", title: "Average Score" },
              { num: "1:1", title: "Real-time Analysis" },
              { num: "04", title: "Audit Categories" },
              { num: "0%", title: "Scan Cost" },
              { num: "0.03ms", title: "Execution Speed" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1 border-l border-white/10 pl-6 first:border-l-0 first:pl-0">
                <span className="block text-3xl font-extrabold tracking-tight text-white">{stat.num}</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">{stat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-black/10 py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-white">
              {t.featuresTitle}
            </h2>
            <p className="text-base text-white/60">
              {t.featuresSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-5 h-5 text-white" />,
                title: t.performance,
                description: t.performanceDesc
              },
              {
                icon: <Shield className="w-5 h-5 text-white" />,
                title: t.security,
                description: t.securityDesc
              },
              {
                icon: <Search className="w-5 h-5 text-white" />,
                title: t.seo,
                description: t.seoDesc
              },
              {
                icon: <Smartphone className="w-5 h-5 text-white" />,
                title: t.mobile,
                description: t.mobileDesc
              }
            ].map((feature, index) => (
              <div key={index} className="bg-black/35 border border-white/15 p-8 rounded-[2.5rem] flex flex-col items-start gap-4 shadow-lg backdrop-blur-sm">
                <div className="p-3 bg-white/10 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-20 mt-12 bg-black/45 border-t border-white/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-extrabold text-center mb-8 uppercase tracking-widest text-white/60">Contact Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* GitHub */}
              <a
                href="https://github.com/utkarsh1480"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/35 border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-start gap-4 hover:border-white/30 transition-colors shadow-lg"
              >
                <div className="p-3 bg-white/10 rounded-2xl">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1 text-white">GitHub</h3>
                  <p className="text-xs text-white/60 font-semibold">utkarsh1480</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/utkarshds/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/35 border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-start gap-4 hover:border-white/30 transition-colors shadow-lg"
              >
                <div className="p-3 bg-white/10 rounded-2xl">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v-11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1 text-white">LinkedIn</h3>
                  <p className="text-xs text-white/60 font-semibold">Utkarsh</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:utkarsh1480759@gmail.com"
                className="bg-black/35 border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-start gap-4 hover:border-white/30 transition-colors shadow-lg"
              >
                <div className="p-3 bg-white/10 rounded-2xl">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1 text-white">Email</h3>
                  <p className="text-xs text-white/60 font-semibold">utkarsh1480759@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WebsiteGrader;
