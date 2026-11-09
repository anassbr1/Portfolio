import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const liquidRef = useRef<SVGGElement | null>(null);
  const strokeGroupRef = useRef<SVGGElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const flareRef = useRef<HTMLDivElement | null>(null);

  // Measure refs for mathematical alignment
  const anassMeasureRef = useRef<SVGTextElement | null>(null);
  const bourasMeasureRef = useRef<SVGTextElement | null>(null);

  // Geometric Balancing: Calculate coordinates so distance(left -> 'A') === distance('S' -> right)
  // Default values provide pixel-balanced alignment even before layout measurement
  const [alignment, setAlignment] = useState({
    anassX: 135,
    bourasX: 395,
  });

  useLayoutEffect(() => {
    if (!anassMeasureRef.current || !bourasMeasureRef.current) return;

    try {
      const anassEl = anassMeasureRef.current;
      const bourasEl = bourasMeasureRef.current;

      // Measure starting x of the letters 'SS' in ANASS (character index 3)
      let ssX = 260;
      if (typeof anassEl.getStartPositionOfChar === 'function') {
        const charPos = anassEl.getStartPositionOfChar(3);
        ssX = charPos.x;
      } else {
        const anassBox = anassEl.getBBox();
        ssX = anassBox.width * 0.58;
      }

      const bourasBox = bourasEl.getBBox();
      const bourasWidth = bourasBox.width;

      // Total composite typography block width: from initial 'A' (x=0 relative) to trailing 'S' of BOURAS
      const totalCompositeWidth = ssX + bourasWidth;

      // ViewBox width is 1000.
      // Symmetrical margin-left == margin-right:
      const leftMargin = (1000 - totalCompositeWidth) / 2;
      const calculatedAnassX = Math.round(leftMargin * 10) / 10;
      const calculatedBourasX = Math.round((leftMargin + ssX) * 10) / 10;

      setAlignment({
        anassX: calculatedAnassX,
        bourasX: calculatedBourasX,
      });
    } catch {
      // Fallback already pre-balanced in initial state
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // =========================================================================
    // PHASE 1: SVG Path / Stroke Drawing Animation (0.0s – 2.0s)
    // Stroke outline drawn from 0 to 100% with transparent interior fill
    // =========================================================================
    tl.fromTo(
      '.anbo-stroke-line',
      {
        strokeDasharray: 2200,
        strokeDashoffset: 2200,
        opacity: 0,
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2.0,
        ease: 'power2.inOut',
        stagger: 0.15,
      },
      0
    );

    // Initial ambient outline glow expansion during stroke draw
    tl.fromTo(
      strokeGroupRef.current,
      {
        filter: 'drop-shadow(0 0 6px rgba(112, 168, 59, 0.3))',
      },
      {
        filter: 'drop-shadow(0 0 16px rgba(112, 168, 59, 0.85)) drop-shadow(0 0 30px rgba(107, 142, 35, 0.4))',
        duration: 2.0,
        ease: 'power2.out',
      },
      0
    );

    // =========================================================================
    // PHASE 2: Liquid Plasma Drop & Color Fill (2.0s – 4.0s)
    // Internal liquid wave rises from 0% height to 100% height inside letter mask
    // =========================================================================
    tl.fromTo(
      liquidRef.current,
      { y: 440 },
      {
        y: 0,
        duration: 2.0,
        ease: 'power2.inOut',
      },
      2.0
    );

    // Expand warm ambient backdrop halo as liquid surges in
    tl.fromTo(
      ambientGlowRef.current,
      {
        opacity: 0.15,
        scale: 0.75,
      },
      {
        opacity: 0.85,
        scale: 1.25,
        duration: 2.0,
        ease: 'power2.out',
      },
      2.0
    );

    // Deepen typographic drop-shadows with intense olive-gold aura
    tl.to(
      strokeGroupRef.current,
      {
        filter: 'drop-shadow(0 0 45px #6B8E23) drop-shadow(0 0 25px #70A83B) drop-shadow(0 0 70px rgba(107, 142, 35, 0.6))',
        duration: 2.0,
        ease: 'power1.out',
      },
      2.0
    );

    // =========================================================================
    // PHASE 3: Reveal Hero (4.0s – 4.8s)
    // Fade in "PORTFOLIO" subtitle, followed by cinema zoom and veil fade-out
    // =========================================================================
    tl.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 12,
        letterSpacing: '0.35em',
      },
      {
        opacity: 1,
        y: 0,
        letterSpacing: '0.5em',
        duration: 0.45,
        ease: 'power2.out',
      },
      4.0
    );

    tl.fromTo(
      flareRef.current,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      },
      4.0
    );

    // Final smooth scale-up zoom (scale: 1.08) and ease-out opacity transition
    tl.to(
      containerRef.current,
      {
        scale: 1.08,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      4.35
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#000000] select-none overflow-hidden cursor-default pointer-events-none"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Warm Ambient Background Olive Plasma Light */}
      <div
        ref={ambientGlowRef}
        className="absolute w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#6B8E23]/30 via-[#556B2F]/20 to-transparent blur-[160px] pointer-events-none transition-transform"
      />

      {/* Dripping Glowing Plasma Droplets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="absolute w-2 h-4 rounded-full bg-[#6B8E23] blur-[1px] animate-[dropletFall_1.8s_infinite_ease-in]"
          style={{ left: '38%', top: '28%' }}
        />
        <span
          className="absolute w-2.5 h-5 rounded-full bg-[#70A83B] blur-[1px] animate-[dropletFall_2.2s_infinite_0.5s_ease-in]"
          style={{ left: '50%', top: '32%' }}
        />
        <span
          className="absolute w-1.5 h-3.5 rounded-full bg-[#F59E0B] blur-[1px] animate-[dropletFall_1.9s_infinite_1.0s_ease-in]"
          style={{ left: '62%', top: '38%' }}
        />
      </div>

      {/* Central Typographic Stage: Composite Symmetrically Balanced Geometry */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 max-w-5xl">
        <svg
          viewBox="0 0 1000 440"
          className="w-full max-w-[880px] overflow-visible"
        >
          <defs>
            {/* Olive Green Plasma Liquid Gradient */}
            <linearGradient id="olivePlasmaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#384620" />
              <stop offset="35%" stopColor="#556B2F" />
              <stop offset="70%" stopColor="#6B8E23" />
              <stop offset="100%" stopColor="#70A83B" />
            </linearGradient>

            {/* Clipping Mask formed strictly by ANASS on top & BOURAS beneath SS */}
            <mask id="anass-bouras-mask">
              <rect width="1000" height="440" fill="black" />
              {/* Line 1: ANASS */}
              <text
                x={alignment.anassX}
                y="170"
                textAnchor="start"
                fill="white"
                fontFamily="'Orbitron', 'Syne', sans-serif"
                fontWeight="900"
                fontSize="120"
                letterSpacing="8"
              >
                ANASS
              </text>
              {/* Line 2: BOURAS */}
              <text
                x={alignment.bourasX}
                y="310"
                textAnchor="start"
                fill="white"
                fontFamily="'Orbitron', 'Syne', sans-serif"
                fontWeight="900"
                fontSize="120"
                letterSpacing="8"
              >
                BOURAS
              </text>
            </mask>
          </defs>

          {/* Hidden measurement elements to verify geometry live */}
          <g opacity="0" pointerEvents="none" aria-hidden="true">
            <text
              ref={anassMeasureRef}
              x="0"
              y="0"
              fontFamily="'Orbitron', 'Syne', sans-serif"
              fontWeight="900"
              fontSize="120"
              letterSpacing="8"
            >
              ANASS
            </text>
            <text
              ref={bourasMeasureRef}
              x="0"
              y="0"
              fontFamily="'Orbitron', 'Syne', sans-serif"
              fontWeight="900"
              fontSize="120"
              letterSpacing="8"
            >
              BOURAS
            </text>
          </g>

          {/* Liquid Fill (Phase 2): Masked strictly inside the letters */}
          <g mask="url(#anass-bouras-mask)">
            <g ref={liquidRef}>
              {/* Dynamic Sinusoidal Liquid Wave */}
              <path
                d="M 0,45 Q 250,-20 500,45 T 1000,45 L 1000,480 L 0,480 Z"
                fill="url(#olivePlasmaGrad)"
                opacity="0.95"
              />
              <path
                d="M 0,65 Q 250,110 500,65 T 1000,65 L 1000,480 L 0,480 Z"
                fill="#70A83B"
                opacity="0.45"
              />
              <rect x="0" y="65" width="1000" height="420" fill="url(#olivePlasmaGrad)" />
            </g>
          </g>

          {/* Vector Stroke Drawing (Phase 1): Transparent fill, crisp #70A83B border */}
          <g
            ref={strokeGroupRef}
            fill="transparent"
            stroke="#70A83B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fontFamily="'Orbitron', 'Syne', sans-serif"
            fontWeight="900"
            fontSize="120"
            letterSpacing="8"
          >
            {/* Line 1: ANASS */}
            <text
              x={alignment.anassX}
              y="170"
              textAnchor="start"
              className="anbo-stroke-line"
            >
              ANASS
            </text>
            {/* Line 2: BOURAS */}
            <text
              x={alignment.bourasX}
              y="310"
              textAnchor="start"
              className="anbo-stroke-line"
            >
              BOURAS
            </text>
          </g>
        </svg>

        {/* Phase 3: Subtitle "PORTFOLIO" Reveal */}
        <div
          ref={subtitleRef}
          className="mt-6 flex flex-col items-center opacity-0"
        >
          <span className="text-xs sm:text-sm md:text-base font-orbitron font-semibold uppercase text-slate-200 tracking-[0.5em]">
            PORTFOLIO
          </span>
          <div
            ref={flareRef}
            className="h-[2px] w-56 mt-2.5 bg-gradient-to-r from-transparent via-[#6B8E23] to-transparent shadow-[0_0_15px_#6B8E23]"
          />
        </div>
      </div>
    </div>
  );
};
