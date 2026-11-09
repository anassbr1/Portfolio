import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  // Curated Academic Milestones with precise modules & official logos
  const academicMilestones = [
    {
      id: 'm2-ai',
      level: 'MASTER 2 (M2)',
      degree: data.academics[0]?.degree[language] || 'Master of Excellence in Artificial Intelligence (M2)',
      institution: data.academics[0]?.institution[language] || "Faculty of Sciences Ben M'Sik (FSBM) – Hassan II University, Casablanca",
      location: 'Casablanca, Morocco',
      period: '2025 – 2027',
      status: 'Current Program',
      logo: '/assets/Certificats/FSBM.png',
      modules: [
        'Machine Learning',
        'MLOps & DataOps',
        'Systèmes Distribués & Big Data',
        'Optimisation',
        'Generative AI & LLMs',
        'Computer Vision',
      ],
      description: {
        en: 'Advanced specialization in production machine learning, automated MLOps pipelines, distributed big data architectures, and large-scale generative models.',
        fr: 'Spécialisation avancée en machine learning de production, pipelines MLOps automatisés, architectures big data distribuées et modèles génératifs à grande échelle.',
        ar: 'تخصص متقدم في تعلم الآلة الإنتاجي، وأتمتة خطوط تدفق MLOps، ومعمارية البيانات الضخمة الموزعة، والأنظمة التوليدية واسعة النطاق.',
      },
    },
    {
      id: 'bachelor-ai',
      level: 'BACHELOR (L3)',
      degree: data.academics[1]?.degree[language] || 'Bachelor of Excellence in Artificial Intelligence (L3)',
      institution: data.academics[1]?.institution[language] || "Faculty of Sciences Ben M'Sik (FSBM) – Hassan II University, Casablanca",
      location: 'Casablanca, Morocco',
      period: '2024 – 2025',
      status: 'Completed with Honors',
      logo: '/assets/Certificats/FSBM.png',
      modules: [
        'Deep Learning',
        'Algorithmique Avancée',
        'Probabilités & Statistiques',
        'Analyse Numérique',
        'Bases de Données Avancées',
        'Data Mining',
      ],
      description: {
        en: 'Deep neural networks formulation, convolutional vision models, mathematical foundations of optimization, statistical modeling, and relational data warehousing.',
        fr: 'Formulation des réseaux neuronaux profonds, modèles convolutifs de vision, fondements mathématiques de l’optimisation et entrepôts de données relationnelles.',
        ar: 'صياغة الشبكات العصبونية العميقة، ونماذج الرؤية الالتفافية، والأسس الرياضية للاستمثال، والنمذجة الإحصائية، وهندسة مستودعات البيانات.',
      },
    },
    {
      id: 'bts-dsi',
      level: 'BTS DSI',
      degree: data.academics[2]?.degree[language] || "Higher Technician Certificate (BTS) – DSI (Développement des Systèmes d'Information)",
      institution: data.academics[2]?.institution[language] || 'Lycée Technique Oujda',
      location: 'Oujda, Morocco',
      period: '2022 – 2024',
      status: 'Graduated',
      logo: '/assets/Certificats/BTS.png',
      modules: [
        'Full-Stack Development',
        'Distributed Systems',
        'Software Engineering & Modeling (UML, Merise)',
        'SQL / NoSQL Databases',
        'Client-Server Architecture',
        'OOP & Data Structures',
      ],
      description: {
        en: 'Two-year rigorous technical foundation in full-stack software development, software engineering methodologies, database design, and object-oriented systems modeling.',
        fr: 'Formation technique intensive de deux ans en développement logiciel full-stack, méthodes de génie logiciel, conception de bases de données et modélisation orientée objet.',
        ar: 'تكوين تقني مكثف لمدة سنتين في تطوير البرمجيات الشاملة، ومناهج هندسة النظم، وتصميم قواعد البيانات، والبرمجة كائنية التوجه.',
      },
    },
  ];

  return (
    <section id="education" className="relative py-20 z-10">
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-[#6B8E23]/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.04] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.education.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.education.subtitle}
          </p>
        </div>

        {/* Education Timeline Cards Stack */}
        <div className="space-y-6">
          {academicMilestones.map((edu, idx) => (
            <div
              key={edu.id}
              className="group relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-[#0a0a0c] border border-neutral-200 dark:border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-[#6B8E23]/60 hover:shadow-[0_10px_35px_rgba(107,142,35,0.15)] shadow-sm dark:shadow-none"
            >
              {/* Top Accent Olive Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6B8E23]/50 to-transparent group-hover:via-[#70A83B] transition-colors" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Emblem & Quick Badge */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#6B8E23]/50 transition-colors">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/30">
                      <Award className="w-3 h-3" />
                      <span>{edu.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-3.5 h-3.5 text-[#6B8E23]" />
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Details: Degree Title, Institution, Description & Modules */}
                <div className="lg:col-span-9 space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black font-orbitron text-neutral-950 dark:text-white group-hover:text-[#70A83B] transition-colors">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-200/60 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-neutral-300/50 dark:border-white/[0.06]">
                        Milestone 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-[#6B8E23] dark:text-[#70A83B]">
                      {edu.institution}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                    {edu.description[language] || edu.description.en}
                  </p>

                  {/* Modules Pills */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-[#6B8E23]" />
                      <span>{t.education.curriculum}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.modules.map(mod => (
                        <span
                          key={mod}
                          className="px-3 py-1 rounded-xl text-xs font-mono bg-white dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-white/10 hover:border-[#6B8E23]/60 transition-colors shadow-2xs"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
