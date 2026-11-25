import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  timestamp: number;
}

interface CursorTrailProps {
  disabled?: boolean;
}

const MAX_POINTS = 24;
const TRAIL_MAX_WIDTH = 12;
const GLOW_BLUR = 10;
const POINT_LIFETIME_MS = 300;

/**
 * Map a speed value (px/frame) to an HSL hue.
 * Slow  → 80  (chartreuse / #CCFF00-ish green-yellow)
 * Fast  → 15  (red-orange)
 */
function speedToHue(speed: number): number {
  const t = Math.min(speed / 30, 1); // 0 → slow, 1 → fast
  return 80 - t * 65; // 80 → 15
}

function speedToSaturation(speed: number): number {
  const t = Math.min(speed / 30, 1);
  return 90 + t * 10; // 90% → 100%
}

function speedToLightness(speed: number): number {
  const t = Math.min(speed / 30, 1);
  return 55 + t * 10; // 55% → 65% — keeps colours vivid
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const isVisibleRef = useRef(false);
  const lastMouseRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Live prefers-reduced-motion tracking
  const [reducedMotionPref, setReducedMotionPref] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const h = (e: MediaQueryListEvent) => setReducedMotionPref(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d') ?? null;

    if (
      disabled ||
      window.matchMedia('(pointer: coarse)').matches ||
      reducedMotionPref
    ) {
      pointsRef.current = [];
      isVisibleRef.current = false;
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    /* ---- canvas sizing ---- */
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* ---- draw comet ---- */
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const now = performance.now();

      // Expire old points
      pointsRef.current = pointsRef.current.filter(
        (p) => now - p.timestamp < POINT_LIFETIME_MS,
      );

      const pts = pointsRef.current;
      if (pts.length < 2 || !isVisibleRef.current) {
        rafIdRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw the comet as a tapered, glowing stroke built from segments
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];

        const tA = 1 - i / pts.length; // 1 at head → 0 at tail
        const tB = 1 - (i + 1) / pts.length;

        const widthA = TRAIL_MAX_WIDTH * tA;
        const widthB = TRAIL_MAX_WIDTH * tB;

        const hueA = speedToHue(a.speed);
        const satA = speedToSaturation(a.speed);
        const litA = speedToLightness(a.speed);
        const alphaA = tA * 0.9;

        const hueB = speedToHue(b.speed);
        const satB = speedToSaturation(b.speed);
        const litB = speedToLightness(b.speed);
        const alphaB = tB * 0.9;

        // Direction perpendicular to segment
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Quad corners
        const x1 = a.x + nx * (widthA / 2);
        const y1 = a.y + ny * (widthA / 2);
        const x2 = a.x - nx * (widthA / 2);
        const y2 = a.y - ny * (widthA / 2);
        const x3 = b.x - nx * (widthB / 2);
        const y3 = b.y - ny * (widthB / 2);
        const x4 = b.x + nx * (widthB / 2);
        const y4 = b.y + ny * (widthB / 2);

        // Gradient along segment
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(
          0,
          `hsla(${hueA}, ${satA}%, ${litA}%, ${alphaA})`,
        );
        grad.addColorStop(
          1,
          `hsla(${hueB}, ${satB}%, ${litB}%, ${alphaB})`,
        );

        ctx.save();
        ctx.fillStyle = grad;
        ctx.shadowColor = `hsl(${hueA}, ${satA}%, ${litA}%)`;
        ctx.shadowBlur = GLOW_BLUR * tA;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x4, y4);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Bright head dot
      const head = pts[0];
      const headHue = speedToHue(head.speed);
      const headSat = speedToSaturation(head.speed);
      const headLit = speedToLightness(head.speed);
      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = `hsl(${headHue}, ${headSat}%, ${headLit}%)`;
      ctx.shadowColor = `hsl(${headHue}, ${headSat}%, ${headLit}%)`;
      ctx.shadowBlur = GLOW_BLUR * 1.5;
      ctx.beginPath();
      ctx.arc(head.x, head.y, TRAIL_MAX_WIDTH / 2 + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafIdRef.current = requestAnimationFrame(draw);
    };

    /* ---- mouse handlers ---- */
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      let speed = 0;

      if (lastMouseRef.current) {
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;
        const dt = Math.max(now - lastMouseRef.current.t, 1);
        speed = Math.sqrt(dx * dx + dy * dy) / (dt / 16); // normalise to ~60fps
      }

      lastMouseRef.current = { x: e.clientX, y: e.clientY, t: now };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
      }

      pointsRef.current = [
        {
          x: e.clientX,
          y: e.clientY,
          vx: 0,
          vy: 0,
          speed,
          timestamp: now,
        },
        ...pointsRef.current.slice(0, MAX_POINTS - 1),
      ];
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      lastMouseRef.current = null;
    };

    /* ---- init ---- */
    resizeCanvas();
    rafIdRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, reducedMotionPref]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
};
