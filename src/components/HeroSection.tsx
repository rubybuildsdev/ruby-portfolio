import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowGreenLeft, ArrowGreenRight, CircularBadge } from './SvgAccents';
import { GithubIcon, ReactIcon, NodeJsIcon } from './Icons';
import { Typewriter } from './Typewriter';

// Component for typewriter-style heading reveal
const TypingHeading: React.FC<{
  text: string;
  delayMs?: number;
  speedMs?: number;
  className?: string;
  textColorClass?: string;
}> = ({ text, delayMs = 0, speedMs = 110, className = '', textColorClass = 'text-white' }) => {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      let current = 0;
      interval = setInterval(() => {
        current += 1;
        setDisplayedLength(current);
        if (current >= text.length) {
          clearInterval(interval);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delayMs, speedMs]);

  const isTyping = displayedLength < text.length;

  return (
    <div className="inline-flex items-baseline">
      <h1 className={`${className} ${textColorClass} hero-heading-shadow`}>
        {text.slice(0, displayedLength)}
      </h1>
      {isTyping && (
        <span
          className="text-[#CCFF00] font-black text-[clamp(2.5rem,8vw,110px)] leading-none ml-1 animate-pulse hero-heading-shadow"
        >
          _
        </span>
      )}
    </div>
  );
};

// Hook for 3D tilt on hover
function useTilt3D(maxDeg: number = 12) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.4s ease-out',
  });
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotateX = -dy * maxDeg;
    const rotateY = dx * maxDeg;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    });
    // Sheen moves opposite to mouse
    setSheenPos({ x: 50 - dx * 40, y: 50 - dy * 40 });
  }, [maxDeg]);

  const onMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.4s ease-out',
    });
    setSheenPos({ x: 50, y: 50 });
  }, []);

  return { tiltStyle, sheenPos, onMouseMove, onMouseLeave };
}

const dragTransitionConfig = { bounceStiffness: 450, bounceDamping: 22 };

