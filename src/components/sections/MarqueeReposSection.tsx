import React, { useRef, useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TechBadge } from '../common/TechBadge';
import { GithubIcon } from '../icons/BrandIcons';
import { ExternalLink, Code2, Star, ArrowRight } from 'lucide-react';

export const MarqueeReposSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const marqueeContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ml' | 'mlops' | 'distributed' | 'web'>('all');

  const filteredRepos = activeFilter === 'all'
    ? data.repositories
    : data.repositories.filter(repo => repo.category === activeFilter);

  // Auto-scroll loop with pause on hover
  useEffect(() => {
    const container = marqueeContainerRef.current;
    if (!container) return;

    let animId: number;
    const scrollSpeed = 0.85;

    const scroll = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, filteredRepos]);

  const displayRepos = [...filteredRepos, ...filteredRepos];

  return (
    <section id="repos" className="relative py-24 z-10 overflow-hidden border-y border-white/[0.06] bg-[#090B0E]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-indigo-400 text-xs font-mono tracking-widest uppercase">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.marquee.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
              {t.marquee.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl">
              {t.marquee.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {[
              { id: 'all', label: `All Repos (${data.repositories.length})` },
              { id: 'ml', label: 'ML & Vision' },
              { id: 'mlops', label: 'MLOps & CI/CD' },
              { id: 'distributed', label: 'Distributed Systems' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeFilter === filter.id
                    ? 'bg-sky-500/20 border-sky-400/60 text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hover Hint */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>{t.marquee.pauseHint}</span>
          <a
            href={data.personal.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>{t.marquee.viewAllGithub}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Marquee Track */}
      <div
        ref={marqueeContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-5 overflow-x-auto scrollbar-none py-4 px-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayRepos.map((repo, idx) => (
          <div
            key={`${repo.id}-${idx}`}
            className="flex-shrink-0 w-80 sm:w-96 p-6 rounded-2xl bg-white/[0.03] dark:bg-[#12161F]/70 border border-white/10 dark:border-white/[0.08] hover:border-sky-400/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/[0.06] mb-3">
                <span className="flex items-center gap-1.5 text-sky-400 uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{repo.category}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/[0.05] border border-white/10 text-slate-300">
                  {repo.status}
                </span>
              </div>

              <a
                href={repo.repoUrl || data.personal.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between"
              >
                <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors truncate font-heading">
                  {repo.title}
                </h4>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors flex-shrink-0 ml-2" />
              </a>

              <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                {repo.description[language] || repo.description.en}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {repo.techStack.map(tag => (
                  <TechBadge key={tag} name={tag} size="sm" />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-slate-400">Public Repo</span>
                </span>
                <a
                  href={repo.repoUrl || data.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>anassbri</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
