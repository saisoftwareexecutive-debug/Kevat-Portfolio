import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import React, { useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  cursorMode?: 'view' | 'pointer';
}

export function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(245, 130, 32, 0.14)',
  maxTilt = 4.5,
  cursorMode,
}: TiltCardProps) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 24 });

  const glareBackground = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    mouseX.set(localX);
    mouseY.set(localY);

    const normX = localX / rect.width - 0.5;
    const normY = localY / rect.height - 0.5;

    rotateXRaw.set(-normY * maxTilt * 2);
    rotateYRaw.set(normX * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor={cursorMode}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      className={`group/tilt relative will-change-transform ${className}`}
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
