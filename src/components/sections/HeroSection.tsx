import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Download, 
  Cpu, 
  MapPin, 
  Mail, 
  Phone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

export const HeroSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  // Dynamic Hybrid Typewriter Hook
  const titles = t.hero.typewriterTitles || [
    'AI Engineer',
    'Data Analyst',
    'MLOps Developer',
    'Deep Learning Specialist',
    'ETL & Data Pipeline Builder',
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullTitle = titles[titleIndex % titles.length];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
        setTypingSpeed(80);

        if (displayText.length + 1 === currentFullTitle.length) {
          setIsDeleting(true);
          setTypingSpeed(2200); // Pause at full word
        }
      } else {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
        setTypingSpeed(45); // Faster backspacing

        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex(prev => (prev + 1) % titles.length);
          setTypingSpeed(400); // Pause before next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles, typingSpeed]);

  // 3D Card Tilt Interaction
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden z-10"
    >
      {/* Subtle Olive Ambient Halo */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-[#6B8E23]/[0.06] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Clean, Static Professional Status Presentation */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-[#70A83B]" />
          <span className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-300 tracking-wide">
            Open to PFE & Data / AI Opportunities
          </span>
        </div>

        {/* Split Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines, Typewriter & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#70A83B] uppercase tracking-widest font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{data.personal.location[language]}</span>
                <span className="text-neutral-400 dark:text-neutral-600">//</span>
                <span>FSBM Hassan II University</span>
              </div>

              {/* Candidate Name in Crisp Typography */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950 dark:text-white font-heading leading-[1.08]">
                {data.personal.name[language]}
              </h1>

              {/* Dynamic Hybrid Typewriter Title with Olive Accent */}
              <div className="flex items-center gap-2 text-xl sm:text-3xl font-orbitron font-bold text-neutral-800 dark:text-neutral-200 min-h-[44px]">
                <span className="text-[#6B8E23]">➔</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#70A83B] via-[#6B8E23] to-emerald-400">
                  {displayText}
                </span>
                <span className="w-[2.5px] h-6 bg-[#6B8E23] animate-pulse" />
              </div>
            </div>

            {/* Core Intro Paragraph */}
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
              {t.hero.intro}
            </p>

            {/* Crisp Telemetry Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.08] shadow-xs">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{t.hero.specLoc}</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-xs mt-0.5 truncate">
                  Casablanca, MA
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.08] shadow-xs">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{t.hero.specEdu}</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-xs mt-0.5 truncate">
                  FSBM Hassan II
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-[#6B8E23]/30 shadow-xs">
                <div className="text-[10px] font-mono text-[#70A83B] uppercase">{t.hero.specFocus}</div>
                <div className="font-semibold text-[#70A83B] text-xs mt-0.5 truncate">
                  MLOps & Deep Learning
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.08] shadow-xs">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{t.hero.specStatus}</div>
                <div className="font-semibold text-neutral-800 dark:text-neutral-300 text-xs mt-0.5 truncate">
                  Graduation 2027
                </div>
              </div>
            </div>

            {/* Action Buttons: [Download CV] & [Explore Projects] */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={data.personal.cvUrl}
                download="Cv_Anass_Bouras_Eng.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(107,142,35,0.35)] hover:shadow-[0_0_30px_rgba(107,142,35,0.55)] active:scale-95"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{t.hero.downloadCv}</span>
              </a>

              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/10 hover:border-[#6B8E23]/50 text-neutral-800 dark:text-neutral-200 text-xs font-orbitron font-bold tracking-wider uppercase transition-all"
              >
                <Cpu className="w-4 h-4 text-[#70A83B]" />
                <span>{t.hero.exploreProjects}</span>
              </a>
            </div>

            {/* Direct Social Links */}
            <div className="flex items-center gap-3 pt-2 text-neutral-500 dark:text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Direct Channels:
              </span>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 hover:border-[#6B8E23] hover:text-[#70A83B] transition-colors shadow-2xs"
                title="GitHub Repositories"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 hover:border-[#6B8E23] hover:text-[#70A83B] transition-colors shadow-2xs"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${data.personal.email}`}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 hover:border-[#6B8E23] hover:text-[#70A83B] transition-colors shadow-2xs"
                title="Email Transmission"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/212648727750"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 hover:border-[#6B8E23] hover:text-[#70A83B] transition-colors shadow-2xs"
                title="Phone / WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Portrait Frame with Subtle Olive Glow & 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md perspective-1000 select-none"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isHovered ? 'none' : 'transform 0.5s ease-out',
              }}
            >
              {/* Ambient Olive Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-[#6B8E23]/25 opacity-40 blur-xl pointer-events-none transition-opacity duration-300" />

              {/* Glass Card Container */}
              <div className="relative rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-[#0a0a0c]/90 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Portrait Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-200 dark:from-[#111114] dark:via-[#050505] dark:to-[#000000] flex items-end justify-center">
                  <img
                    src={data.personal.portraitStand || "/assets/Me/Me standing.png"}
                    alt="Anass Bouras - Professional Portrait"
                    className="relative z-10 max-h-[96%] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out hover:scale-105"
                    loading="eager"
                  />

                  {/* Clean Bottom Label */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 p-3 rounded-xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-neutral-950 dark:text-white font-bold font-orbitron text-sm">Anass Bouras</div>
                        <div className="text-[#70A83B] font-mono text-[11px]">Master M2 AI • FSBM Casablanca</div>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                        <div>CASABLANCA</div>
                        <div className="text-[#70A83B] font-semibold">CONFIRMED</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
