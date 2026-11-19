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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Top Sticker Badge */}
        <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider mb-6 rotate-[-2deg] shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span>Always Open For Mentorship & Learning</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          LET'S CONNECT & BUILD
        </h2>
        <p className="text-white/80 font-medium text-sm md:text-lg max-w-xl mx-auto mb-10">
          Whether you have feedback on my code, advice for an aspiring developer, or an interesting project to share, I'd love to hear from you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={portfolioConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-black text-sm md:text-base hover:bg-[#CCFF00] transition-all shadow-xl hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Profile</span>
          </a>
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-black text-sm md:text-base hover:bg-white hover:text-[#0038FF] transition-all shadow-xl hover:scale-105"
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
            <span>by {portfolioConfig.name}</span>
            <span>• 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#journey" className="hover:text-white transition-colors">Journey</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
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
