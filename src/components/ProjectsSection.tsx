import React from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { ExternalLink, FolderGit2, Sparkles } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

interface ProjectsSectionProps {
  theme?: 'classic' | 'cyber';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme = 'classic' }) => {
  return (
    <section 
      id="projects" 
      className={`text-white pt-20 pb-8 md:pt-24 md:pb-10 px-6 md:px-10 relative z-20 w-full transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24 ${
        theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
      }`}
    >
      {/* Background Subtle Gradient Grid - EXACT MATCH to HERO and PLAYGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/20 pb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#CCFF00] font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Real World & Explorations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm md:text-base font-medium">
            Projects built to explore full-stack development, interactive 3D simulations, and AI-powered business tools.
          </p>
        </motion.div>

        {/* Projects Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioConfig.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[2.2rem] p-5 md:p-6 flex flex-col justify-between hover:bg-white/15 hover:border-[#CCFF00] hover:shadow-[0_20px_45px_rgba(204,255,0,0.22)] transition-all duration-300 shadow-2xl group cursor-pointer relative overflow-hidden"
            >
              <div>
                {/* Header Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 text-[#CCFF00] px-3 py-1 rounded-full border border-white/10 group-hover:border-[#CCFF00]/40 transition-colors">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="text-[10px] font-extrabold uppercase bg-[#CCFF00] text-black px-2.5 py-0.5 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Project Image Preview Cover with Hover Zoom & Shine */}
                {project.image && (
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/20 bg-black/50 relative shadow-inner group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                )}

                {/* Project Title & Tagline */}
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#CCFF00] transition-colors mb-1.5 leading-snug">
                  {project.title}
                </h3>
                {project.tagline && (
                  <p className="text-[#CCFF00]/90 text-xs font-bold mb-3">
                    {project.tagline}
                  </p>
                )}

                {/* Description */}
                <p className="text-white/80 text-xs leading-relaxed mb-5 font-medium line-clamp-3">
                  {project.description}
                </p>

                {/* Highlight banner with subtle pulse on hover */}
                {project.highlight && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 mb-5 text-[11px] font-semibold text-[#CCFF00] flex items-center gap-2 group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/5 transition-all">
                    <FolderGit2 className="w-4 h-4 flex-shrink-0" />
                    <span>Focus: {project.highlight}</span>
                  </div>
                )}
              </div>

              <div>
                {/* Tech Tags with Interactive Hover */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/40 text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links with Spring Click Physics */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-black font-black text-xs hover:bg-[#CCFF00] transition-colors shadow-md"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </motion.a>
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on GitHub Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center px-2"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={portfolioConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-[#CCFF00] text-black font-black text-xs sm:text-sm md:text-base hover:bg-white transition-all shadow-xl hover:shadow-[0_0_25px_rgba(204,255,0,0.6)] max-w-full"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="sm:hidden">Explore Repositories (@{portfolioConfig.githubUsername})</span>
            <span className="hidden sm:inline">Explore All Repositories on GitHub (@{portfolioConfig.githubUsername})</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
