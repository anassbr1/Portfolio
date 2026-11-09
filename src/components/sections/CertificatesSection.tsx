import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Award, 
  FileText, 
  X, 
  CheckCircle2, 
  Download, 
  Eye, 
  ShieldCheck,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { CertificationItem } from '../../types/portfolio';

export const CertificatesSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isPdf = (url?: string) => {
    return url?.toLowerCase().endsWith('.pdf');
  };

  // Seamless Auto-Spinning Carousel Animation Loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.75; // Pixels per frame

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
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -350 : 350;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Duplicate items for continuous infinite auto-looping
  const displayCerts = [...data.certifications, ...data.certifications];

  return (
    <section id="certificates" className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.certificates.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.certificates.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.certificates.subtitle}
          </p>
        </div>

        {/* Clean Navigation Arrows (No micro-copy / instruction pills) */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shadow-2xs"
              aria-label="Previous Certificates"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shadow-2xs"
              aria-label="Next Certificates"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-4 sm:px-8 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayCerts.map((cert, idx) => {
          const hasPdf = isPdf(cert.credentialUrl);
          const imageSrc = cert.thumbnailUrl || (cert.credentialUrl && !hasPdf ? cert.credentialUrl : null);

          return (
            <div
              key={`${cert.id}-${idx}`}
              onClick={() => setSelectedCert(cert)}
              className="w-[300px] sm:w-[340px] shrink-0 rounded-3xl p-5 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury hover:border-[#6B8E23]/60 hover:shadow-[0_15px_35px_rgba(107,142,35,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3.5">
                {/* Header: Code & Media Type */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#6B8E23]/10 text-[#70A83B] border border-[#6B8E23]/40 font-bold text-[10px]">
                    {cert.badgeCode}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white flex items-center gap-1 text-[11px]">
                    {hasPdf ? (
                      <>
                        <FileText className="w-3.5 h-3.5 text-[#70A83B]" />
                        <span>PDF</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                        <span>HD IMG</span>
                      </>
                    )}
                  </span>
                </div>

                {/* High-Resolution Actual Thumbnail Preview */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-200/60 dark:bg-black/60 border border-neutral-300 dark:border-white/[0.08] flex items-center justify-center group-hover:border-[#6B8E23]/40 transition-colors">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={cert.name[language] || cert.name.en}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                      <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.05] border border-neutral-200 dark:border-white/10 text-[#70A83B] shadow-xs">
                        <Award className="w-8 h-8" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Official Certified Document
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Pill */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6B8E23] text-white text-[11px] font-orbitron font-bold uppercase tracking-wider shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-orbitron text-neutral-950 dark:text-white group-hover:text-[#70A83B] transition-colors line-clamp-2">
                    {cert.name[language] || cert.name.en}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Footer Strip */}
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                <span>{cert.year}</span>
                <span className="text-[#70A83B] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#70A83B]" />
                  <span>VERIFIED</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal Lightbox Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0a0a0c] border border-neutral-300 dark:border-white/15 shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-orbitron text-neutral-950 dark:text-white">
                    {selectedCert.name[language] || selectedCert.name.en}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span>{selectedCert.issuer}</span>
                    <span>//</span>
                    <span className="text-[#70A83B] font-semibold">{selectedCert.badgeCode}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-neutral-200/80 dark:bg-white/[0.05] hover:bg-neutral-300 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Stage */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-neutral-100 dark:bg-black/60 min-h-[400px]">
              {selectedCert.credentialUrl ? (
                isPdf(selectedCert.credentialUrl) ? (
                  <iframe
                    src={`${selectedCert.credentialUrl}#toolbar=0`}
                    title={selectedCert.name.en}
                    className="w-full h-[65vh] rounded-2xl border border-neutral-300 dark:border-white/10 bg-white"
                  />
                ) : (
                  <img
                    src={selectedCert.credentialUrl}
                    alt={selectedCert.name[language] || selectedCert.name.en}
                    className="max-h-[68vh] w-auto object-contain rounded-2xl border border-neutral-300 dark:border-white/10 shadow-xl"
                  />
                )
              ) : selectedCert.thumbnailUrl ? (
                <img
                  src={selectedCert.thumbnailUrl}
                  alt={selectedCert.name[language] || selectedCert.name.en}
                  className="max-h-[68vh] w-auto object-contain rounded-2xl border border-neutral-300 dark:border-white/10 shadow-xl"
                />
              ) : (
                <div className="text-center p-8 text-neutral-500 dark:text-neutral-400 font-mono">
                  No preview document attached for this record.
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#70A83B]" />
                <span>OFFICIALLY ATTESTED BY {selectedCert.issuer.toUpperCase()}</span>
              </div>

              {(selectedCert.credentialUrl || selectedCert.thumbnailUrl) && (
                <a
                  href={selectedCert.credentialUrl || selectedCert.thumbnailUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white font-orbitron font-semibold uppercase tracking-wider text-[11px] transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
