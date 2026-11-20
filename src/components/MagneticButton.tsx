import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { SPRING_MAGNETIC } from '../utils/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  ariaLabel?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
  ariaLabel,
  strength = 0.24,
}: MagneticButtonProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const deltaX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const deltaY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(Math.max(-12, Math.min(12, deltaX)));
    y.set(Math.max(-8, Math.min(8, deltaY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const innerContent = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </>
  );

  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden select-none whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E0D3A] ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a href={href} aria-label={ariaLabel} onClick={onClick} className={baseClasses}>
          {innerContent}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          aria-label={ariaLabel}
          className={baseClasses}
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}
