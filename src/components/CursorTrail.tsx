import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface Point {
  x: number;
  y: number;
}

export const CursorTrail: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for leading cursor
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only run on desktop with pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      lastX = e.clientX;
      lastY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setPoints((prev) => [
            { x: lastX, y: lastY },
            ...prev.slice(0, 7), // trail of 8 dots
          ]);
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('[role="button"]') ||
        target?.closest('.hover-trigger')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing dots */}
      {points.map((point, index) => {
        const size = Math.max(4, 14 - index * 1.5);
        const opacity = Math.max(0, 0.7 - index * 0.09);
        return (
          <div
            key={index}
            className="absolute rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              opacity: opacity,
              transition: 'opacity 0.2s ease-out',
            }}
          />
        );
      })}

      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-[#CCFF00] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          backgroundColor: isHovered ? 'rgba(204, 255, 0, 0.3)' : 'transparent',
          boxShadow: isHovered ? '0 0 16px rgba(204, 255, 0, 0.8)' : '0 0 6px #CCFF00',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s',
        }}
      />
    </div>
  );
};
