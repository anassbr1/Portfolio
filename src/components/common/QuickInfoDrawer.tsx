import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronLeft,
  Sparkles,
  Send
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

export const QuickInfoDrawer: React.FC = () => {
  const { data, language } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleScrollToContact = () => {
    setIsOpen(false);
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Collapsible Right-Edge Tab */}
      <aside 
        aria-label="Profile Quick-View Trigger"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex flex-col items-center gap-2.5 py-4 px-2 sm:px-2.5 rounded-l-2xl bg-neutral-900/90 dark:bg-[#0d0d10]/90 hover:bg-neutral-800 dark:hover:bg-[#15151a] border-l-2 border-t border-b border-[#70A83B] text-white shadow-[0_0_20px_rgba(112,168,59,0.35)] hover:shadow-[0_0_30px_rgba(112,168,59,0.6)] hover:-translate-x-1 transition-all duration-300 backdrop-blur-md cursor-pointer"
          title="Open Profile Quick-View"
          aria-expanded={isOpen}
        >
          <div className="relative">
            <span className="w-2 h-2 rounded-full bg-[#70A83B] block animate-pulse" />
          </div>
          <ChevronLeft className="w-4 h-4 text-[#70A83B] group-hover:-translate-x-0.5 transition-transform" />
          <span className="[writing-mode:vertical-rl] font-orbitron text-[10px] sm:text-xs font-bold tracking-widest uppercase text-neutral-300 group-hover:text-white transition-colors">
            Profile Quick-View
          </span>
        </button>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Slide-out Glassmorphism Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[330px] sm:w-[380px] z-50 bg-white/95 dark:bg-[#070709]/95 backdrop-blur-2xl border-l border-neutral-200 dark:border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] p-6 overflow-y-auto flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#70A83B]" />
              <span className="text-xs font-mono font-bold text-[#70A83B] tracking-wider uppercase">
                TELEMETRY QUICK-VIEW
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Close Profile Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Portrait & Core Identity */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#70A83B]/50 shadow-[0_0_20px_rgba(112,168,59,0.3)] bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-900 dark:to-black">
              <img 
                src="/assets/Me/Me.png" 
                alt="Anass Bouras - Professional Portrait" 
                className="w-full h-full object-cover object-top"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                loading="eager"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold font-orbitron text-neutral-950 dark:text-white">
                {data.personal.name[language] || data.personal.name.en}
              </h3>
              <p className="text-xs font-mono text-[#70A83B] mt-0.5">
                AI Engineer & MLOps Architect
              </p>
              <p className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 mt-1">
                Master 2 AI Candidate • FSBM Casablanca
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/40 text-[10px] font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-[#70A83B]" />
              <span>Available for PFE & Opportunities</span>
            </div>
          </div>

          {/* Quick Coordinates & One-Click Copy */}
          <div className="space-y-2.5 pt-2">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
              Direct Coordinates
            </div>

            {/* Email */}
            <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-[#70A83B] shrink-0" />
                <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200 truncate">
                  {data.personal.email}
                </span>
              </div>
              <button
                onClick={() => handleCopy(data.personal.email, 'email')}
                className="p-1.5 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-[#6B8E23]/20 text-neutral-600 dark:text-neutral-300 hover:text-[#70A83B] transition-colors shrink-0"
                title="Copy Email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone className="w-4 h-4 text-[#70A83B] shrink-0" />
                <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200 truncate">
                  {data.personal.phone}
                </span>
              </div>
              <button
                onClick={() => handleCopy(data.personal.phone, 'phone')}
                className="p-1.5 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-[#6B8E23]/20 text-neutral-600 dark:text-neutral-300 hover:text-[#70A83B] transition-colors shrink-0"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#70A83B] shrink-0" />
              <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200">
                {data.personal.location[language] || 'Casablanca, Morocco'}
              </span>
            </div>
          </div>

          {/* Social Channels */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
              External Verification
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={data.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] hover:bg-[#6B8E23]/15 border border-neutral-200 dark:border-white/10 hover:border-[#70A83B]/50 text-xs font-mono text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#70A83B]" />
              </a>

              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] hover:bg-[#6B8E23]/15 border border-neutral-200 dark:border-white/10 hover:border-[#70A83B]/50 text-xs font-mono text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#70A83B]" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons: Download CV & Contact Message */}
        <div className="pt-6 space-y-2.5 border-t border-neutral-200 dark:border-white/10">
          <a
            href={data.personal.cvUrl || '/assets/Cv_Latest.pdf'}
            download="Cv_Anass_Bouras_Eng.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(107,142,35,0.35)]"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download Latest CV (PDF)</span>
          </a>

          <button
            onClick={handleScrollToContact}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-orbitron font-semibold uppercase tracking-wider transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>Direct Transmission</span>
          </button>
        </div>
      </div>
    </>
  );
};
