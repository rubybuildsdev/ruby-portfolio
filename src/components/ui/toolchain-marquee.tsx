"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

import { cn } from "@/lib/utils";

import styles from "./toolchain-marquee-utils/toolchain-marquee.module.css";

export type ToolchainItem = {
  label: string;
  role?: string;
  icon: React.ReactNode;
  accent: string;
};

export type ToolchainMarqueeProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  items?: ToolchainItem[];
  stacks?: ToolchainItem[][];
  duration?: number;
  rows?: number;
};

function ToolchainGroup({
  groupRef,
  items,
  hidden = false,
}: {
  groupRef?: React.Ref<HTMLDivElement>;
  items: ToolchainItem[];
  hidden?: boolean;
}) {
  return (
    <div
      ref={groupRef}
      className={styles.group}
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span
          className={styles.badge}
          key={`${hidden ? "copy-" : ""}${item.label}`}
          style={{ "--tool-accent": item.accent } as React.CSSProperties}
          title={item.role ? `${item.label} • ${item.role}` : item.label}
        >
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
          {item.role && !hidden && (
            <span className={styles.tooltip} role="tooltip">
              {item.role}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function ToolchainRow({
  direction,
  duration,
  items,
  paused,
  reduceMotion,
}: {
  direction: "left" | "right";
  duration: number;
  items: ToolchainItem[];
  paused: boolean;
  reduceMotion: boolean;
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const groupRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);
  const [copyCount, setCopyCount] = React.useState(4);
  const [hovered, setHovered] = React.useState(false);
  const x = useMotionValue(0);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group || typeof ResizeObserver === "undefined") return;

    function updateCopyCount() {
      const viewportWidth = viewport?.clientWidth ?? 0;
      const groupWidth = group?.offsetWidth ?? 0;
      if (viewportWidth === 0 || groupWidth === 0) return;

      setCopyCount(Math.max(2, Math.ceil(viewportWidth / groupWidth) + 1));
    }

    updateCopyCount();
    const observer = new ResizeObserver(updateCopyCount);
    observer.observe(viewport);
    observer.observe(group);

    return () => observer.disconnect();
  }, [items]);

  React.useEffect(() => {
    if (reduceMotion) {
      progressRef.current = 0;
      x.set(0);
    }
  }, [reduceMotion, x]);

  useAnimationFrame((_time, delta) => {
    if (reduceMotion || paused || hovered) return;

    const groupWidth = groupRef.current?.offsetWidth ?? 0;
    if (groupWidth === 0) return;

    const distance = (groupWidth / Math.max(duration, 1)) * (delta / 1000);
    const progress = (progressRef.current + distance) % groupWidth;
    progressRef.current = progress;
    x.set(direction === "left" ? -progress : progress - groupWidth);
  });

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      data-direction={direction}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div className={styles.track} style={{ x }}>
        {Array.from(
          { length: reduceMotion ? 1 : copyCount },
          (_, copyIndex) => (
            <ToolchainGroup
              groupRef={copyIndex === 0 ? groupRef : undefined}
              items={items}
              hidden={copyIndex > 0}
              key={copyIndex}
            />
          ),
        )}
      </motion.div>
    </div>
  );
}

export function ToolchainMarquee({
  className,
  duration = 22,
  items,
  rows = 2,
  stacks,
  ...props
}: ToolchainMarqueeProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rowCount = Math.max(1, Math.min(8, Math.round(rows)));
  const customStacks = stacks?.filter((stack) => stack.length > 0);
  const resolvedStacks = customStacks?.length
    ? customStacks
    : items?.length
      ? [items]
      : [];

  if (resolvedStacks.length === 0) return null;

  return (
    <div
      {...props}
      className={cn(styles.root, className)}
      data-slot="toolchain-marquee"
      data-reduced-motion={reduceMotion || undefined}
    >
      <div className={styles.rows}>
        {Array.from({ length: rowCount }, (_, index) => (
          <ToolchainRow
            direction={index % 2 === 0 ? "left" : "right"}
            duration={duration * (1 + ((index % 3) - 1) * 0.06)}
            items={resolvedStacks[index % resolvedStacks.length]}
            key={index}
            paused={false}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}

export default ToolchainMarquee;
