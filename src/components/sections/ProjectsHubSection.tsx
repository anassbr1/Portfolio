import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GithubIcon } from '../icons/BrandIcons';
import { 
  Cpu, 
  Activity, 
  Database, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  GitBranch, 
  Star, 
  Layers,
  Terminal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const ProjectsHubSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch live GitHub telemetry from @anassbr1
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/anassbr1/repos?sort=updated&per_page=6');
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            setGithubRepos(list);
          }
        }
      } catch (err) {
        console.warn('Using local repository fallback telemetry', err);
      }
    };
    fetchRepos();
  }, []);

  const filterTabs = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'ml', label: t.projects.filterML },
    { id: 'mlops', label: t.projects.filterMLOps },
    { id: 'data_eng', label: t.projects.filterDataEng },
    { id: 'web', label: t.projects.filterWeb },
  ];

  const filteredProjects = data.flagshipProjects.filter(project => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ml') return project.category === 'ml';
    if (activeCategory === 'mlops') return project.category === 'mlops' || project.category === 'distributed';
    if (activeCategory === 'data_eng') return project.category === 'data_eng';
    if (activeCategory === 'web') return project.category === 'web';
    return true;
  });

  const handleFilterSelect = (catId: string) => {
    setActiveCategory(catId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  // Ensure uninterrupted seamless infinite scroll with dynamic replenishment
  const displayProjects = React.useMemo(() => {
    if (filteredProjects.length === 0) return [];
    if (filteredProjects.length < 3) {
      return [...filteredProjects, ...filteredProjects, ...filteredProjects, ...filteredProjects];
    }
    return [...filteredProjects, ...filteredProjects];
  }, [filteredProjects]);

  // Seamless Auto-Spinning Carousel Animation Loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.85; // Pixels per frame

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredProjects]);

  // Handlers and helper functions
  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const getCategoryIcon = (category: ProjectItem['category']) => {
    switch (category) {
      case 'ml': return <Cpu className="w-3.5 h-3.5 text-[#70A83B]" />;
      case 'mlops': return <Activity className="w-3.5 h-3.5 text-[#70A83B]" />;
      case 'data_eng': return <Database className="w-3.5 h-3.5 text-[#70A83B]" />;
      case 'distributed': return <Layers className="w-3.5 h-3.5 text-[#70A83B]" />;
      case 'web': return <Globe className="w-3.5 h-3.5 text-[#70A83B]" />;
      default: return <Cpu className="w-3.5 h-3.5 text-[#70A83B]" />;
    }
  };

  return (
    <section id="projects" className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.projects.subtitle}
          </p>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterSelect(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-orbitron font-semibold tracking-wider transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-[#6B8E23] text-white border border-[#70A83B] shadow-[0_0_15px_rgba(107,142,35,0.45)] scale-105'
                    : 'bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-[#6B8E23]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shadow-2xs"
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shadow-2xs"
              aria-label="Next Projects"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Spinning Infinite Horizontal Ribbon Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-4 sm:px-8 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayProjects.map((project, idx) => (
          <div
            key={`${project.id}-${idx}`}
            className="w-[360px] sm:w-[420px] shrink-0 rounded-3xl p-6 sm:p-7 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury hover:-translate-y-1 hover:border-[#70A83B]/60 hover:shadow-[0_15px_35px_rgba(112,168,59,0.25)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Category Badge in Olive Green Wireframe */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B8E23]/10 text-[#70A83B] border border-[#6B8E23]/40 font-bold uppercase">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {project.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold font-orbitron text-neutral-950 dark:text-white line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#70A83B] mt-1 line-clamp-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Concise Impact Description */}
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans line-clamp-3">
                {project.description[language] || project.description.en}
              </p>

              {/* Verified Metrics Bar */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded-xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05]">
                      <span className="text-[9px] font-mono text-neutral-500 block truncate">
                        {m.label[language] || m.label.en}
                      </span>
                      <span className="text-xs font-orbitron font-bold text-neutral-950 dark:text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Miniature Vector Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons: GitHub link and Demo link */}
            <div className="mt-5 pt-3.5 border-t border-neutral-200 dark:border-white/[0.08] flex items-center justify-between gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-[#6B8E23]/20 dark:bg-white/[0.04] border border-neutral-300 hover:border-[#6B8E23]/50 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-orbitron font-semibold uppercase tracking-wider transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                  <ExternalLink className="w-3 h-3 text-[#70A83B]" />
                </a>
              ) : (
                <span className="text-[10px] font-mono text-neutral-500">Internal IP</span>
              )}

              <span className="text-[10px] font-mono text-[#70A83B] font-semibold">
                PROD GRADE
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic GitHub Repository Stream Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 shadow-md dark:shadow-luxury flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#70A83B] uppercase font-bold tracking-wider">
              <Terminal className="w-4 h-4 text-[#70A83B]" />
              <span>LIVE GITHUB REPOSITORY STREAM</span>
            </div>
            <h3 className="text-xl font-bold font-orbitron text-neutral-950 dark:text-white">
              Dynamic Telemetry from @anassbr1
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Synchronized commit metrics and open-source contributions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {githubRepos.slice(0, 3).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-2xl bg-white dark:bg-white/[0.02] hover:bg-neutral-100 dark:hover:bg-white/[0.05] border border-neutral-200 dark:border-white/10 text-xs font-mono flex items-center gap-2 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#70A83B]" />
                <span className="font-semibold text-neutral-900 dark:text-white">{repo.name}</span>
                <span className="flex items-center gap-0.5 text-amber-500 dark:text-amber-300 text-[10px]">
                  <Star className="w-2.5 h-2.5" />
                  <span>{repo.stargazers_count}</span>
                </span>
              </a>
            ))}

            <a
              href="https://github.com/anassbr1?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explore All</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
