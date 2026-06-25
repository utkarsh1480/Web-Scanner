import './ScoreCard.css';
// import PerformanceCard from './PerformanceCard';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import './ScoreCard.css';
import PerformanceWrapper from './PerformanceWrapper';
import FeatureList from './FeatureList';
import SEOWrapper from './SEOWrapper';
import MobileWrapper from './MobileWrapper';
import SecurityWrapper from './SecurityWrapper';
import Content from './Lastcontent';
import Lcontent from './Last2ndcontent';

// Language translations (add if not already present or import from a central file)
const translations = {
  en: {
    statusTitle: "This site is OK",
    statusDescription: "Not too shabby. Let's see how we can bump up that score a bit. See your scorecard below and take action now by creating a high-speed website with HubSpot CMS Free.",
    ctaButton: "Create a high-speed website",
    // Add other translations for SiteGrade specific text
  },
  // Add other languages as needed
};

const SiteGrade = ({ data }) => {
  const navigate = useNavigate();
  const [language] = useState('en');

  const t = translations[language] || translations.en;

  const handleHomeClick = () => {
    navigate('/');
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading site analysis...</p>
        </div>
      </div>
    );
  }

  // Extract scores helper
  const getScore = (label) => {
    return data.scores?.details?.find(d => d.label === label)?.score || 0;
  };

  const performanceData = {
    score: getScore('Performance'),
    pageSize: data.metrics?.pageSize || '0 KB',
    pageRequests: data.metrics?.pageRequests || 0,
    pageSpeed: data.metrics?.pageSpeed || '0 s',
    imageUrl: data.screenshot || "//static.hsappstatic.net/ui-images/static-2.696/optimized/performance.svg"
  };

  const seoData = {
    score: getScore('SEO'),
    features: [
      {
        title: 'Permission to Index',
        status: 'PASS',
        message: 'Granted.',
        description: 'In order for a page to appear in search results, search engines must have permission to store it in their index.'
      },
      {
        title: 'Meta Description',
        status: 'PASS',
        message: 'Look at you go!',
        description: 'Meta descriptions tell people what your page is about in search results.'
      }
    ]
  };

  const mobileData = {
    score: getScore('Best Practices'), // Using Best Practices as proxy for Mobile if not explicit, or 0
    features: [
      {
        title: 'Legible Font Size',
        description: 'Visitors may have difficulty reading small text, especially on mobile devices. We recommend at least 12px.',
        status: 'fail'
      },
      {
        title: 'Tap Targets',
        description: 'Mobile-friendly pages perform better in search results. Make sure interactive elements like buttons and links are not too small or too close together.',
        status: 'fail'
      },
      {
        title: 'Responsive',
        description: 'Responsive design gives you a bump in search rankings for searches on mobile devices.',
        status: 'fail'
      }
    ]
  };

  const securityData = {
    score: getScore('Accessibility'), // Accessibility often correlates, or we can use a separate score if we had it
    features: [
      {
        title: 'HTTPS',
        status: true,
        description: 'HTTPS protects websites from attacks and gives visitors confidence that your site is authentic and trustworthy.'
      },
      {
        title: 'Secure JavaScript Libraries',
        status: true,
        description: 'Intruders can exploit outdated JavaScript libraries. Using the latest version of each library and updating it regularly will help keep you safe.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container-custom py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">{t.statusTitle}</h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">{t.statusDescription}</p>
          <Button 
            className="btn-primary inline-flex items-center px-6 py-3 text-base md:text-lg"
            onClick={handleHomeClick}
          >
            {t.ctaButton}
            <svg 
              className="ml-2 h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Website Preview */}
        <div className="card overflow-hidden p-0 mb-12 max-w-4xl mx-auto border border-border shadow-lg rounded-lg">
          <div className="browser-header flex items-center space-x-2 p-3 bg-muted/50 border-b border-border">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 text-center text-xs text-muted-foreground font-mono truncate px-4">
              {data.url}
            </div>
          </div>
          <div className="aspect-video w-full bg-muted/20 relative">
            {data.screenshot ? (
              <img
                src={data.screenshot}
                alt="Website Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Preview Available
              </div>
            )}
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-8 md:space-y-12">
          {/* Performance Section */}
          <div className="space-y-4">
            <div className="p-4 flex justify-center">
              <img 
                src="//static.hsappstatic.net/ui-images/static-2.696/optimized/design-manager.svg" 
                alt="Design Manager" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <PerformanceWrapper 
              score={performanceData.score}
              pageSize={performanceData.pageSize}
              pageRequests={performanceData.pageRequests}
              pageSpeed={performanceData.pageSpeed}
              imageUrl={performanceData.imageUrl}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* SEO Section */}
            <div className="space-y-4 flex flex-col">
              <div className="p-4 flex justify-center">
                <img 
                  src="//static.hsappstatic.net/ui-images/static-2.696/optimized/global.svg" 
                  alt="Global" 
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <div className="flex-grow">
                <SEOWrapper 
                  score={seoData.score}
                  features={seoData.features}
                />
              </div>
            </div>

            {/* Mobile Section */}
            <div className="space-y-4 flex flex-col">
              <div className="p-4 flex justify-center">
                <img 
                  src="//static.hsappstatic.net/ui-images/static-2.696/optimized/mobile-onboarding-powering-up.svg" 
                  alt="Mobile" 
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <div className="flex-grow">
                <MobileWrapper 
                  score={mobileData.score}
                  features={mobileData.features}
                  screenshot={data.screenshot}
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <div className="p-4 flex justify-center">
              <img 
                src="//static.hsappstatic.net/ui-images/static-2.696/optimized/add-on-ssl.svg" 
                alt="SSL" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <SecurityWrapper 
              score={securityData.score}
              features={securityData.features}
            />
          </div>

        {/* Additional Content */}
        <div className="mt-8 md:mt-12 space-y-8 md:space-y-12">
          <Lcontent />
          <Content />
        </div>
      </div>
    </main>
  </div>
  );
};

export default SiteGrade;