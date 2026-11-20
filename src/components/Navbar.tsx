import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Settings, Volume2, VolumeOff, Zap, Palette } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

interface NavbarProps {
  theme?: 'classic' | 'cyber';
  onToggleTheme?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  isOptimized?: boolean;
  onToggleOptimize?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'classic',
  onToggleTheme,
  isMuted = false,
  onToggleMute,
  isOptimized = false,
  onToggleOptimize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isBright, setIsBright] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const checkState = () => {
      const navEl = navContainerRef.current;
      const navTop = navEl ? navEl.getBoundingClientRect().top : 16;
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 76;

      const brightSections = document.querySelectorAll(
        '#profile, #journey, [data-brightness="bright"]'
      );

      let overBright = false;
      for (let i = 0; i < brightSections.length; i++) {
        const section = brightSections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= navBottom - 10 && rect.bottom >= navTop + 10) {
          overBright = true;
          break;
        }
      }
      setIsBright((prev) => (prev !== overBright ? overBright : prev));

      const sectionIds = ['profile', 'projects', 'playground', 'journey', 'contact'];
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const winHeight = window.innerHeight || 900;

      let current = '';
      if (scrollY + winHeight >= docHeight - 80) {
        current = 'contact';
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= winHeight * 0.4 && rect.bottom >= 100) {
              current = id;
            }
          }
        }
      }
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        checkState();
        rafId = null;
      });
    };

    checkState();
    const timer = setTimeout(checkState, 80);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !settingsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen, settingsOpen]);

  const navLinks = [
    { label: 'Profile', href: '#profile', id: 'profile' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Playground', href: '#playground', id: 'playground' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const renderSettingsPanel = () => (
    <div
      className={`animate-slide-down absolute top-full right-0 mt-2.5 w-64 backdrop-blur-2xl border rounded-2xl p-3.5 shadow-2xl z-50 flex flex-col gap-2 ${
        isBright
          ? 'glass-fallback-bright bg-white/90 border-neutral-900/15 text-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.14)]'
          : theme === 'cyber'
          ? 'glass-fallback-dark bg-[#08090E]/95 border-white/20 text-white'
          : 'glass-fallback-card bg-[#00229E]/95 border-white/25 text-white'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between px-1 pb-1.5 border-b border-current/10">
        <span className="text-[11px] font-black uppercase tracking-wider opacity-80">
          Quick Settings
        </span>
      </div>

      {onToggleMute && (
        <button
          type="button"
          onClick={onToggleMute}
          aria-pressed={!isMuted}
          className={`min-h-[44px] md:min-h-0 w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            isBright ? 'hover:bg-neutral-900/5' : 'hover:bg-white/10'
          }`}
        >
          <span className="flex items-center gap-2">
            {isMuted ? (
              <VolumeOff className="w-4 h-4 opacity-60" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#CCFF00]" aria-hidden="true" />
            )}
            <span>Sound FX</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
              !isMuted
                ? 'bg-[#CCFF00] text-black'
                : isBright
                ? 'bg-neutral-200 text-neutral-700'
                : 'bg-white/15 text-white/80'
            }`}
          >
            {isMuted ? 'Off' : 'On'}
          </span>
        </button>
      )}

      {onToggleOptimize && (
        <button
          type="button"
          onClick={onToggleOptimize}
          aria-pressed={isOptimized}
          className={`min-h-[44px] md:min-h-0 w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            isBright ? 'hover:bg-neutral-900/5' : 'hover:bg-white/10'
          }`}
        >
          <span className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${isOptimized ? 'text-[#CCFF00]' : 'opacity-70'}`} aria-hidden="true" />
            <span>Lite Mode</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
              isOptimized
                ? 'bg-[#CCFF00] text-black'
                : isBright
                ? 'bg-neutral-200 text-neutral-700'
                : 'bg-white/15 text-white/80'
            }`}
          >
            {isOptimized ? 'On' : 'Off'}
          </span>
        </button>
      )}

      {onToggleTheme && (
        <button
          type="button"
          onClick={onToggleTheme}
          className={`min-h-[44px] md:min-h-0 w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            isBright ? 'hover:bg-neutral-900/5' : 'hover:bg-white/10'
          }`}
        >
          <span className="flex items-center gap-2">
            <Palette className="w-4 h-4 opacity-80" aria-hidden="true" />
            <span>Theme</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
              theme === 'cyber'
                ? 'bg-[#CCFF00] text-black'
                : isBright
                ? 'bg-neutral-900 text-white'
                : 'bg-white/20 text-white'
            }`}
          >
            {theme === 'cyber' ? 'Cyber' : 'Classic'}
          </span>
        </button>
      )}
    </div>
  );

  return (
    <header
      ref={navContainerRef}
      className="sticky top-3 md:top-4 z-40 px-3 sm:px-4 md:px-8 max-w-[1440px] mx-auto w-full transition-all duration-300 pointer-events-auto"
    >
      <nav aria-label="Primary" className="relative z-30 w-full">
        {/* Main Floating Navbar Pill */}
        <div
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 md:px-7 md:py-3.5 w-full backdrop-blur-xl rounded-full md:rounded-[2.4rem] transition-all duration-300 ${
            isBright
              ? 'glass-fallback-bright bg-white/70 border border-neutral-900/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              : theme === 'cyber'
              ? 'glass-fallback-dark bg-[#08090E]/80 border border-white/20 shadow-2xl shadow-black/40'
              : 'glass-fallback-card bg-white/20 border border-white/35 shadow-2xl shadow-black/20'
          }`}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1.5 group">
            <div
              className={`font-black tracking-tight text-xs md:text-sm px-3.5 py-1.5 rounded-2xl rounded-bl-sm relative shadow-md transition-all duration-300 group-hover:scale-105 ${
                isBright ? 'bg-neutral-900 text-white' : 'bg-white text-black'
              }`}
            >
              {portfolioConfig.name}
              <div
                className={`absolute -bottom-1.5 left-0 w-3 h-3 transition-colors duration-300 ${
                  isBright ? 'bg-neutral-900' : 'bg-white'
                }`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
            </div>
            <div
              className={`bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3.5 py-1.5 rounded-full border-[1.5px] shadow-md transition-all duration-300 group-hover:rotate-3 ${
                isBright ? 'border-neutral-900' : 'border-white'
              }`}
            >
              PORTFOLIO
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 select-none ${
                    isBright
                      ? isActive
                        ? 'bg-neutral-900 text-white shadow-sm scale-105'
                        : 'text-neutral-800 hover:text-black hover:bg-neutral-900/10'
                      : isActive
                      ? 'bg-white/30 text-[#CCFF00] border border-white/40 shadow-sm backdrop-blur-md scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5 relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-expanded={settingsOpen}
              aria-label="Open quick settings"
              title="Quick settings"
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                settingsOpen
                  ? 'bg-[#CCFF00] text-black border-[#CCFF00] rotate-45'
                  : isBright
                  ? 'border-neutral-900/20 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                  : 'border-white/35 text-white hover:bg-white hover:text-[#0038FF]'
              }`}
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href={portfolioConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm ${
                isBright
                  ? 'border-neutral-900 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 hover:border-neutral-900'
                  : 'border-white bg-transparent text-white hover:bg-white hover:text-[#0038FF]'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            </a>

            {settingsOpen && renderSettingsPanel()}
          </div>

          {/* Mobile Controls (44x44px minimum touch targets) */}
          <div className="flex md:hidden items-center gap-2 relative">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSettingsOpen((prev) => !prev);
              }}
              aria-expanded={settingsOpen}
              aria-label="Open quick settings"
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl border backdrop-blur-md transition-all ${
                settingsOpen
                  ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                  : isBright
                  ? 'border-neutral-900/20 text-neutral-900 bg-neutral-900/5 hover:bg-neutral-900/10'
                  : 'border-white/35 text-white bg-white/15 hover:bg-white/25'
              }`}
            >
              <Settings className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setSettingsOpen(false);
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl border backdrop-blur-md transition-all ${
                isBright
                  ? 'border-neutral-900/20 text-neutral-900 bg-neutral-900/5 hover:bg-neutral-900/10'
                  : 'border-white/35 text-white bg-white/15 hover:bg-white/25'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>

            {settingsOpen && renderSettingsPanel()}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`animate-slide-down absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl border rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-2 z-50 md:hidden ${
              isBright
                ? 'glass-fallback-bright bg-white/85 border-neutral-900/15 text-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)]'
                : theme === 'cyber'
                ? 'glass-fallback-dark bg-[#08090E]/85 border-white/20 text-white'
                : 'glass-fallback-card bg-[#0028B8]/85 border-white/25 text-white'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] font-bold text-sm py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                    isBright
                      ? isActive
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-900 hover:bg-neutral-900/5'
                      : isActive
                      ? 'bg-white/25 text-[#CCFF00] border border-white/30'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </a>
              );
            })}
            <a
              href={portfolioConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#CCFF00] text-black font-black text-sm hover:bg-black hover:text-white transition-colors mt-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
