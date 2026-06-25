import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
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
import { useTheme } from "./Context/ThemeContext";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
                Web Scanner
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">{t.navHome}</Link>
              <Link to="/lighthouse" className="nav-link">{t.navLighthouse}</Link>
              <Link to="/github/dashboard" className="nav-link text-primary font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Code Scan
              </Link>
              <Link to="/cms" className="nav-link">{t.navServices}</Link>
              <Link to="/contact" className="nav-link">{t.navContact}</Link>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px] bg-card/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en"><div className="flex items-center gap-2"><span>🇺🇸</span><span>English</span></div></SelectItem>
                  <SelectItem value="de"><div className="flex items-center gap-2"><span>🇩🇪</span><span>Deutsch</span></div></SelectItem>
                  <SelectItem value="es"><div className="flex items-center gap-2"><span>🇪🇸</span><span>Español</span></div></SelectItem>
                  <SelectItem value="fr"><div className="flex items-center gap-2"><span>🇫🇷</span><span>Français</span></div></SelectItem>
                  <SelectItem value="ja"><div className="flex items-center gap-2"><span>🇯🇵</span><span>日本語</span></div></SelectItem>
                  <SelectItem value="pt"><div className="flex items-center gap-2"><span>🇵🇹</span><span>Português</span></div></SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="btn-secondary p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 animate-in slide-in-from-top duration-300">
              <Link to="/" className="nav-link block py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.navHome}</Link>
              <Link to="/lighthouse" className="nav-link block py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.navLighthouse}</Link>
              <Link to="/github/dashboard" className="nav-link text-primary font-medium block py-2 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Code Scan
              </Link>
              <Link to="/cms" className="nav-link block py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.navServices}</Link>
              <Link to="/contact" className="nav-link block py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.navContact}</Link>
              <div className="py-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full bg-card/80 backdrop-blur-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en"><div className="flex items-center gap-2"><span>🇺🇸</span><span>English</span></div></SelectItem>
                    <SelectItem value="de"><div className="flex items-center gap-2"><span>🇩🇪</span><span>Deutsch</span></div></SelectItem>
                    <SelectItem value="es"><div className="flex items-center gap-2"><span>🇪🇸</span><span>Español</span></div></SelectItem>
                    <SelectItem value="fr"><div className="flex items-center gap-2"><span>🇫🇷</span><span>Français</span></div></SelectItem>
                    <SelectItem value="ja"><div className="flex items-center gap-2"><span>🇯🇵</span><span>日本語</span></div></SelectItem>
                    <SelectItem value="pt"><div className="flex items-center gap-2"><span>🇵🇹</span><span>Português</span></div></SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button onClick={toggleTheme} className="w-full py-2 flex items-center gap-2 nav-link">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<WebsiteGrader />} />
          <Route path="/lighthouse" element={<Lighthouse />} />
          <Route path="/github/dashboard" element={<GitHubScan />} />
          <Route path="/cms" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Web Scanner</h3>
              <p className="text-muted-foreground">{t.footerAbout}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t.footerQuickLinks}</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="nav-link">{t.navHome}</Link></li>
                <li><Link to="/lighthouse" className="nav-link">{t.navLighthouse}</Link></li>
                <li><Link to="/cms" className="nav-link">{t.navServices}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t.footerContactTitle}</h3>
              <p className="text-muted-foreground">{t.footerContactText}</p>
              <Link to="/contact" className="btn-primary inline-flex items-center">
                {t.footerContactBtn}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;