import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Send } from 'lucide-react';

export const QuickContactFab: React.FC = () => {
  const { t } = usePortfolio();

  const handleScrollToContact = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Quick Contact Action"
      className="fixed right-5 bottom-8 z-40 group select-none"
    >
      <button
        onClick={handleScrollToContact}
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#6B8E23] hover:bg-[#556B2F] text-white shadow-[0_0_20px_rgba(107,142,35,0.4)] hover:shadow-[0_0_30px_rgba(107,142,35,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        title="Instant Scroll to Contact"
      >
        <span className="w-2 h-2 rounded-full bg-white" />
        <Send className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-orbitron font-bold tracking-wider uppercase pr-1 hidden sm:inline">
          {t.contact.fabText || 'Quick Contact'}
        </span>
      </button>
    </aside>
  );
};