export const HeroSection: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const isDraggingCard2Ref = useRef(false);
  const dragResetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onFirstDrag = useCallback(() => {
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (dragResetTimerRef.current) clearTimeout(dragResetTimerRef.current);
    };
  }, []);

  // Tilt hooks for the two glass cards
  const card1Tilt = useTilt3D(12);
  const card2Tilt = useTilt3D(12);

  return (
    <section className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-32 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">

      {/* Subtitle / Status Pill with Live Looping Typewriter */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md border border-white/30 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 md:mb-12 text-white text-xs md:text-sm font-semibold shadow-xl max-w-[calc(100vw-2rem)]"
      >
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#CCFF00] animate-ping shrink-0"></span>
        <Typewriter
          phrases={[
            "Aspiring Full-Stack Web Developer",
            "Interactive 3D WebGL in Three.js",
            "Building with React & Node.js",
            "Exploring AI & Applied Automations",
          ]}
          typingSpeed={75}
          deletingSpeed={40}
          delayBetween={2200}
          className="text-white font-medium min-w-[170px] sm:min-w-[260px] truncate sm:overflow-visible"
          cursorClassName="text-[#CCFF00]"
        />
        <span className="hidden sm:inline text-white/40">•</span>
        <span className="hidden sm:inline text-[#CCFF00] font-bold text-xs uppercase tracking-wider">
          Always Curious
        </span>
      </motion.div>

      {/* Massive Typography & Elements Container */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-4 md:mt-8 mb-12 md:mb-16">

        {/* Text Stack with Typing Animation */}
        <div className="w-full flex flex-col items-center relative z-10 space-y-1 md:space-y-3">

          {/* CODE (Types in first) */}
          <motion.div
            drag
            dragSnapToOrigin={true}
            dragElastic={0.25}
            dragTransition={dragTransitionConfig}
            whileHover={{ scale: 1.03 }}
            whileDrag={{
              scale: 1.08,
              rotate: 3,
              zIndex: 50,
              filter: 'drop-shadow(0 12px 30px rgba(204,255,0,0.4))',
              cursor: 'grabbing',
            }}
            onDragStart={onFirstDrag}
            className="w-full flex justify-start pl-[4%] sm:pl-[8%] md:pl-[22%] relative z-30 cursor-grab"
            style={{
              touchAction: 'none',
            }}
          >
            <TypingHeading
              text={portfolioConfig.hero.heading1}
              delayMs={150}
              speedMs={120}
              textColorClass="text-[#CCFF00]"
              className="text-[clamp(3.2rem,11vw,165px)] font-black leading-[0.85] tracking-tighter m-0 p-0 uppercase select-none transition-transform hover:scale-[1.02]"
            />
          </motion.div>

          {/* LEARN (Types in second) */}
          <motion.div
            drag
            dragSnapToOrigin={true}
            dragElastic={0.25}
            dragTransition={dragTransitionConfig}
            whileHover={{ scale: 1.03 }}
            whileDrag={{
              scale: 1.08,
              rotate: 3,
              zIndex: 50,
              filter: 'drop-shadow(0 12px 30px rgba(204,255,0,0.4))',
              cursor: 'grabbing',
            }}
            onDragStart={onFirstDrag}
            className="w-full flex justify-center relative z-20 cursor-grab"
            style={{
              touchAction: 'none',
            }}
          >
            <TypingHeading
              text={portfolioConfig.hero.heading2}
              delayMs={700}
              speedMs={110}
              textColorClass="text-white"
              className="text-[clamp(3.8rem,14vw,220px)] font-black leading-[0.85] tracking-tighter m-0 p-0 uppercase select-none transition-transform hover:scale-[1.02]"
            />
          </motion.div>

          {/* REPEAT (Types in third) */}
          <motion.div
            drag
            dragSnapToOrigin={true}
            dragElastic={0.25}
            dragTransition={dragTransitionConfig}
            whileHover={{ scale: 1.03 }}
            whileDrag={{
              scale: 1.08,
              rotate: 3,
              zIndex: 50,
              filter: 'drop-shadow(0 12px 30px rgba(204,255,0,0.4))',
              cursor: 'grabbing',
            }}
            onDragStart={onFirstDrag}
            className="w-full flex justify-start pl-[8%] sm:pl-[14%] md:pl-[28%] relative z-10 cursor-grab"
            style={{
              touchAction: 'none',
            }}
          >
            <TypingHeading
              text={portfolioConfig.hero.heading3}
              delayMs={1350}
              speedMs={100}
              textColorClass="text-white"
              className="text-[clamp(3.2rem,11vw,165px)] font-black leading-[0.85] tracking-tighter m-0 p-0 uppercase select-none transition-transform hover:scale-[1.02]"
            />
          </motion.div>

        </div>

        {/* Interaction Hint Badge */}
        <motion.p
          initial={{ opacity: 0.7 }}
          animate={{ opacity: hasInteracted ? 0 : 0.7 }}
          className="text-white/40 text-xs font-medium mt-6 tracking-wide"
        >
          Drag and fling the words to test the physics
        </motion.p>

        {/* Absolute Overlays (Cards, Arrows, Badge) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">

          {/* Floating Glass Card 1 (Bottom Left): Liquid Glass with React & Node.js */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-4%] sm:bottom-[1%] md:bottom-[4%] left-[-2%] sm:left-[4%] md:left-[16%] z-30 pointer-events-auto scale-80 sm:scale-90 md:scale-100 origin-bottom-left"
          >
            <motion.div
              drag
              dragSnapToOrigin={true}
              dragElastic={0.25}
              dragTransition={dragTransitionConfig}
              whileHover={{ scale: 1.05 }}
              whileDrag={{
                scale: 1.08,
                rotate: 3,
                zIndex: 50,
                filter: 'drop-shadow(0 12px 30px rgba(204,255,0,0.4))',
                cursor: 'grabbing',
              }}
              onDragStart={onFirstDrag}
              onMouseMove={card1Tilt.onMouseMove}
              onMouseLeave={card1Tilt.onMouseLeave}
              className="cursor-grab"
              style={{ touchAction: 'none' }}
            >
              <div
                className="w-40 sm:w-48 md:w-56 aspect-[3/3.6] bg-white/20 backdrop-blur-xl border border-white/40 rounded-[1.6rem] sm:rounded-[2rem] p-4 sm:p-5 flex flex-col items-center justify-center rotate-[-8deg] sm:rotate-[-10deg] shadow-2xl hover:rotate-0 hover:bg-white/30 transition-all duration-500 group hover:shadow-[0_20px_40px_rgba(204,255,0,0.25)] relative overflow-hidden"
                style={{
                  ...card1Tilt.tiltStyle,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Specular sheen overlay */}
                <div
                  className="absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${card1Tilt.sheenPos.x}% ${card1Tilt.sheenPos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                  }}
                />
                {/* React & Node.js Icons Container */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black/85 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-inner border-2 sm:border-[3px] border-white/50 overflow-hidden gap-1 sm:gap-1.5 p-1.5 sm:p-2 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-[#61DAFB] group-hover:rotate-45 transition-transform duration-500">
                    <ReactIcon className="w-full h-full" />
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-[#5FA04E] group-hover:-rotate-45 transition-transform duration-500">
                    <NodeJsIcon className="w-full h-full" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-white text-black text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full mb-1 shadow-sm group-hover:bg-[#CCFF00] transition-colors">
                    {portfolioConfig.hero.card1.tag}
                  </div>
                  <p className="font-black text-xs sm:text-sm md:text-base text-black leading-tight drop-shadow-xs">
                    {portfolioConfig.hero.card1.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-black/80 font-bold mt-0.5 sm:mt-1">
                    {portfolioConfig.hero.card1.points}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Glass Card 2 (Top Right): Liquid Glass with GitHub Octocat & Visible Handle */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[-3%] sm:top-[2%] md:top-[8%] right-[-2%] sm:right-[4%] md:right-[18%] z-30 pointer-events-auto scale-80 sm:scale-90 md:scale-100 origin-top-right"
          >
            <motion.div
              drag
              dragSnapToOrigin={true}
              dragElastic={0.25}
              dragTransition={dragTransitionConfig}
              whileHover={{ scale: 1.05 }}
              whileDrag={{
                scale: 1.08,
                rotate: 3,
                zIndex: 50,
                filter: 'drop-shadow(0 12px 30px rgba(204,255,0,0.4))',
                cursor: 'grabbing',
              }}
              onDragStart={() => {
                if (dragResetTimerRef.current) clearTimeout(dragResetTimerRef.current);
                isDraggingCard2Ref.current = true;
                onFirstDrag();
              }}
              onDragEnd={() => {
                dragResetTimerRef.current = setTimeout(() => {
                  isDraggingCard2Ref.current = false;
                }, 50);
              }}
              onMouseMove={card2Tilt.onMouseMove}
              onMouseLeave={card2Tilt.onMouseLeave}
              className="cursor-grab"
              style={{ touchAction: 'none' }}
            >
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClick={(e) => {
                  if (isDraggingCard2Ref.current) {
                    e.preventDefault();
                  }
                }}
                className="w-40 sm:w-48 md:w-56 aspect-[3/3.6] bg-white/20 backdrop-blur-xl border border-white/40 rounded-[1.6rem] sm:rounded-[2rem] p-4 sm:p-5 flex flex-col items-center justify-center rotate-[8deg] sm:rotate-[10deg] shadow-2xl hover:rotate-0 hover:bg-white/30 transition-all duration-500 group hover:shadow-[0_20px_40px_rgba(204,255,0,0.25)] relative overflow-hidden"
                style={{
                  ...card2Tilt.tiltStyle,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Specular sheen overlay */}
                <div
                  className="absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${card2Tilt.sheenPos.x}% ${card2Tilt.sheenPos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                  }}
                />
                {/* Official GitHub Icon in Circular Avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-inner border-2 sm:border-[3px] border-white/50 overflow-hidden text-white group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
                  <GithubIcon className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 transition-colors" />
                </div>

                <div className="text-center w-full">
                  <div className="inline-block bg-black text-[#CCFF00] text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full mb-1 shadow-sm group-hover:bg-white group-hover:text-black transition-colors">
                    GITHUB
                  </div>

                  <p className="font-black text-xs sm:text-sm md:text-base text-black group-hover:text-[#0038FF] transition-colors leading-tight drop-shadow-xs">
                    @{portfolioConfig.hero.card2.handle}
                  </p>

                  <p className="text-[9px] sm:text-[10px] md:text-xs text-black/80 font-bold mt-0.5 sm:mt-1">
                    {portfolioConfig.hero.card2.status}
                  </p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Decorative Arrow Left */}
          <div className="hidden sm:block absolute bottom-[0%] left-[-2%] md:left-[6%] w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 z-20 pointer-events-none">
            <ArrowGreenLeft />
          </div>

          {/* Decorative Arrow Right */}
          <div className="hidden sm:block absolute top-[0%] right-[-2%] md:right-[6%] w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 z-20 pointer-events-none">
            <ArrowGreenRight />
          </div>

          {/* Circular Spinning Badge */}
          <div className="absolute bottom-[-16%] sm:bottom-[-14%] right-[0%] sm:right-[2%] md:right-[12%] z-40 pointer-events-auto">
            <CircularBadge text={portfolioConfig.hero.badgeText} />
          </div>
        </div>
      </div>
    </section>
  );
};
