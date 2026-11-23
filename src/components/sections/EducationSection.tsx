import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { language, t } = usePortfolio();

  // Compact Single-Row Engineering Career Roadmap (Horizontal Milestones)
  const milestones = [
    {
      id: 'bts-dsi',
      stationIndex: '01',
      code: '01 // FOUNDATION',
      degree: {
        en: 'BTS – Information Systems Development',
        fr: "BTS – Développement des Systèmes d'Information",
        ar: 'شهادة التقني العالي – تطوير النظم المعلوماتية',
      },
      institution: {
        en: 'Lycée Technique Oujda',
        fr: 'Lycée Technique Oujda',
        ar: 'الثانوية التقنية بوجدة',
      },
      period: '2022 – 2024',
      location: {
        en: 'Oujda, Morocco',
        fr: 'Oujda, Maroc',
        ar: 'وجدة، المغرب',
      },
      status: {
        en: 'Validated',
        fr: 'Validé',
        ar: 'معتمد',
      },
      logo: '/assets/Certificats/BTS.png',
      tags: {
        en: ['Software Engineering', 'SQL Databases', 'OOP Full-Stack'],
        fr: ['Génie Logiciel', 'Bases de Données SQL', 'POO Full-Stack'],
        ar: ['هندسة البرمجيات', 'قواعد بيانات SQL', 'برمجة كائنية التوجه'],
      },
      isApex: false,
    },
    {
      id: 'bachelor-ai',
      stationIndex: '02',
      code: '02 // SPECIALIZATION',
      degree: {
        en: 'Bachelor of Excellence in AI',
        fr: "Licence d'Excellence en IA",
        ar: 'إجازة التميز في الذكاء الاصطناعي',
      },
      institution: {
        en: 'FSBM – Univ. Hassan II, Casablanca',
        fr: 'FSBM – Univ. Hassan II, Casablanca',
        ar: 'كلية العلوم بن مسيك – جامعة الحسن الثاني',
      },
      period: '2024 – 2025',
      location: {
        en: 'Casablanca, Morocco',
        fr: 'Casablanca, Maroc',
        ar: 'الدار البيضاء، المغرب',
      },
      status: {
        en: 'Honors Degree',
        fr: 'Mention Très Bien',
        ar: 'مرتبة الشرف',
      },
      logo: '/assets/Certificats/FSBM.png',
      tags: {
        en: ['Deep Learning & CNN', 'Data Warehousing', 'Optimization'],
        fr: ['Deep Learning & CNN', 'Entrepôts de Données', 'Optimisation'],
        ar: ['التعلم العميق وCNN', 'مستودعات البيانات', 'الاستمثال الرياضي'],
      },
      isApex: false,
    },
    {
      id: 'master-ai',
      stationIndex: '03',
      code: '03 // CURRENT APEX',
      degree: {
        en: 'Master of Excellence in AI (M2)',
        fr: "Master d'Excellence en IA (M2)",
        ar: 'ماستر التميز في الذكاء الاصطناعي (M2)',
      },
      institution: {
        en: 'FSBM – Univ. Hassan II, Casablanca',
        fr: 'FSBM – Univ. Hassan II, Casablanca',
        ar: 'كلية العلوم بن مسيك – جامعة الحسن الثاني',
      },
      period: '2025 – 2027',
      location: {
        en: 'Casablanca, Morocco',
        fr: 'Casablanca, Maroc',
        ar: 'الدار البيضاء، المغرب',
      },
      status: {
        en: 'Current // In Progress',
        fr: 'En Cours // Actuel',
        ar: 'قيد الإنجاز // حالياً',
      },
      logo: '/assets/Certificats/FSBM.png',
      tags: {
        en: ['Production ML & MLOps', 'Distributed Big Data', 'Agentic GenAI'],
        fr: ['MLOps & Production ML', 'Systèmes Distribués', 'IA Générative & Agents'],
        ar: ['هندسة MLOps والإنتاج', 'الأنظمة الموزعة', 'الذكاء التوليدي والوكلاء'],
      },
      isApex: true,
    },
  ];

  return (
    <section id="education" className="relative py-14 sm:py-16 z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#6B8E23]/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header (Compact) */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.04] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.education.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans">
            {t.education.subtitle}
          </p>
        </div>

        {/* Compact Single-Row Horizontal Roadmap */}
        <div className="relative">
          {/* Continuous Horizontal Olive Signal Line (Desktop & Tablet) */}
          <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#6B8E23] via-[#70A83B] to-[#70A83B] shadow-[0_0_10px_rgba(112,168,59,0.5)] z-0 pointer-events-none" />

          {/* 3 Columns Single-Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 relative z-10">
            {milestones.map((m) => (
              <div key={m.id} className="flex flex-col items-center group">
                {/* Luminous Station Node */}
                <div className="relative z-10 mb-3 flex items-center justify-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold text-xs transition-all duration-300 shadow-sm ${
                      m.isApex
                        ? 'bg-neutral-950 text-white border-2 border-[#70A83B] shadow-[0_0_20px_rgba(112,168,59,0.55)] scale-110'
                        : 'bg-white dark:bg-[#0a0a0c] text-neutral-800 dark:text-neutral-200 border-2 border-neutral-300 dark:border-white/20 group-hover:border-[#70A83B] group-hover:text-[#70A83B]'
                    }`}
                  >
                    {m.isApex ? (
                      <div className="relative flex items-center justify-center">
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#70A83B] animate-ping" />
                        <Zap className="w-4 h-4 text-[#70A83B]" />
                      </div>
                    ) : (
                      <span>{m.stationIndex}</span>
                    )}
                  </div>
                </div>

                {/* Compact Card */}
                <div 
                  className={`w-full p-4 sm:p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between h-full ${
                    m.isApex
                      ? 'bg-neutral-50/95 dark:bg-[#08080a] border-[#70A83B]/50 shadow-[0_8px_25px_rgba(112,168,59,0.15)] hover:-translate-y-1'
                      : 'bg-neutral-50/80 dark:bg-[#0a0a0c]/85 border-neutral-200 dark:border-white/10 shadow-xs hover:-translate-y-1 hover:border-[#70A83B]/50'
                  }`}
                >
                  {/* Top: Logo + Node Code & Status */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-1.5 flex items-center justify-center shadow-2xs shrink-0">
                      <img
                        src={m.logo}
                        alt={m.institution[language] || m.institution.en}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-[10px] font-mono font-bold text-[#70A83B] uppercase tracking-wider">
                        {m.code}
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        m.isApex
                          ? 'bg-[#70A83B]/15 text-[#70A83B] border border-[#70A83B]/30'
                          : 'bg-neutral-200/80 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400'
                      }`}>
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{m.status[language] || m.status.en}</span>
                      </span>
                    </div>
                  </div>

                  {/* Middle: Degree Title & Institution */}
                  <div className="mt-3.5 space-y-1">
                    <h3 className="text-base sm:text-lg font-bold font-orbitron text-neutral-950 dark:text-white leading-snug group-hover:text-[#70A83B] transition-colors">
                      {m.degree[language] || m.degree.en}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#6B8E23] dark:text-[#70A83B] truncate">
                      {m.institution[language] || m.institution.en}
                    </p>

                    {/* Meta: Period & Location */}
                    <div className="flex items-center gap-3 pt-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#70A83B]" />
                        <span>{m.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="truncate">{m.location[language] || m.location.en}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: 2-3 Key Curriculum Tags */}
                  <div className="mt-3.5 pt-3 border-t border-neutral-200 dark:border-white/[0.08] flex flex-wrap gap-1.5">
                    {(m.tags[language] || m.tags.en).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
