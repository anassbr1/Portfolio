import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LuxuryCard } from '../common/LuxuryCard';
import { TechBadge } from '../common/TechBadge';
import { GithubIcon } from '../icons/BrandIcons';
import { 
  ExternalLink, 
  Cpu, 
  Activity, 
  Layers, 
  Database, 
  Network,
  Sparkles,
  Server
} from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';

export const FlagshipProjectsSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const getCategoryIcon = (cat: ProjectItem['category']) => {
    switch (cat) {
      case 'ml': return <Cpu className="w-4 h-4 text-sky-400" />;
      case 'mlops': return <Activity className="w-4 h-4 text-indigo-400" />;
      case 'data_eng': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'distributed': return <Network className="w-4 h-4 text-purple-400" />;
      default: return <Server className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section id="flagship" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-sky-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.flagship.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
            {t.flagship.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.flagship.subtitle}
          </p>
        </div>

        {/* Flagship Projects Grid */}
        <div className="space-y-12">
          {data.flagshipProjects.map((project, idx) => {
            const isAlternate = idx % 2 === 1;
            const glowColor = idx % 2 === 0 ? 'cyan' : 'violet';

            return (
              <LuxuryCard
                key={project.id}
                tag={`FLAGSHIP 0${idx + 1}`}
                badge={project.status}
                glowColor={glowColor}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Project Details */}
                  <div className={`lg:col-span-7 space-y-5 ${isAlternate ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                      {getCategoryIcon(project.category)}
                      <span className="uppercase tracking-widest font-semibold">{project.category}</span>
                      <span className="text-slate-600">//</span>
                      <span className="text-slate-400">{project.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                      {project.description[language] || project.description.en}
                    </p>

                    {/* Verified Metrics Strip */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">
                          {t.flagship.metricsHeading}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {project.metrics.map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center"
                            >
                              <div className="text-lg sm:text-xl font-bold text-white font-mono">
                                {metric.value}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                                {metric.label[language] || metric.label.en}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Tech Stack Badges */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">
                        {t.flagship.stackHeading}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tag => (
                          <TechBadge key={tag} name={tag} size="sm" />
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-sky-400/50 text-white font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                        >
                          <GithubIcon className="w-4 h-4 text-sky-400" />
                          <span>{t.flagship.viewCode}</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/30 text-sky-200 font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t.flagship.liveDemo}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Architectural Flow Schematic */}
                  <div className={`lg:col-span-5 ${isAlternate ? 'lg:order-1' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-3xl border border-white/[0.08] bg-[#0A0D14]/80 p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
                      {/* Ambient background glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                          <Layers className="w-3.5 h-3.5" />
                          <span>PIPELINE_ARCHITECTURE</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          PRODUCTION
                        </span>
                      </div>

                      {/* Schematic Flow Steps */}
                      <div className="relative z-10 my-auto space-y-3">
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                          <div className="text-xs font-semibold text-white">01. Data Ingestion & Validation</div>
                          <div className="text-[10px] font-mono text-sky-400">Pydantic / Clean</div>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-sky-400/40" />
                        </div>

                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/40 flex items-center justify-between shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            <span>02. Model Inference Core</span>
                          </div>
                          <div className="text-[10px] font-mono text-sky-300 font-bold">&lt; 40ms Latency</div>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-indigo-400/40" />
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                          <div className="text-xs font-semibold text-white">03. Automated Docker CI/CD</div>
                          <div className="text-[10px] font-mono text-indigo-400">GitHub Actions</div>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/[0.06] pt-3">
                        <span>SHA256: 7f8a9b2c...</span>
                        <span>DOCKER ENGINE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </LuxuryCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
