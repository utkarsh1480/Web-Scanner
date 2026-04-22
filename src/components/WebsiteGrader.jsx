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

      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(checkedUrl)}&category=performance&category=accessibility&category=seo&category=best-practices&key=AIzaSyAMChAvUuiA4K0DCd78I_7ZZZ-2RI9WJAg`;
      const response = await fetch(apiUrl);

      if (response.status === 400) {
        setError('Invalid URL or request. Please check your website address and try again.');
        setLoading(false);
        return;
      }
      if (response.status === 429) {
        setError('You have made too many requests. Please wait a minute and try again.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const lighthouseResult = data?.lighthouseResult;
      if (!lighthouseResult) {
        throw new Error("Lighthouse data is not available in the API response.");
      }

      const performanceScore = parseFloat((lighthouseResult.categories?.performance?.score * 100 || 0).toFixed(1));
      const accessibilityScore = parseFloat((lighthouseResult.categories?.accessibility?.score * 100 || 0).toFixed(1));
      const bestPracticesScore = parseFloat((lighthouseResult.categories?.["best-practices"]?.score * 100 || 0).toFixed(1));
      const seoScore = parseFloat((lighthouseResult.categories?.seo?.score * 100 || 0).toFixed(1));

      // Extract additional metrics
      const screenshot = lighthouseResult.audits?.["final-screenshot"]?.details?.data;
      const pageSize = lighthouseResult.audits?.["total-byte-weight"]?.displayValue;
      const pageRequests = lighthouseResult.audits?.["network-requests"]?.details?.items?.length;
      const pageSpeed = lighthouseResult.audits?.["interactive"]?.displayValue;


      const emailContent = `
        
         ${url}
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

      // console.log('Email sent successfully!');

      const resultData = {
        url,
        screenshot,
        metrics: {
          pageSize,
          pageRequests,
          pageSpeed,
        },
        scores: {
          aggregate: (performanceScore + accessibilityScore + bestPracticesScore + seoScore) / 4,
          details: [
            { label: 'Performance', score: performanceScore, maxScore: 100, color: 'red' },
            { label: 'Accessibility', score: accessibilityScore, maxScore: 100, color: 'orange' },
            { label: 'Best Practices', score: bestPracticesScore, maxScore: 100, color: 'blue' },
            { label: 'SEO', score: seoScore, maxScore: 100, color: 'green' },
          ],
        },
      }

      navigate('/lighthouse', { state: { analysisData: resultData } })
    } catch (error) {
      setError(`Failed to fetch performance data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container-custom relative py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <img
                  src="/newlogo.png"
                  alt={t.title}
                  className="h-12 w-auto"
                />
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  {t.title} <sup className="text-sm">®</sup>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                {t.subtitle}
              </p>
              <div className="card max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      ref={form}
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={t.urlPlaceholder}
                      className="input-field"
                    />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="input-field"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.privacyText}{' '}
                    <a href="#" className="text-primary hover:underline">{t.privacyPolicy}</a>.
                  </p>
                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>{t.analyzing}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>{t.getScore}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src="//static.hsappstatic.net/website-grader-ui/static-1.3755/img/website-performance-rating.jpg"
                alt={t.title}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{t.realTimeAnalysis}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.featuresSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: t.performance,
                description: t.performanceDesc
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: t.security,
                description: t.securityDesc
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: t.seo,
                description: t.seoDesc
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: t.mobile,
                description: t.mobileDesc
              }
            ].map((feature, index) => (
              <div key={index} className="card group hover:border-primary/50 transition-colors">
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <footer className="bg-secondary/50 py-12 mt-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Contact Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* GitHub */}
              <a
                href="https://github.com/utkarsh1480"
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:border-primary/50 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                <p className="text-muted-foreground">utkarsh1480 </p>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/utkarshds/"
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:border-primary/50 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-muted-foreground">Utkarsh </p>
              </a>

              {/* Email */}
              <a
                href="mailto:utkarsh1480759@gmail.com<"
                className="card hover:border-primary/50 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">utkarsh1480759@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WebsiteGrader


// 👆👆👆👆👆👆👆
