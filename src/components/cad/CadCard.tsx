import React, { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CadCardProps {
  children: ReactNode;
  className?: string;
  coordinates?: string;
  status?: string;
  variant?: 'cyan' | 'amber' | 'slate';
  enableScrub?: boolean;
}

export const CadCard: React.FC<CadCardProps> = ({
  children,
  className = '',
  coordinates = 'CAD-REF [X: 142.10, Y: 68.30]',
  status = 'ACTIVE',
  variant = 'cyan',
  enableScrub = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const borderSvgRef = useRef<SVGRectElement | null>(null);
  const reticlesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const card = cardRef.current;
    const border = borderSvgRef.current;
    if (!card || !enableScrub) return;

    if (border) {
      const perimeter = 2 * (card.offsetWidth + card.offsetHeight) || 1200;
      border.style.strokeDasharray = `${perimeter}`;
      border.style.strokeDashoffset = `${perimeter}`;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 35%',
        scrub: 1,
      },
    });

    tl.fromTo(
      card,
      {
        opacity: 0.25,
        y: 40,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
      }
    );

    if (border) {
      tl.to(
        border,
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power1.inOut',
        },
        0
      );
    }

    reticlesRef.current.forEach((reticle, index) => {
      if (reticle) {
        tl.fromTo(
          reticle,
          {
            rotation: index % 2 === 0 ? -90 : 90,
            scale: 0.4,
            opacity: 0.3,
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(2)',
          },
          0.2
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [enableScrub]);

  const accentColor = variant === 'amber' ? 'text-amber-500' : 'text-cyan-400';
  const borderStrokeColor = variant === 'amber' ? 'rgba(255, 107, 0, 0.45)' : 'rgba(0, 210, 255, 0.4)';

  return (
    <div
      ref={cardRef}
      className={`relative group bg-[#0c0e17]/80 dark:bg-[#0c0e17]/80 light:bg-white/90 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg hover:shadow-cyan-500/10 ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={borderSvgRef}
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke={borderStrokeColor}
          strokeWidth="1.2"
          className="transition-colors duration-300 group-hover:stroke-cyan-400"
        />
      </svg>

      <span
        ref={el => { reticlesRef.current[0] = el; }}
        className="absolute -top-2 -left-2 text-xs font-mono font-bold select-none text-cyan-400 dark:text-cyan-400 light:text-sky-600 z-20"
      >
        +
      </span>
      <span
        ref={el => { reticlesRef.current[1] = el; }}
        className="absolute -top-2 -right-2 text-xs font-mono font-bold select-none text-cyan-400 dark:text-cyan-400 light:text-sky-600 z-20"
      >
        +
      </span>
      <span
        ref={el => { reticlesRef.current[2] = el; }}
        className="absolute -bottom-2 -left-2 text-xs font-mono font-bold select-none text-cyan-400 dark:text-cyan-400 light:text-sky-600 z-20"
      >
        +
      </span>
      <span
        ref={el => { reticlesRef.current[3] = el; }}
        className="absolute -bottom-2 -right-2 text-xs font-mono font-bold select-none text-cyan-400 dark:text-cyan-400 light:text-sky-600 z-20"
      >
        +
      </span>

      <div className="flex items-center justify-between px-3 py-1.5 border-b border-cyan-500/15 bg-black/30 text-[10px] font-mono tracking-wider text-slate-400 select-none z-10 relative">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="truncate max-w-[190px]">{coordinates}</span>
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border border-current ${accentColor}`}>
          {status}
        </span>
      </div>

      <div className="relative z-10 p-5 md:p-6">
        {children}
      </div>

      <div className="absolute bottom-0 right-4 w-8 h-[2px] bg-cyan-400/50 pointer-events-none" />
      <div className="absolute top-0 left-4 w-8 h-[2px] bg-cyan-400/50 pointer-events-none" />
    </div>
  );
};
