import React, { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'amber' | 'none';
  enableScrub?: boolean;
  tag?: string;
  badge?: string;
  onClick?: () => void;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  enableScrub = true,
  tag,
  badge,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !enableScrub) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 40%',
        scrub: 1, // Strictly bidirectional 1s scrub smoothing
      },
    });

    tl.fromTo(
      card,
      {
        opacity: 0.2,
        y: 40,
        scale: 0.98,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, [enableScrub]);

  const glowClasses = {
    cyan: 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(56,189,248,0.18)] hover:border-sky-400/40',
    violet: 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(99,102,241,0.18)] hover:border-indigo-400/40',
    amber: 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(245,158,11,0.18)] hover:border-amber-400/40',
    none: 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/20',
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`group relative rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-white/[0.03] dark:bg-[#12161F]/60 light:bg-white/80 border border-white/10 dark:border-white/[0.08] light:border-slate-900/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-1.5 ${glowClasses[glowColor]} ${className}`}
    >
      {/* Ambient background localized radial glow */}
      {glowColor === 'cyan' && (
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
      )}
      {glowColor === 'violet' && (
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
      )}
      {glowColor === 'amber' && (
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
      )}

      {/* Top Header if Tag or Badge provided */}
      {(tag || badge) && (
        <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] dark:border-white/[0.06] light:border-slate-900/[0.06] text-xs font-mono">
          {tag && (
            <span className="flex items-center gap-2 text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="tracking-wide uppercase font-medium">{tag}</span>
            </span>
          )}
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-900/[0.06] border border-white/10 dark:border-white/10 light:border-slate-900/10 text-sky-400">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Content Body */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
