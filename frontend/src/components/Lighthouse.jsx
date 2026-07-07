import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Shield, Search, Smartphone, BarChart2, Mail, Phone, Twitter, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ScoreCard from './scorecard';
import SiteGrade from './SiteGrade';
import AIRecommendations from './AIRecommendations';
import { useLanguage } from '../Context/LanguageContext';
import { useTheme } from '../Context/ThemeContext';

const Lighthouse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData } = location.state || {};
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-muted-foreground">{t.lighthouseNoData}</h1>
          <Button onClick={() => navigate('/')} className="btn-primary w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.lighthouseBack}
          </Button>
        </div>
      </div>
    );
  }

  const { url, scores } = analysisData;
  const { aggregate, details } = scores;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500/10';
    if (score >= 50) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  return (
    <div className="min-h-screen bg-transparent relative pb-16 text-foreground dark:text-white">
      {/* Sub-header with Go Back */}
      <div className="container-custom px-4 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="bg-white/30 dark:bg-zinc-900/30 border border-white/50 dark:border-zinc-800/30 backdrop-blur-md hover:bg-white/50 dark:hover:bg-zinc-900/50 flex items-center gap-2 text-xs font-bold h-10 px-5 rounded-full transition-all text-foreground dark:text-white shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.lighthouseBackShort}</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="container-custom py-6 sm:py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel (7 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* URL Display */}
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white">{t.lighthouseAnalysis}</h2>
              <p className="text-sm font-semibold text-foreground/60 dark:text-white/60 break-all">{url}</p>
            </div>

            {/* ScoreCard Component */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <ScoreCard url={url} scores={scores} />
            </div>

            {/* Contact Links */}
            <Card className="bg-white/30 dark:bg-zinc-950/30 border border-white/50 dark:border-zinc-800/30 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-base font-bold text-center text-foreground dark:text-white">{t.lighthouseContactMe}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-0">
                <div className="flex justify-center space-x-6">
                  <a
                    href="mailto:utkarsh1480759@gmail.com"
                    className="text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors p-3 bg-white/20 dark:bg-black/20 rounded-2xl"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="tel:+919628300323"
                    className="text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors p-3 bg-white/20 dark:bg-black/20 rounded-2xl"
                    aria-label="Phone"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/UTKARSH68694578"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors p-3 bg-white/20 dark:bg-black/20 rounded-2xl"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel (5 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Aggregate Score Card */}
            <Card className="bg-white/30 dark:bg-zinc-950/30 border border-white/50 dark:border-zinc-800/30 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl">
              <CardHeader className="p-0 pb-5">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground dark:text-white">
                  <BarChart2 className="w-5 h-5 text-foreground dark:text-white" />
                  {t.lighthouseOverallScore}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex justify-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center select-none">
                  {/* Concentric rings style */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-zinc-200/50 dark:text-zinc-800/40"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={`${getScoreColor(aggregate)} transition-all duration-1000 ease-out`}
                      strokeWidth="6"
                      strokeDasharray={`${aggregate * 2.63} 263.8`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-foreground dark:text-white">
                      {aggregate.toFixed(0)}
                    </span>
                    <span className="text-[10px] font-bold text-foreground/50 dark:text-white/50 uppercase tracking-widest mt-1">
                      Grade
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scores list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map((item, index) => (
                <div key={index} className="bg-white/30 dark:bg-zinc-950/30 border border-white/50 dark:border-zinc-800/30 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-md hover:scale-[1.02] transition-transform duration-300">
                  <div className="p-0 pb-3 flex flex-row items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/60">
                      {item.label === 'Performance' && <Zap className="w-4 h-4 text-amber-500" />}
                      {item.label === 'Accessibility' && <Shield className="w-4 h-4 text-emerald-500" />}
                      {item.label === 'SEO' && <Search className="w-4 h-4 text-blue-500" />}
                      {item.label === 'Best Practices' && <Smartphone className="w-4 h-4 text-indigo-500" />}
                    </div>
                    <h3 className="text-sm font-bold text-foreground dark:text-white mb-0" style={{ marginBottom: 0 }}>
                      {item.label}
                    </h3>
                  </div>
                  <div className="p-0">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className={`text-2xl font-black ${getScoreColor(item.score)}`}>
                          {item.score.toFixed(0)}
                        </span>
                        <span className="text-xs font-semibold text-foreground/50 dark:text-white/50">/ {item.maxScore}</span>
                      </div>
                      <Progress
                        value={item.score}
                        className={`h-1.5 rounded-full ${getScoreBgColor(item.score)}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Report Section */}
        <div className="mt-12 space-y-12">
          {analysisData.recommendations && analysisData.recommendations.length > 0 && (
            <div>
              <AIRecommendations recommendations={analysisData.recommendations} />
            </div>
          )}
          <SiteGrade data={analysisData} />
        </div>
      </main>

    </div>
  );
};

export default Lighthouse;
