import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [activeStation, setActiveStation] = useState<string>('m2-ai');

  // Interactive Engineering Career Circuit Milestones (Subway Roadmap)
  const circuitStations = [
    {
      id: 'bts-dsi',
      stationIndex: '01',
      code: 'STATION_01 // FOUNDATION',
      level: 'BTS DSI',
      degree: data.academics[2]?.degree[language] || "Higher Technician Certificate (BTS) – DSI (Développement des Systèmes d'Information)",
      institution: data.academics[2]?.institution[language] || 'Lycée Technique / Institut Maghreb Arabe, Oujda',
      location: 'Oujda, Morocco',
      period: '2022 – 2024',
      status: 'ACADEMICALLY VALIDATED',
      isActive: false,
      logo: '/assets/Certificats/BTS.png',
      badgeColor: 'border-neutral-400 text-neutral-300',
      modules: [
        'Software Engineering (UML/Merise)',
        'Relational Databases & SQL Optimization',
        'Web Application Development',
        'Object-Oriented Programming (OOP)',
        'Client-Server Architectures',
        'Data Structures & Algorithms',
      ],
      description: {
        en: 'Two-year rigorous technical foundation in full-stack software development, software engineering methodologies, database design, and object-oriented systems modeling.',
        fr: 'Formation technique intensive de deux ans en développement logiciel full-stack, méthodes de génie logiciel, conception de bases de données et modélisation orientée objet.',
        ar: 'تكوين تقني مكثف لمدة سنتين في تطوير البرمجيات الشاملة، ومناهج هندسة النظم، وتصميم قواعد البيانات، والبرمجة كائنية التوجه.',
      },
    },
    {
      id: 'bachelor-ai',
      stationIndex: '02',
      code: 'STATION_02 // SPECIALIZATION',
      level: 'LICENCE D’EXCELLENCE',
      degree: data.academics[1]?.degree[language] || 'Bachelor of Excellence in Artificial Intelligence (Licence d’Excellence)',
      institution: data.academics[1]?.institution[language] || "Faculty of Sciences Ben M'Sik (FSBM) – Hassan II University, Casablanca",
      location: 'Casablanca, Morocco',
      period: '2024 – 2025',
      status: 'COMPLETED WITH HONORS',
      isActive: false,
      logo: '/assets/Certificats/FSBM.png',
      badgeColor: 'border-[#70A83B]/60 text-[#70A83B]',
      modules: [
        'Deep Learning Architectures & CNNs',
        'Star Schema & Data Warehousing',
        'Mathematical Optimization & Numerical Analysis',
        'Statistical Modeling & Probabilities',
        'Advanced Algorithms & Data Mining',
        'Explainable AI Foundations',
      ],
      description: {
        en: 'Deep neural networks formulation, convolutional vision models, mathematical foundations of optimization, statistical modeling, and relational data warehousing.',
        fr: 'Formulation des réseaux neuronaux profonds, modèles convolutifs de vision, fondements mathématiques de l’optimisation et entrepôts de données relationnelles.',
        ar: 'صياغة الشبكات العصبونية العميقة، ونماذج الرؤية الالتفافية، والأسس الرياضية للاستمثال، والنمذجة الإحصائية، وهندسة مستودعات البيانات.',
      },
    },
    {
      id: 'm2-ai',
      stationIndex: '03',
      code: 'STATION_03 // APEX',
      level: 'MASTER D’EXCELLENCE (M2)',
      degree: data.academics[0]?.degree[language] || 'Master of Excellence in Artificial Intelligence (M2)',
      institution: data.academics[0]?.institution[language] || "Faculty of Sciences Ben M'Sik (FSBM) – Hassan II University, Casablanca",
      location: 'Casablanca, Morocco',
      period: '2025 – 2027',
      status: 'CURRENT STATION // IN PROGRESS',
      isActive: true,
      logo: '/assets/Certificats/FSBM.png',
      badgeColor: 'border-[#70A83B] text-[#70A83B]',
      modules: [
        'Machine Learning in Production',
        'MLOps Pipelines & Automated CI/CD',
        'Systèmes Distribués & Big Data (Spark/Hadoop)',
        'Agentic AI Workflows & Generative LLMs',
        'Convex Optimization & Metaheuristics',
        'Medical Computer Vision & Grad-CAM',
      ],
      description: {
        en: 'Apex degree specializing in production-grade machine learning systems, automated MLOps CI/CD pipelines, distributed big data architectures, and large-scale generative agentic AI.',
        fr: 'Diplôme d’excellence spécialisé dans les systèmes d’apprentissage automatique de production, les pipelines MLOps CI/CD, les architectures big data distribuées et l’IA générative agentique.',
        ar: 'قمة المسار الأكاديمي المتخصص في هندسة أنظمة تعلم الآلة للإنتاج، وخطوط MLOps المؤتمتة، ومعمارية البيانات الضخمة الموزعة، والأنظمة التوليدية الذكية.',
      },
    },
  ];

  return (
    <section id="education" className="relative py-24 z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6B8E23]/[0.05] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
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

        {/* Career Circuit / Subway Roadmap Layout */}
        <div className="relative">
          {/* Glowing Vertical Circuit Busbar Line (Desktop & Tablet) */}
          <div className="hidden md:block absolute left-10 sm:left-14 top-6 bottom-10 w-[3px] bg-neutral-200 dark:bg-neutral-800 rounded-full">
            {/* Luminous Olive Signal Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#6B8E23] via-[#70A83B] to-[#70A83B] shadow-[0_0_12px_rgba(112,168,59,0.7)]" />
            
            {/* Animated Pulse Beam traveling down the busbar wire */}
            <div 
              className="absolute left-[-1.5px] w-[6px] h-28 bg-gradient-to-b from-transparent via-white to-transparent blur-[0.5px] animate-pulse pointer-events-none"
              style={{
                animationDuration: '3s',
              }}
            />
          </div>

          {/* Stations Vertical Sequence */}
          <div className="space-y-10 sm:space-y-12">
            {circuitStations.map((station, index) => {
              const isSelected = activeStation === station.id;

              return (
                <div
                  key={station.id}
                  onMouseEnter={() => setActiveStation(station.id)}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
                >
                  {/* Left Station Node Indicator */}
                  <div className="md:col-span-2 flex items-center md:flex-col md:items-start gap-4">
                    {/* Node Junction Box */}
                    <div className="relative z-20 flex items-center gap-3">
                      <div 
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-orbitron font-black text-sm tracking-wider transition-all duration-300 ${
                          station.isActive || isSelected
                            ? 'bg-neutral-950 text-white border-2 border-[#70A83B] shadow-[0_0_25px_rgba(112,168,59,0.55)] scale-105'
                            : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/10 group-hover:border-[#6B8E23]'
                        }`}
                      >
                        {station.isActive ? (
                          <div className="relative flex items-center justify-center">
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#70A83B] animate-ping" />
                            <Zap className="w-5 h-5 text-[#70A83B]" />
                          </div>
                        ) : (
                          <span>{station.stationIndex}</span>
                        )}
                      </div>

                      {/* Connecting Horizontal Circuit Trace to Card */}
                      <div className="hidden md:block w-8 sm:w-12 h-[2px] bg-gradient-to-r from-[#70A83B] to-[#70A83B]/30 shadow-[0_0_8px_rgba(112,168,59,0.5)]" />
                    </div>

                    {/* Circuit Telemetry Pill */}
                    <div className="hidden md:block space-y-1 pl-1">
                      <div className="text-[10px] font-mono text-[#70A83B] font-bold">
                        {station.code}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-500">
                        {station.period}
                      </div>
                    </div>
                  </div>

                  {/* Right Station Terminal Card */}
                  <div className="md:col-span-10">
                    <div 
                      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                        station.isActive || isSelected
                          ? 'bg-neutral-50/90 dark:bg-[#08080a] border border-[#70A83B]/60 shadow-[0_15px_40px_rgba(112,168,59,0.2)] -translate-y-1'
                          : 'bg-neutral-50/70 dark:bg-[#0a0a0c]/80 border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-luxury hover:border-[#6B8E23]/50'
                      }`}
                    >
                      {/* Top Circuit Accent Bar */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300 ${
                          station.isActive || isSelected
                            ? 'bg-gradient-to-r from-[#70A83B] via-[#6B8E23] to-[#70A83B]'
                            : 'bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/10 to-transparent'
                        }`} 
                      />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Emblem & Station Meta */}
                        <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#70A83B]/50 transition-colors">
                            <img
                              src={station.logo}
                              alt={station.institution}
                              className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                              loading="lazy"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/40">
                              <Award className="w-3 h-3" />
                              <span>{station.level}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                              <Calendar className="w-3.5 h-3.5 text-[#70A83B]" />
                              <span className="font-semibold">{station.period}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{station.location}</span>
                            </div>

                            <div className="pt-1">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                station.isActive
                                  ? 'bg-[#70A83B]/20 text-[#70A83B] border border-[#70A83B]/40'
                                  : 'bg-neutral-200 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400'
                              }`}>
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                {station.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Station Details */}
                        <div className="lg:col-span-9 space-y-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="text-xl sm:text-2xl font-black font-orbitron text-neutral-950 dark:text-white group-hover:text-[#70A83B] transition-colors">
                                {station.degree}
                              </h3>
                              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-200 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/10">
                                CIRCUIT NODE 0{index + 1}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base font-semibold text-[#6B8E23] dark:text-[#70A83B]">
                              {station.institution}
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                            {station.description[language] || station.description.en}
                          </p>

                          {/* Circuit Curriculum Modules Micro-Chips */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                              <BookOpen className="w-3.5 h-3.5 text-[#70A83B]" />
                              <span>{t.education.curriculum}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {station.modules.map(mod => (
                                <span
                                  key={mod}
                                  className="px-3 py-1 rounded-xl text-xs font-mono bg-white dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-white/10 hover:border-[#70A83B]/60 hover:text-[#70A83B] transition-colors shadow-2xs"
                                >
                                  {mod}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
