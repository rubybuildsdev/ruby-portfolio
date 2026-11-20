import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface TrailPoint {
  x: number;
  y: number;
}

interface CursorTrailProps {
  disabled?: boolean;
}

const MAX_POINTS = 8;

export const CursorTrail: React.FC<CursorTrailProps> = ({ disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);

  // Smooth springs for leading cursor ring
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  // Track prefers-reduced-motion live, so toggling it in the OS without a
  // reload immediately enables/disables the trail (not just read once on mount)
  const [reducedMotionPref, setReducedMotionPref] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotionPref(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d') ?? null;

    // Skip when disabled, on touch devices, or when reduced motion is preferred
    if (disabled || window.matchMedia('(pointer: coarse)').matches || reducedMotionPref) {
      // Clear any trail left over from before the setting changed
      pointsRef.current = [];
      isVisibleRef.current = false;
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (ring) ring.style.opacity = '0';
      return;
    }

    let rafId: number | null = null;

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const drawTrail = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!isVisibleRef.current) return;

      const points = pointsRef.current;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const radius = Math.max(2, (14 - i * 1.5) / 2);
        const opacity = Math.max(0, 0.7 - i * 0.09);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#CCFF00';
        ctx.shadowColor = '#CCFF00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const updateRingStyle = () => {
      const ring = ringRef.current;
      if (!ring) return;
      const visible = isVisibleRef.current;
      const hovered = isHoveredRef.current;
      ring.style.opacity = visible ? '1' : '0';
      ring.style.width = hovered ? '48px' : '24px';
      ring.style.height = hovered ? '48px' : '24px';
      ring.style.backgroundColor = hovered ? 'rgba(204, 255, 0, 0.3)' : 'transparent';
      ring.style.boxShadow = hovered
        ? '0 0 16px rgba(204, 255, 0, 0.8)'
        : '0 0 6px #CCFF00';
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        updateRingStyle();
      }

      pointsRef.current = [
        { x: e.clientX, y: e.clientY },
        ...pointsRef.current.slice(0, MAX_POINTS - 1),
      ];

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          drawTrail();
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      pointsRef.current = [];
      updateRingStyle();
      drawTrail();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const nextHovered = Boolean(
        target?.closest('a') ||
          target?.closest('button') ||
          target?.closest('[role="button"]') ||
          target?.closest('.hover-trigger')
      );
      if (nextHovered !== isHoveredRef.current) {
        isHoveredRef.current = nextHovered;
        updateRingStyle();
      }
    };

    resizeCanvas();
    updateRingStyle();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, disabled, reducedMotionPref]);

  if (disabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border-2 border-[#CCFF00] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0,
          width: 24,
          height: 24,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.15s',
        }}
      />
    </div>
  );
};
