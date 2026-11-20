import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

interface NavbarProps {
  theme?: 'classic' | 'cyber';
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'classic' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBright, setIsBright] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const checkState = () => {
      const navEl = navContainerRef.current;
      const navTop = navEl ? navEl.getBoundingClientRect().top : 16;
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 76;

      // 1. Detect Bright Section Overlap (#profile, #journey, or data-brightness="bright")
      const brightSections = document.querySelectorAll(
        '#profile, #journey, [data-brightness="bright"]'
      );

      let overBright = false;
      for (let i = 0; i < brightSections.length; i++) {
        const section = brightSections[i];
        const rect = section.getBoundingClientRect();
        // Trigger bright theme proactively when section overlaps navbar vertical bounds
        if (rect.top <= navBottom - 10 && rect.bottom >= navTop + 10) {
          overBright = true;
          break;
        }
      }
      setIsBright((prev) => (prev !== overBright ? overBright : prev));

      // 2. Active Section Spy for Navigation Hierarchy
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
            // Section considered active if its upper part has reached viewing zone
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

    // Initial check after mount & paint
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

  // Close mobile menu on Escape key or outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Profile', href: '#profile', id: 'profile' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Playground', href: '#playground', id: 'playground' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      ref={navContainerRef}
      className="sticky top-3 md:top-4 z-40 px-3 sm:px-4 md:px-8 max-w-[1440px] mx-auto w-full transition-all duration-300 pointer-events-auto"
    >
      <nav className="relative z-30 w-full">
        {/* Main Floating Navbar Pill */}
        <div
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 md:px-7 md:py-3.5 w-full backdrop-blur-xl rounded-full md:rounded-[2.4rem] transition-all duration-300 ${
            isBright
              ? 'bg-white/70 border border-neutral-900/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              : theme === 'cyber'
              ? 'bg-[#08090E]/80 border border-white/20 shadow-2xl shadow-black/40'
              : 'bg-white/20 border border-white/35 shadow-2xl shadow-black/20'
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

          {/* Desktop Navigation Links with Clear Typographic Hierarchy & Active State */}
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
                      : 'text-white/85 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Action Button: GitHub Profile */}
          <div className="hidden md:flex items-center gap-3">
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
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Mobile Menu Button with Frosted Glass Styling */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-xl border backdrop-blur-md transition-all ${
              isBright
                ? 'border-neutral-900/20 text-neutral-900 bg-neutral-900/5 hover:bg-neutral-900/10'
                : 'border-white/35 text-white bg-white/15 hover:bg-white/25'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`animate-slide-down absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl border rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-2 z-50 md:hidden ${
              isBright
                ? 'bg-white/85 border-neutral-900/15 text-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)]'
                : theme === 'cyber'
                ? 'bg-[#08090E]/85 border-white/20 text-white'
                : 'bg-[#0028B8]/85 border-white/25 text-white'
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
                  className={`font-bold text-sm py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#CCFF00] text-black font-black text-sm hover:bg-black hover:text-white transition-colors mt-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
