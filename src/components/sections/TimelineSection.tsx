import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LuxuryCard } from '../common/LuxuryCard';
import { TechBadge } from '../common/TechBadge';
import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'academics' | 'experience'>('academics');

  return (
    <section id="timeline" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sky-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.timeline.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
            {t.timeline.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.timeline.subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('academics')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs font-semibold transition-all ${
                activeTab === 'academics'
                  ? 'bg-sky-500/20 border border-sky-400/60 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>{t.timeline.academicsTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs font-semibold transition-all ${
                activeTab === 'experience'
                  ? 'bg-indigo-500/20 border border-indigo-400/60 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>{t.timeline.experienceTab}</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Crossed Hands Interactive Portrait */}
          <div className="lg:col-span-4 sticky top-28">
            <LuxuryCard
              glowColor={activeTab === 'academics' ? 'cyan' : 'violet'}
              enableScrub={false}
              className="rounded-3xl p-4 border border-white/10 shadow-luxury"
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-950/20 via-[#0A0D14]/50 to-[#08090A]/90 flex items-end justify-center group">
                  <img
                    src={data.personal.portraitCrossed}
                    alt="Anass Bouras - Professional Profile"
                    className="relative z-10 max-h-[96%] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#08090A]/85 backdrop-blur-xl border border-white/10 text-xs">
                    <div className="text-white font-bold truncate font-heading">Anass Bouras</div>
                    <div className="text-sky-400 font-mono text-[11px] truncate">M2 AI FSBM Casablanca</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono space-y-2.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Academic Program:</span>
                    <span className="text-white font-semibold">Excellence AI</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Graduation Date:</span>
                    <span className="text-sky-400 font-bold">2027</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Current Focus:</span>
                    <span className="text-emerald-400 font-bold">PFE Internship</span>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="lg:col-span-8 space-y-8">
            {activeTab === 'academics' ? (
              <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
                {data.academics.map((item, idx) => (
                  <div key={item.id} className="relative group">
                    {/* Glowing Pulse Timeline Node */}
                    <span className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 border-sky-400 bg-[#08090A] group-hover:bg-sky-400 transition-colors shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

                    <LuxuryCard
                      tag={`ACADEMIC 0${idx + 1}`}
                      badge={item.period}
                      glowColor="cyan"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.period}</span>
                            <span className="text-slate-600">•</span>
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-slate-400">{item.location}</span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                            {item.degree[language] || item.degree.en}
                          </h3>

                          <div className="text-sm font-medium text-slate-300">
                            {item.institution[language] || item.institution.en}
                          </div>

                          {item.modules && (
                            <div className="pt-3">
                              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                                {t.timeline.keyModules}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {(item.modules[language] || item.modules.en).map(mod => (
                                  <span
                                    key={mod}
                                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs"
                                  >
                                    {mod}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Emblem Icon */}
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 w-24 h-24 shadow-sm self-start sm:self-center">
                          <img
                            src={item.emblem}
                            alt="Institution Emblem"
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(56,189,248,0.2)]"
                          />
                        </div>
                      </div>
                    </LuxuryCard>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 border-indigo-400 bg-[#08090A] group-hover:bg-indigo-400 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                    <LuxuryCard
                      tag={`EXPERIENCE 0${idx + 1}`}
                      badge={exp.period}
                      glowColor="violet"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                          <span className="text-slate-600">•</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-400">{exp.location[language] || exp.location.en}</span>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                            {exp.role[language] || exp.role.en}
                          </h3>
                          <div className="text-sm font-medium text-slate-300 mt-0.5">
                            {exp.company[language] || exp.company.en}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                            {t.timeline.impactPoints}
                          </div>
                          <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
                            {(exp.bullets[language] || exp.bullets.en).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map(tag => (
                              <TechBadge key={tag} name={tag} size="sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </LuxuryCard>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
