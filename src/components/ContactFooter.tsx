import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Mail, ArrowUp, Heart, Sparkles } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

interface ContactFooterProps {
  theme?: 'classic' | 'cyber';
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ theme = 'classic' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className={`text-white pt-20 pb-12 px-6 md:px-10 relative z-20 w-full transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24 ${
        theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
      }`}
    >
      {/* Background Grid Pattern - EXACT UNIFORM MATCH */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">

        {/* Top Sticker Badge */}
        <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-black text-[11px] sm:text-xs px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider mb-6 rotate-[-2deg] shadow-lg max-w-[calc(100vw-2rem)] text-center">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="truncate sm:overflow-visible">Open for mentorship, code reviews & cool projects (or memes)</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          LET'S BUILD SOMETHING THAT DOESN'T CRASH
        </h2>
        <p className="text-white/80 font-medium text-sm md:text-lg max-w-xl mx-auto mb-10">
          Got feedback on my code, advice for an ambitious developer, or want to debate tabs vs. spaces? My inbox is always open. Let's talk tech.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16 w-full max-w-sm sm:max-w-none">
          <a
            href={portfolioConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-black text-sm md:text-base hover:bg-[#CCFF00] transition-all shadow-xl hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Profile</span>
          </a>
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-black text-sm md:text-base hover:bg-white hover:text-[#0038FF] transition-all shadow-xl hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 font-semibold gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#CCFF00] fill-[#CCFF00]" />
            <span>and plenty of coffee by {portfolioConfig.name}</span>
            <span>• 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#profile" className="hover:text-white transition-colors">Profile</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#journey" className="hover:text-white transition-colors">Journey</a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-1 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
