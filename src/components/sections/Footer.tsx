import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

export const Footer: React.FC = () => {
  const { t, data, language } = usePortfolio();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-neutral-200 dark:border-white/[0.08] bg-neutral-100 dark:bg-[#000000] text-neutral-600 dark:text-neutral-400 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Rights */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] border border-[#6B8E23]/40 flex items-center justify-center font-orbitron font-bold text-xs text-[#70A83B] shadow-2xs">
              AB
            </div>
            <div>
              <div className="font-orbitron font-bold text-sm text-neutral-950 dark:text-white">
                {data.personal.name[language] || data.personal.name.en}
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                {t.footer.rights}
              </p>
            </div>
          </div>

          {/* Social Icons & Back To Top (Admin CMS trigger hidden from UI) */}
          <div className="flex items-center gap-3">
            <a
              href={data.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors border border-neutral-300 dark:border-white/10 shadow-2xs"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors border border-neutral-300 dark:border-white/10 shadow-2xs"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Back to top */}
            <button
              onClick={handleScrollTop}
              className="p-2.5 rounded-xl bg-[#6B8E23]/15 hover:bg-[#6B8E23] text-[#70A83B] hover:text-white border border-[#6B8E23]/30 transition-all shadow-2xs"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
