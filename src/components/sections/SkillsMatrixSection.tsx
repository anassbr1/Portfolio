import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getTechBrand } from '../common/TechBadge';
import { Sparkles, Cpu, Layers, Database, Globe, BarChart2, Zap } from 'lucide-react';

export const SkillsMatrixSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const getDomainIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Cpu className="w-4 h-4 text-[#70A83B]" />;
      case 1: return <Layers className="w-4 h-4 text-[#70A83B]" />;
      case 2: return <Database className="w-4 h-4 text-[#70A83B]" />;
      case 3: return <Globe className="w-4 h-4 text-[#70A83B]" />;
      case 4: return <BarChart2 className="w-4 h-4 text-[#70A83B]" />;
      case 5: return <Zap className="w-4 h-4 text-[#70A83B]" />;
      default: return <Cpu className="w-4 h-4 text-[#70A83B]" />;
    }
  };

  return (
    <section id="skills" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout - Clean & Objective Tech Pill Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skillCategories.map((category, cIdx) => (
            <div
              key={category.id}
              className="group relative rounded-3xl p-6 sm:p-7 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury hover:border-[#6B8E23]/60 hover:shadow-[0_15px_35px_rgba(107,142,35,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Domain Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/[0.08] pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10 shadow-xs">
                      {getDomainIcon(cIdx)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#70A83B] font-bold">
                        MODULE 0{cIdx + 1}
                      </span>
                      <h3 className="text-base font-bold font-orbitron text-neutral-950 dark:text-white leading-tight">
                        {category.title[language] || category.title.en}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Clean Objective Tech Badge Pill Grid (No Subjective Mastery Bars / Percentages) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill, sIdx) => {
                    const brand = getTechBrand(skill.name);
                    const IconComponent = brand.icon;

                    return (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.07] border border-neutral-200 dark:border-white/10 hover:border-[#6B8E23]/60 transition-all duration-200 shadow-2xs group/pill"
                      >
                        <IconComponent
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                          style={{ color: brand.color }}
                        />
                        <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 group-hover/pill:text-neutral-950 dark:group-hover/pill:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
