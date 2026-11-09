import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Cpu } from 'lucide-react';

export const AboutMeSection: React.FC = () => {
  const { data, t } = usePortfolio();

  return (
    <section id="about" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
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
          <div className="lg:col-span-8 flex flex-col justify-between p-8 rounded-3xl bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury transition-colors duration-300">
            <div className="space-y-6">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-200 dark:border-white/[0.08] mt-6">
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

          {/* Arms Crossed Portrait Card */}
          <div className="lg:col-span-4 rounded-3xl p-4 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury flex flex-col justify-between transition-colors duration-300">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-200 dark:from-[#111114] dark:via-[#050505] dark:to-[#000000] flex items-end justify-center group">
              <img
                src={data.personal.portraitCrossed || "/assets/Me/Me Hands crossed.png"}
                alt="Anass Bouras - Professional Profile"
                className="relative z-10 max-h-[96%] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs shadow-md">
                <div className="text-neutral-950 dark:text-white font-bold font-orbitron">Anass Bouras</div>
                <div className="text-[#70A83B] font-mono text-[11px]">Excellence AI • FSBM Casablanca</div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center justify-between shadow-xs">
              <span>ACADEMIC FOCUS</span>
              <span className="text-[#70A83B] font-semibold">Generative AI & MLOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
