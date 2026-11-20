import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { Compass, Milestone } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      data-brightness="bright"
      className="bg-white text-black py-24 px-6 md:px-10 relative z-20 w-full border-t border-gray-100 overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0038FF] text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-md hover:scale-105 transition-transform cursor-default">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} aria-hidden="true" />
            <span>Learning Timeline</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            MY JOURNEY SO FAR
          </h2>
          <p className="text-neutral-700 font-semibold text-sm md:text-base max-w-lg mx-auto mt-2">
            No overnight shortcuts, no guru bootcamps — just building small things daily, breaking them, and figuring out why.
          </p>
        </motion.div>

        {/* Timeline List with Scroll-Linked Animated Progress Line */}
        <div
          ref={timelineRef}
          className="relative pl-6 md:pl-10 border-l-4 border-[#0038FF]/15 space-y-8 sm:space-y-10 ml-3 sm:ml-4 md:ml-6"
        >
          {/* Animated Scroll Progress Line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            className="absolute -left-[4px] top-0 bottom-0 w-1 bg-[#0038FF] rounded-full pointer-events-none"
          />

          {portfolioConfig.journey.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ x: 6 }}
              className="relative group"
            >
              {/* Timeline marker with scroll reveal glow */}
              <motion.div
                initial={{ scale: 0.85, backgroundColor: '#0038FF' }}
                whileInView={{ scale: 1, backgroundColor: '#0038FF' }}
                viewport={{ once: false, amount: 0.8 }}
                className="absolute -left-[38px] md:-left-[54px] top-1.5 w-6 h-6 rounded-full bg-[#0038FF] border-4 border-white shadow-[0_0_0_3px_rgba(204,255,0,0.75)] flex items-center justify-center text-[#CCFF00] group-hover:scale-125 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300 z-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#CCFF00] group-hover:bg-black"></div>
              </motion.div>

              {/* Card */}
              <div className="bg-[#F8F9FA] border-2 border-gray-200/90 rounded-[1.4rem] sm:rounded-[1.6rem] p-4 sm:p-6 shadow-sm hover:shadow-[5px_5px_0px_#0038FF] sm:hover:shadow-[8px_8px_0px_#0038FF] hover:border-black transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0038FF] group-hover:text-black transition-colors">
                    {step.period}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 bg-white px-2.5 py-0.5 rounded-full border border-gray-200 self-start sm:self-auto">
                    <Milestone className="w-3.5 h-3.5 text-[#0038FF]" aria-hidden="true" />
                    <span>Stage 0{idx + 1}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-black mb-1.5 sm:mb-2 group-hover:text-[#0038FF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-neutral-700 text-sm leading-relaxed font-medium">
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
