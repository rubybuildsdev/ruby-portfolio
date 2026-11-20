import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

const GREETINGS = [
  'Hey there!',
  'Currently building something new',
  'Scroll down to see my work',
  'Check out my GitHub repos',
  'Thanks for stopping by!',
];

export const ProfileAvatar: React.FC = () => {
  const reduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const greetingTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [greeting, setGreeting] = useState<string | null>(null);
  const glowOpacity = useMotionValue(0);

  // Scroll-linked parallax: the avatar drifts a little slower/faster than the page
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-24, 24]
  );

  // Glow that reacts to how close the cursor is to the avatar
  useEffect(() => {
    if (
      reduceMotion ||
      window.matchMedia('(pointer: coarse)').matches ||
      typeof window === 'undefined'
    ) {
      return;
    }

    let rafId: number | null = null;

    const handleMove = (event: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = frameRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
        const maxDistance = 420;
        glowOpacity.set(Math.max(0, 1 - distance / maxDistance));
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion, glowOpacity]);

  useEffect(() => {
    return () => {
      if (greetingTimeout.current) clearTimeout(greetingTimeout.current);
    };
  }, []);

  function handleGreet() {
    const message = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(message);
    if (greetingTimeout.current) clearTimeout(greetingTimeout.current);
    greetingTimeout.current = setTimeout(() => setGreeting(null), 1800);
  }

  return (
    <div ref={sectionRef} className="relative w-full flex flex-col items-center select-none">
      <motion.div style={{ y: parallaxY }} className="relative w-full flex flex-col items-center">
        {/* Idle breathing float — subtle, constant, paused for reduced-motion users */}
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-full flex flex-col items-center"
        >
          {/* Cursor-distance reactive glow */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-[3rem] blur-2xl bg-[radial-gradient(circle,rgba(0,56,255,0.45),rgba(204,255,0,0.3)_55%,transparent_75%)]"
          />

          {/* Click-to-greet speech bubble */}
          <AnimatePresence>
            {greeting && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-3 right-2 sm:right-4 z-20 bg-white border-2 border-black rounded-2xl rounded-br-sm px-3.5 py-2 shadow-[3px_3px_0px_#0038FF] pointer-events-none"
              >
                <span className="text-xs font-black text-black whitespace-nowrap">{greeting}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Neo-Brutalist Frame Container with Lift & Shadow Expansion Hover */}
          <motion.div
            ref={frameRef}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={handleGreet}
            role="button"
            aria-label="Say hi to Ruby"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleGreet();
              }
            }}
            className="group relative w-full h-[300px] sm:h-[380px] md:h-[420px] max-w-[280px] sm:max-w-[320px] md:max-w-[340px] cursor-pointer"
          >
            {/* Layer 1: Electric Blue Offset Shadow */}
            <div
              className="absolute inset-0 bg-[#0038FF] rounded-[2rem] sm:rounded-[2.5rem] transform translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 group-hover:translate-x-3.5 group-hover:translate-y-3.5 transition-transform duration-300 pointer-events-none"
            />

            {/* Layer 2: Neon Volt Offset Shadow */}
            <div
              className="absolute inset-0 bg-[#CCFF00] rounded-[2rem] sm:rounded-[2.5rem] transform -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2 sm:-translate-y-2 group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 transition-transform duration-300 pointer-events-none"
            />

            {/* Layer 3: Main Avatar Box Frame with 3px Black Border */}
            <div className="relative w-full h-full rounded-[1.8rem] sm:rounded-[2.3rem] border-3 border-black bg-[#121624] overflow-hidden shadow-2xl z-10 flex items-center justify-center">
              {/* Profile Photo - Clean, crisp, no grid overlay, no cutout fringe */}
              <img
                src="/images/profile/avatar-optimized.jpg"
                alt="Ruby Profile Avatar"
                className="w-full h-full object-cover object-center relative z-10 group-hover:scale-102 transition-transform duration-500"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
