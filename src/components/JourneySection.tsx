import React from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { Compass, Milestone } from 'lucide-react';

export const JourneySection: React.FC = () => {
  return (
    <section 
      id="journey" 
      data-brightness="bright"
      className="bg-white text-black py-24 px-6 md:px-10 relative z-20 w-full border-t border-gray-100 overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Scroll Fade-in */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0038FF] text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-md hover:scale-105 transition-transform cursor-default">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Learning Timeline</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            MY JOURNEY SO FAR
          </h2>
          <p className="text-black/60 font-semibold text-sm md:text-base max-w-lg mx-auto mt-2">
            No overnight shortcuts — just building small things daily, breaking them, and learning how they truly work.
          </p>
        </motion.div>

        {/* Timeline List with Staggered Scroll Entrance */}
        <div className="relative pl-6 md:pl-10 border-l-4 border-[#0038FF]/20 space-y-8 sm:space-y-10 ml-3 sm:ml-4 md:ml-6">
          {portfolioConfig.journey.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ x: 6 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[38px] md:-left-[54px] top-1.5 w-6 h-6 rounded-full bg-[#0038FF] border-4 border-white shadow-md flex items-center justify-center text-[#CCFF00] group-hover:scale-125 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-[#CCFF00] group-hover:bg-black"></div>
              </div>

              {/* Card */}
              <div className="bg-[#F8F9FA] border-2 border-gray-200/90 rounded-[1.4rem] sm:rounded-[1.6rem] p-4 sm:p-6 shadow-sm hover:shadow-[5px_5px_0px_#0038FF] sm:hover:shadow-[8px_8px_0px_#0038FF] hover:border-black transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0038FF] group-hover:text-black transition-colors">
                    {step.period}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200 self-start sm:self-auto">
                    <Milestone className="w-3.5 h-3.5 text-[#0038FF]" />
                    <span>Stage 0{idx + 1}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-black mb-1.5 sm:mb-2 group-hover:text-[#0038FF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-black/70 text-xs md:text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
