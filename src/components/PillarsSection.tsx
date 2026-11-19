import React from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowBlack1, ArrowBlack2 } from './SvgAccents';
import { Layout, Server, Wrench, CheckCircle2 } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  return (
    <section id="stack" className="bg-white text-black rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-6 py-16 md:px-10 md:py-24 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] mt-auto w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Scroll Fade-in */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-black text-[#CCFF00] font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm hover:scale-105 transition-transform cursor-default">
            Core Foundations
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            MY LEARNING PILLARS
          </h2>
          <p className="text-black/60 font-semibold text-sm md:text-base max-w-xl mx-auto mt-2">
            The core areas I practice and explore every day to build modern full-stack web applications.
          </p>
        </motion.div>

        {/* 3 Pillars Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Card 1: Frontend Basics */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="bg-[#F8F9FA] rounded-[2.2rem] p-7 flex flex-col items-center text-center relative border-2 border-gray-200/90 shadow-sm hover:shadow-[10px_10px_0px_#0038FF] hover:border-black transition-all duration-300 min-h-[390px] group"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#0038FF] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
              <Layout className="w-7 h-7 stroke-[2.5]" />
            </div>
            
            <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black group-hover:text-[#0038FF] transition-colors">
              FRONTEND<br/>BASICS
            </h3>
            <p className="text-xs text-black/60 font-bold mb-4">
              Building responsive, accessible, & animated web interfaces
            </p>

            {/* Tech Tags Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {portfolioConfig.pillars[0].technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white border border-gray-200 text-black text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs group-hover:border-[#0038FF]/40 hover:bg-[#0038FF] hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Pill Graphic */}
            <div className="relative w-full flex justify-center mt-auto">
              <div className="flex items-center bg-[#0038FF] rounded-2xl p-2 pr-14 text-white shadow-lg relative z-10 w-full max-w-[240px] group-hover:scale-105 transition-transform">
                <div className="w-9 h-9 bg-white/20 rounded-xl mr-3 flex items-center justify-center font-black text-xs text-[#CCFF00] flex-shrink-0">
                  UI
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold leading-tight">React + Vite</p>
                  <p className="text-[9px] text-white/70 leading-none mt-0.5">Component Driven</p>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#CCFF00] text-black font-black text-[10px] px-3 py-2 rounded-xl z-20 shadow-md border border-black/10 group-hover:rotate-6 transition-transform">
                Tailwind CSS
              </div>
            </div>

            {/* Arrow pointing to next card */}
            <div className="hidden md:block absolute -right-12 bottom-12 w-16 h-16 z-30 pointer-events-none">
              <ArrowBlack1 />
            </div>
          </motion.div>

          {/* Card 2: Backend Exploration */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="bg-[#F8F9FA] rounded-[2.2rem] p-7 flex flex-col items-center text-center relative border-2 border-gray-200/90 shadow-sm hover:shadow-[10px_10px_0px_#0038FF] hover:border-black transition-all duration-300 min-h-[390px] group"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#0038FF] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
              <Server className="w-7 h-7 stroke-[2.5]" />
            </div>

            <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black group-hover:text-[#0038FF] transition-colors">
              BACKEND<br/>EXPLORATION
            </h3>
            <p className="text-xs text-black/60 font-bold mb-4">
              Understanding servers, routing, & database persistence
            </p>

            {/* Tech Tags Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {portfolioConfig.pillars[1].technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white border border-gray-200 text-black text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs group-hover:border-[#0038FF]/40 hover:bg-[#0038FF] hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Pill Graphic */}
            <div className="relative w-full flex justify-center mt-auto">
              <div className="flex items-center bg-[#0038FF] rounded-full p-1.5 text-white shadow-lg group-hover:scale-105 transition-transform">
                <div className="bg-white/20 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-full mr-2">
                  REST APIs
                </div>
                <div className="font-bold text-xs px-3 text-[#CCFF00]">
                  Node + Express
                </div>
              </div>
              
              {/* Small floating green pill */}
              <div className="absolute -bottom-4 right-1/4 bg-[#CCFF00] text-black rounded-full px-3 py-1 text-[10px] font-black shadow-lg transform rotate-6 z-20 border border-black/10 flex items-center gap-1 group-hover:rotate-12 transition-transform">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>JSON APIs</span>
              </div>
            </div>

            {/* Arrow pointing to next card */}
            <div className="hidden md:block absolute -right-12 bottom-12 w-16 h-16 z-30 pointer-events-none">
              <ArrowBlack2 />
            </div>
          </motion.div>

          {/* Card 3: Tools & Workflow */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="bg-[#F8F9FA] rounded-[2.2rem] p-7 flex flex-col items-center text-center relative border-2 border-gray-200/90 shadow-sm hover:shadow-[10px_10px_0px_#0038FF] hover:border-black transition-all duration-300 min-h-[390px] group"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#0038FF] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
              <Wrench className="w-7 h-7 stroke-[2.5]" />
            </div>

            <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black group-hover:text-[#0038FF] transition-colors">
              TOOLS &<br/>AI FLOW
            </h3>
            <p className="text-xs text-black/60 font-bold mb-auto">
              Version control, git hygiene, & modern development flow
            </p>

            {/* Tech Tags Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {portfolioConfig.pillars[2].technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white border border-gray-200 text-black text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs group-hover:border-[#0038FF]/40 hover:bg-[#0038FF] hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Pill Graphic */}
            <div className="flex flex-col items-center bg-[#CCFF00] rounded-[2rem] px-6 py-3.5 text-black shadow-lg mt-auto relative w-full max-w-[220px] border border-black/10 group-hover:scale-105 transition-transform">
              <p className="text-[9px] font-black uppercase tracking-wider text-black/80">GIT COMMITMENT</p>
              <p className="text-lg font-black tracking-tight">Active & Continuous</p>
              
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-[#CCFF00] transform rotate-45 border-r border-b border-black/10"></div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
