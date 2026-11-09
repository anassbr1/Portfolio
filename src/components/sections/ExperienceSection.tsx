import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { language, t } = usePortfolio();

  // Curated Professional Internships with verified official corporate logos from public/assets/EXP
  const workExperiences = [
    {
      id: 'internship-oujda',
      role: {
        en: 'Web Developer Intern',
        fr: 'Stagiaire Développeur Web',
        ar: 'متدرب تطوير ويب',
      },
      company: {
        en: "Urban Municipality of Oujda (Commune Urbaine d'Oujda)",
        fr: "Commune Urbaine d'Oujda",
        ar: 'جماعة وجدة الحضرية',
      },
      location: 'Oujda, Morocco',
      period: {
        en: 'May 2024 – July 2024',
        fr: 'Mai 2024 – Juillet 2024',
        ar: 'ماي 2024 – يوليوز 2024',
      },
      logo: '/assets/EXP/COMMUNE-OUJDA-LOGO.png',
      badge: {
        en: 'MUNICIPAL SOFTWARE ENGINEERING',
        fr: 'INGÉNIERIE LOGICIELLE MUNICIPALE',
        ar: 'هندسة برمجيات حضرية',
      },
      bullets: {
        en: [
          'Automated internal municipal workflows, substantially cutting manual document turnaround times.',
          'Designed normalized relational database schemas and optimized SQL query execution pipelines.',
          'Engineered secure, responsive administrative web portals for daily inter-departmental operations.',
        ],
        fr: [
          'Automatisation des workflows administratifs internes réduisant les délais de traitement des dossiers.',
          'Conception de schémas relationnels normalisés et optimisation avancée des requêtes SQL.',
          'Développement de portails web administratifs réactifs et sécurisés pour les opérations municipales.',
        ],
        ar: [
          'أتمتة دورات العمل الإدارية الداخلية وتقليص المدة الزمنية لمعالجة الملفات والمعاملات.',
          'تصميم مخططات قواعد البيانات العلائقية المعيارية وتحسين أداء استعلامات SQL المعقدة.',
          'تطوير بوابات وتطبيقات ويب إدارية تفاعلية وآمنة للاستخدام اليومي بين الأقسام.',
        ],
      },
      techStack: ['SQL', 'Relational DB', 'JavaScript', 'PHP'],
    },
    {
      id: 'internship-berkane',
      role: {
        en: 'Web Developer Intern',
        fr: 'Stagiaire Développeur Web',
        ar: 'متدرب تطوير ويب',
      },
      company: {
        en: 'Agence de Communication (Comarke)',
        fr: 'Agence de Communication (Comarke)',
        ar: 'وكالة تواصل واتصال (كومارك)',
      },
      location: 'Berkane, Morocco',
      period: {
        en: 'June 2023 – August 2023',
        fr: 'Juin 2023 – Août 2023',
        ar: 'يونيو 2023 – غشت 2023',
      },
      logo: '/assets/EXP/Comarke.png',
      badge: {
        en: 'COMMERCIAL WEB PLATFORMS',
        fr: 'PLATEFORMES WEB COMMERCIALES',
        ar: 'منصات ويب تجارية',
      },
      bullets: {
        en: [
          'Engineered responsive commercial web platforms with robust full-stack front-end and back-end integration.',
          'Streamlined client digital asset delivery, cross-browser compatibility, and search engine optimization (SEO).',
          'Collaborated in agile team sprints to deploy production-ready client branding and digital presence systems.',
        ],
        fr: [
          'Conception et développement de plateformes web commerciales réactives avec intégration complète front-end et back-end.',
          'Optimisation du chargement des médias, de la compatibilité multi-écrans et du référencement naturel (SEO).',
          'Collaboration en sprints d’équipe agiles pour déployer les vitrines numériques et identités de marque des clients.',
        ],
        ar: [
          'بناء وتطوير منصات ومواقع ويب تجارية متكاملة وربط متقدم بين واجهة المستخدم والواجهة الخلفية.',
          'تحسين سرعة تحميل الموارد وتوافق الشاشات المتعددة ومحركات البحث (SEO).',
          'التعاون ضمن دورات عمل أجايل لإطلاق وتحديث المنصات الرقمية والهويات البصرية للعملاء.',
        ],
      },
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    },
  ];

  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.04] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.experience.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Exact 2-Container Side-by-Side Grid (1 col on mobile, 2 cols on desktop - No Awkward Looping Carousel) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {workExperiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="group relative rounded-3xl p-7 sm:p-8 bg-neutral-50 dark:bg-[#0a0a0c] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury hover:border-[#6B8E23]/60 hover:shadow-[0_15px_35px_rgba(107,142,35,0.18)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Olive Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6B8E23]/50 to-transparent group-hover:via-[#70A83B] transition-colors rounded-t-3xl" />

              <div className="space-y-5">
                {/* Header Strip: Badge & Period */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B8E23]/10 text-[#70A83B] border border-[#6B8E23]/40 font-bold uppercase text-[10px] tracking-wide">
                    <Briefcase className="w-3.5 h-3.5 text-[#70A83B]" />
                    <span>{exp.badge[language] || exp.badge.en}</span>
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#70A83B]" />
                    <span>{exp.period[language] || exp.period.en}</span>
                  </span>
                </div>

                {/* Main Identity: Official Corporate Logo + Role & Organization */}
                <div className="flex items-start gap-4 pt-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#6B8E23]/50 transition-colors">
                    <img
                      src={exp.logo}
                      alt={exp.company[language] || exp.company.en}
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-neutral-300/50 dark:border-white/[0.06]">
                      Stage 0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-orbitron text-neutral-950 dark:text-white group-hover:text-[#70A83B] transition-colors leading-tight">
                      {exp.role[language] || exp.role.en}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#6B8E23] dark:text-[#70A83B] flex items-center gap-1.5 pt-0.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{exp.company[language] || exp.company.en}</span>
                      <span className="text-neutral-400 dark:text-neutral-600">•</span>
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-normal text-neutral-600 dark:text-neutral-400">{exp.location}</span>
                    </p>
                  </div>
                </div>

                {/* Key Engineered Solutions / Bullets */}
                <ul className="space-y-2.5 pt-2">
                  {(exp.bullets[language] || exp.bullets.en).map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#70A83B] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Badges Strip */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] flex flex-wrap gap-2">
                {exp.techStack.map((tech, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-xl text-xs font-mono bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 shadow-2xs group-hover:border-[#6B8E23]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
