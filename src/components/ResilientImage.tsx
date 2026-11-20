import { useState } from 'react';
import { Logo } from './Logo';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

/**
 * Resilient editorial photograph wrapper with warm navy/orange color grade
 * and a clean Kevat fallback frame if any asset fails to load.
 */
export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-[#0E0D3A] p-6 text-center text-[#FBF8F3] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Logo variant="mark" className="h-12 w-20" />
        <p className="text-sm font-semibold text-[#FBF8F3]/90">{fallbackTitle || alt}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EAE2D6] dark:bg-[#15144B]">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#EFE8DC] dark:bg-[#171650]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`editorial-photo-grade h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
      {/* Subtle warm navy/orange editorial wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#1B1A5E]/20 via-transparent to-[#F58220]/10 mix-blend-multiply"
      />
    </div>
  );
}
