import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/15"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.65)]"
      />
    </div>
  );
};
