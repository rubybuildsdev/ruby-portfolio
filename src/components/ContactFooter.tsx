import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { Mail, ArrowUp, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
import { playSuccessSound } from '../lib/soundFx';

interface ContactFooterProps {
  theme?: 'classic' | 'cyber';
}

const CURRENT_YEAR = new Date().getFullYear();

export const ContactFooter: React.FC<ContactFooterProps> = ({ theme = 'classic' }) => {
  const [copied, setCopied] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(portfolioConfig.email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = portfolioConfig.email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      playSuccessSound();
      setCopied(true);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <footer
      id="contact"
      className={`text-white pt-20 pb-12 px-6 md:px-10 relative z-20 w-full transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24 ${
        theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#CCFF00] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000]"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Email copied! ({portfolioConfig.email})</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">

        {/* Top Sticker Badge */}
        <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-black text-[11px] sm:text-xs px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider mb-6 rotate-[-2deg] shadow-lg max-w-[calc(100vw-2rem)] text-center">
          <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate sm:overflow-visible">Open for mentorship, code reviews & cool projects (or memes)</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          LET'S BUILD SOMETHING THAT DOESN'T CRASH
        </h2>
        <p className="text-white/90 font-medium text-sm md:text-lg max-w-xl mx-auto mb-10">
          Got feedback on my code, advice for an ambitious developer, or want to debate tabs vs. spaces? My inbox is always open. Let's talk tech.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16 w-full max-w-sm sm:max-w-none">
          <a
            href={portfolioConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-black text-sm md:text-base hover:bg-[#CCFF00] transition-all shadow-xl hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Profile</span>
          </a>
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="min-h-[44px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-black text-sm md:text-base hover:bg-white hover:text-[#0038FF] transition-all shadow-xl hover:scale-105"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span>Send Email</span>
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            className="min-h-[44px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-black/35 border-2 border-white/30 text-white font-black text-sm md:text-base hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between text-xs text-white/85 font-semibold gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#CCFF00] fill-[#CCFF00]" aria-hidden="true" />
            <span>and plenty of coffee by {portfolioConfig.name}</span>
            <span>• {CURRENT_YEAR}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#profile" className="hover:text-white transition-colors py-1">Profile</a>
            <a href="#projects" className="hover:text-white transition-colors py-1">Projects</a>
            <a href="#journey" className="hover:text-white transition-colors py-1">Journey</a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center gap-1 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors ml-2 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
