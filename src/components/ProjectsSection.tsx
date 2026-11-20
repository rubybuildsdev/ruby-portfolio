import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { portfolioConfig, type Project } from '../data/portfolioData';
import { ExternalLink, FolderGit2, Sparkles, Eye, X } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
import { playModalOpenSound } from '../lib/soundFx';

interface ProjectsSectionProps {
  theme?: 'classic' | 'cyber';
  isOptimized?: boolean;
}

// Shared chips so the card and the Quick View modal always render the exact
// same look for the same piece of information — no drift between the two.
const CategoryBadge: React.FC<{ category: string }> = ({ category }) => (
  <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 text-[#CCFF00] px-3 py-1 rounded-full border border-white/10 group-hover:border-[#CCFF00]/40 transition-colors">
    {category}
  </span>
);

const DeployedBadge: React.FC = () => (
  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 group-hover:scale-105 transition-transform">
    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
    <span>DEPLOYED</span>
  </span>
);

const TagChip: React.FC<{ tag: string }> = ({ tag }) => (
  <span className="bg-black/45 text-white/95 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/15 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors">
    {tag}
  </span>
);

interface ProjectCardProps {
  project: Project;
  index: number;
  skipVideo: boolean;
  enable3D: boolean;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  skipVideo,
  enable3D,
  onSelect,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enable3D) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      const dx = (px - 50) / 50;
      const dy = (py - 50) / 50;
      setTilt({ rx: -dy * 8, ry: dx * 8 });
      setSpot({ x: px, y: py, active: true });
    },
    [enable3D]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setSpot((prev) => ({ ...prev, active: false }));
  }, []);

  const mediaContent =
    project.video && !skipVideo ? (
      <video
        src={project.video}
        poster={project.image}
        autoPlay
        loop
        muted
        playsInline
        aria-label={project.title}
        className="w-full h-full object-cover object-top group-hover/img:scale-108 transition-transform duration-700 ease-out"
      />
    ) : project.image ? (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top group-hover/img:scale-108 transition-transform duration-700 ease-out"
        loading="lazy"
        decoding="async"
      />
    ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={`Open details for ${project.title}`}
        className="glass-fallback-card h-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[2.2rem] p-5 md:p-6 flex flex-col justify-between hover:bg-white/15 hover:border-[#CCFF00] hover:shadow-[0_20px_45px_rgba(204,255,0,0.22)] transition-all duration-300 shadow-2xl group relative overflow-hidden cursor-pointer"
        style={
          enable3D
            ? {
                transformStyle: 'preserve-3d',
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: spot.active
                  ? 'transform 0.08s ease-out, border-color 0.3s, background-color 0.3s, box-shadow 0.3s'
                  : 'transform 0.4s ease-out, border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
              }
            : undefined
        }
      >
        {/* Cursor Spotlight Overlay (Normal Mode only) */}
        {enable3D && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2.2rem] transition-opacity duration-300"
            style={{
              opacity: spot.active ? 1 : 0,
              background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(204, 255, 0, 0.18), transparent 70%)`,
            }}
          />
        )}

        <div style={enable3D ? { transformStyle: 'preserve-3d' } : undefined}>
          {/* Header Category & Badge — Depth Layer 20px */}
          <div
            className="flex items-center justify-between mb-4"
            style={enable3D ? { transform: 'translateZ(20px)' } : undefined}
          >
            <CategoryBadge category={project.category} />
            {project.demoUrl ? (
              <DeployedBadge />
            ) : project.badge ? (
              <span className="text-[10px] font-extrabold uppercase bg-[#CCFF00] text-black px-2.5 py-0.5 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                {project.badge}
              </span>
            ) : null}
          </div>

          {/* Project Media Preview Cover — Depth Layer 35px */}
          {mediaContent && (
            <div
              className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/20 bg-black/50 relative shadow-inner group/img"
              style={enable3D ? { transform: 'translateZ(35px)' } : undefined}
            >
              {mediaContent}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="glass-fallback-dark absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md border border-white/20 text-[#CCFF00] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                <Eye className="w-3 h-3 text-[#CCFF00]" aria-hidden="true" />
                <span>Quick View</span>
              </div>
            </div>
          )}

          {/* Project Title & Tagline — Depth Layer 42px */}
          <div style={enable3D ? { transform: 'translateZ(42px)' } : undefined}>
            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#CCFF00] transition-colors mb-1.5 leading-snug">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="text-[#CCFF00] text-xs sm:text-sm font-bold mb-3">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Description */}
          <p
            className="text-white/90 text-sm leading-relaxed mb-5 font-medium line-clamp-3"
            style={enable3D ? { transform: 'translateZ(18px)' } : undefined}
          >
            {project.description}
          </p>

          {/* Highlight banner — Depth Layer 24px */}
          {project.highlight && (
            <div
              className="bg-black/25 border border-white/15 rounded-xl p-2.5 mb-5 text-xs font-semibold text-[#CCFF00] flex items-center gap-2 group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/5 transition-all"
              style={enable3D ? { transform: 'translateZ(24px)' } : undefined}
            >
              <FolderGit2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>Focus: {project.highlight}</span>
            </div>
          )}
        </div>

        <div style={enable3D ? { transformStyle: 'preserve-3d' } : undefined}>
          {/* Tech Tags — Depth Layer 22px */}
          <div
            className="flex flex-wrap gap-1.5 mb-6"
            style={enable3D ? { transform: 'translateZ(22px)' } : undefined}
          >
            {project.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>

          {/* Action Links — Depth Layer 30px */}
          <div
            className="flex items-center gap-2 pt-4 border-t border-white/15"
            style={enable3D ? { transform: 'translateZ(30px)' } : undefined}
          >
            {project.demoUrl && project.demoUrl !== '#' ? (
              <>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#CCFF00] text-black font-black text-xs sm:text-sm hover:bg-white transition-colors shadow-md"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/15 border border-white/25 text-white font-black text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              </>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="min-h-[44px] flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-black font-black text-xs sm:text-sm hover:bg-[#CCFF00] transition-colors shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              aria-label={`View details for ${project.title}`}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center px-3 rounded-xl bg-black/40 border border-white/20 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-colors cursor-pointer"
              title="Quick View Details"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme = 'classic',
  isOptimized = false,
}) => {
  const reduceMotion = Boolean(useReducedMotion());
  const skipVideo = reduceMotion || isOptimized;
  const enable3D = !reduceMotion && !isOptimized;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((project: Project) => {
    // Remember what had focus so it can be restored when the modal closes
    triggerElRef.current = document.activeElement as HTMLElement | null;
    playModalOpenSound();
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Lock body scroll, trap Tab focus inside the dialog, and handle Escape
  // while the modal is open — restoring focus to the trigger on close.
  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      modalPanelRef.current?.focus();
    }, 0);

    const getFocusable = (): HTMLElement[] => {
      const panel = modalPanelRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerElRef.current?.focus();
    };
  }, [selectedProject, closeModal]);

  return (
    <section
      id="projects"
      className={`text-white pt-20 pb-8 md:pt-24 md:pb-10 px-6 md:px-10 relative z-20 w-full transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24 ${
        theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      {/* Ambient Cyber Theme Glow (Normal Mode only) */}
      {theme === 'cyber' && !isOptimized && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/3 -left-24 w-[420px] h-[420px] rounded-full bg-[#0038FF]/18 blur-[120px]" />
          <div className="absolute bottom-10 right-0 w-[340px] h-[340px] rounded-full bg-[#CCFF00]/10 blur-[110px]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/20 pb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#CCFF00] font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
              <span>Battle-Tested & Explorations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-white/85 max-w-md text-sm md:text-base font-medium">
            Real code running in the wild. Click any card for full architecture details, or jump straight to the repo.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioConfig.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              skipVideo={skipVideo}
              enable3D={enable3D}
              onSelect={openModal}
            />
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
            className="min-h-[44px] inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-[#CCFF00] text-black font-black text-xs sm:text-sm md:text-base hover:bg-white transition-all shadow-xl hover:shadow-[0_0_25px_rgba(204,255,0,0.6)] max-w-full"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="sm:hidden">Inspect Repositories (@{portfolioConfig.githubUsername})</span>
            <span className="hidden sm:inline">Inspect All Repositories on GitHub (@{portfolioConfig.githubUsername})</span>
          </motion.a>
        </motion.div>

      </div>

      {/* Project Quick-View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              ref={modalPanelRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-fallback-dark relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-2 border-[#CCFF00] bg-[#0B1020]/95 text-white p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close project details"
                className="min-w-[44px] min-h-[44px] absolute top-4 right-4 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="pr-12 mb-4 flex flex-wrap items-center gap-2">
                <CategoryBadge category={selectedProject.category} />
                {selectedProject.demoUrl && <DeployedBadge />}
              </div>

              {/* Media Preview — same aspect ratio as the card so the image doesn't jump-crop on open */}
              {(selectedProject.video || selectedProject.image) && (
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/20 bg-black/60">
                  {selectedProject.video && !skipVideo ? (
                    <video
                      src={selectedProject.video}
                      poster={selectedProject.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-top"
                    />
                  ) : selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : null}
                </div>
              )}

              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-black text-white mb-1">
                {selectedProject.title}
              </h3>
              {selectedProject.tagline && (
                <p className="text-[#CCFF00] text-sm font-bold mb-4">
                  {selectedProject.tagline}
                </p>
              )}

              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium mb-5">
                {selectedProject.description}
              </p>

              {selectedProject.highlight && (
                <div className="bg-white/5 border border-[#CCFF00]/30 rounded-xl p-3.5 mb-5 text-sm font-semibold text-[#CCFF00] flex items-center gap-2.5">
                  <FolderGit2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>Architecture Focus: {selectedProject.highlight}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/15">
                {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#CCFF00] text-black font-black text-sm hover:bg-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Open Live Demo</span>
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-black font-black text-sm hover:bg-[#CCFF00] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
