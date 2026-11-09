import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Cpu, Award } from 'lucide-react';

export const AboutMeSection: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section id="about" className="relative py-20 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.about.subtitle}
          </p>
        </div>

        {/* Philosophy & Standing Profile Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Philosophy Statement Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-3xl bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury transition-colors duration-300 relative overflow-hidden z-10">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#70A83B] uppercase tracking-wider font-semibold">
                <Cpu className="w-4 h-4 text-[#70A83B]" />
                <span>{t.about.philosophyTitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-orbitron text-neutral-950 dark:text-white">
                Architecting Intelligence from Research to Production
              </h3>

              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {t.about.philosophyP1}
              </p>

              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {t.about.philosophyP2}
              </p>
            </div>

            {/* Ethos Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-200 dark:border-white/[0.08] mt-6 relative z-10">
              <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] shadow-xs">
                <div className="text-lg font-bold font-orbitron text-[#70A83B]">10+</div>
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">Total Projects</div>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] shadow-xs">
                <div className="text-lg font-bold font-orbitron text-neutral-950 dark:text-white">8</div>
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">Certificates</div>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] shadow-xs">
                <div className="text-lg font-bold font-orbitron text-[#6B8E23]">100%</div>
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">CI/CD & MLOps</div>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] shadow-xs">
                <div className="text-lg font-bold font-orbitron text-neutral-950 dark:text-white">M2 AI</div>
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">Excellence FSBM</div>
              </div>
            </div>
          </div>

          {/* Standing Profile Card with Embedded Background Photo Layering */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury flex flex-col justify-between transition-colors duration-300 min-h-[480px]">
            {/* Absolute Background Photo Layer with Smooth Gradient Bottom Mask */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none flex items-end justify-center overflow-hidden"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <img
                src="/assets/Me/Me standing.png"
                alt="Anass Bouras - Professional Profile"
                className="w-full h-full object-contain object-bottom opacity-80 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Top Status Badges (Strictly relative z-10) */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-[10px] font-mono font-bold text-[#70A83B] uppercase tracking-wider shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#70A83B] animate-pulse" />
                <span>CANDIDATE // M2 AI</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#6B8E23]/20 text-[#70A83B] border border-[#6B8E23]/40 text-[10px] font-mono font-bold">
                <Award className="w-3 h-3 text-[#70A83B]" />
                <span>EXCELLENCE</span>
              </span>
            </div>

            {/* Bottom Telemetry & Info Cards (Strictly relative z-10) */}
            <div className="relative z-10 space-y-3 mt-auto pt-44">
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs shadow-md">
                <div className="text-neutral-950 dark:text-white font-bold font-orbitron text-sm">Anass Bouras</div>
                <div className="text-[#70A83B] font-mono text-[11px] mt-0.5">Excellence AI • FSBM Casablanca</div>
              </div>

              <div className="p-3 rounded-xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center justify-between shadow-xs">
                <span>ACADEMIC FOCUS</span>
                <span className="text-[#70A83B] font-semibold">Generative AI & MLOps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
