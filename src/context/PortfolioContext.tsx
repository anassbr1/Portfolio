import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import type { 
  Language, 
  Theme, 
  PortfolioData, 
  EntryCategory, 
  ProjectItem, 
  ExperienceItem, 
  CertificationItem
} from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolioData';
import { getTranslation, translations } from '../i18n/translations';
import { playSnapSound, playSuccessChime } from '../utils/audioFx';

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  t: typeof translations['en'];
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  // CRUD operations
  addEntry: (category: EntryCategory, item: Record<string, unknown>) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  addCertification: (cert: CertificationItem) => void;
  deleteCertification: (id: string) => void;
  addExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  resetData: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  // Audio FX
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const STORAGE_KEY = 'anass_bouras_portfolio_v4_clean';
const THEME_KEY = 'anass_theme';
const LANG_KEY = 'anass_lang';
const SOUND_KEY = 'anass_sound';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state (default pure solid black #000000)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_KEY) as Theme;
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    }
    return 'dark';
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_KEY) as Language;
      if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
    }
    return 'en';
  });

  // Sound FX state
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SOUND_KEY);
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Portfolio data state backed by localStorage
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...initialPortfolioData,
            ...parsed,
          };
        }
      } catch (err) {
        console.error('Failed reading local storage data', err);
      }
    }
    return initialPortfolioData;
  });

  // Persist data updates
  const saveToStorage = (updated: PortfolioData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  };

  // Synchronize document theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Synchronize language and text direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
    if (isSoundEnabled) playSnapSound();
  };

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    if (language === 'ar') {
      root.dir = 'rtl';
      root.classList.add('font-arabic');
    } else {
      root.dir = 'ltr';
      root.classList.remove('font-arabic');
    }
  }, [language]);

  // Dynamic Dual Theme & Expanding Radial Light Effect (Reference: Eclairage.mp4)
  const toggleTheme = (e?: React.MouseEvent) => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    
    // Capture click coordinates or use center of screen
    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;

    if (e && e.clientX && e.clientY) {
      clickX = e.clientX;
      clickY = e.clientY;
    }

    // Create GPU-accelerated transition lens overlay element
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-mask';
    overlay.style.backgroundColor = newTheme === 'light' ? '#ffffff' : '#000000';
    overlay.style.clipPath = `circle(0% at ${clickX}px ${clickY}px)`;
    (overlay.style as any).webkitClipPath = `circle(0% at ${clickX}px ${clickY}px)`;
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      clipPath: `circle(150% at ${clickX}px ${clickY}px)`,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        setTheme(newTheme);
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.35,
          onComplete: () => {
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
          },
        });
      },
    });

    if (isSoundEnabled) playSnapSound();
  };

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem(SOUND_KEY, String(next));
      if (next) playSuccessChime();
      return next;
    });
  };

  // CRUD Operations
  const updateProject = (project: ProjectItem) => {
    setData(prev => {
      const updatedList = prev.flagshipProjects.map(p => p.id === project.id ? project : p);
      const updated: PortfolioData = { ...prev, flagshipProjects: updatedList };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSuccessChime();
  };

  const deleteProject = (id: string) => {
    setData(prev => {
      const updatedList = prev.flagshipProjects.filter(p => p.id !== id);
      const updated: PortfolioData = { ...prev, flagshipProjects: updatedList };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSnapSound();
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setData(prev => {
      const result = Array.from(prev.flagshipProjects);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      const updated: PortfolioData = { ...prev, flagshipProjects: result };
      saveToStorage(updated);
      return updated;
    });
  };

  const addCertification = (cert: CertificationItem) => {
    setData(prev => {
      const updated: PortfolioData = {
        ...prev,
        certifications: [cert, ...prev.certifications],
      };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSuccessChime();
  };

  const deleteCertification = (id: string) => {
    setData(prev => {
      const updated: PortfolioData = {
        ...prev,
        certifications: prev.certifications.filter(c => c.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSnapSound();
  };

  const addExperience = (exp: ExperienceItem) => {
    setData(prev => {
      const updated: PortfolioData = {
        ...prev,
        experience: [exp, ...prev.experience],
      };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSuccessChime();
  };

  const deleteExperience = (id: string) => {
    setData(prev => {
      const updated: PortfolioData = {
        ...prev,
        experience: prev.experience.filter(e => e.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
    if (isSoundEnabled) playSnapSound();
  };

  const addEntry = (category: EntryCategory, item: Record<string, unknown>) => {
    setData(prev => {
      let updated: PortfolioData = { ...prev };
      const id = `custom-${Date.now()}`;

      if (category === 'project') {
        const newProj: ProjectItem = {
          id,
          tier: (item.tier as 1 | 2) || 1,
          title: (item.title as string) || 'New AI Project',
          subtitle: (item.subtitle as string) || 'ML Pipeline & Architecture',
          description: {
            en: (item.description as string) || '',
            fr: (item.description as string) || '',
            ar: (item.description as string) || '',
          },
          techStack: Array.isArray(item.techStack)
            ? (item.techStack as string[])
            : String(item.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
          repoUrl: (item.repoUrl as string) || undefined,
          demoUrl: (item.demoUrl as string) || undefined,
          image: (item.image as string) || undefined,
          category: (item.category as ProjectItem['category']) || 'ml',
          status: 'DEPLOYED',
          coordinates: `CAD-USER-${Math.floor(Math.random() * 99)}`,
          metrics: [
            { label: { en: 'Performance', fr: 'Performance', ar: 'الأداء' }, value: 'Optimized' },
            { label: { en: 'Inference', fr: 'Inférence', ar: 'الاستجابة' }, value: 'Real-Time' },
          ],
        };

        updated = {
          ...prev,
          flagshipProjects: [newProj, ...prev.flagshipProjects],
        };
      } else if (category === 'experience') {
        const newExp: ExperienceItem = {
          id,
          role: {
            en: (item.title as string) || 'AI Engineer',
            fr: (item.title as string) || 'Ingénieur IA',
            ar: (item.title as string) || 'مهندس ذكاء اصطناعي',
          },
          company: {
            en: (item.subtitle as string) || 'Enterprise',
            fr: (item.subtitle as string) || 'Entreprise',
            ar: (item.subtitle as string) || 'مؤسسة',
          },
          location: {
            en: (item.location as string) || 'Casablanca, Morocco',
            fr: (item.location as string) || 'Casablanca, Maroc',
            ar: (item.location as string) || 'الدار البيضاء، المغرب',
          },
          period: (item.dateRange as string) || '2026',
          type: 'fulltime',
          bullets: {
            en: [(item.description as string) || 'Production pipeline engineering and model deployment.'],
            fr: [(item.description as string) || 'Ingénierie des pipelines de production et déploiement.'],
            ar: [(item.description as string) || 'هندسة خطوط معالجة الإنتاج ونشر النماذج.'],
          },
          techStack: Array.isArray(item.techStack)
            ? (item.techStack as string[])
            : String(item.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
        };
        updated = {
          ...prev,
          experience: [newExp, ...prev.experience],
        };
      } else if (category === 'certification') {
        const newCert: CertificationItem = {
          id,
          name: {
            en: (item.title as string) || 'Verified Certification',
            fr: (item.title as string) || 'Certification Validée',
            ar: (item.title as string) || 'شهادة معتمدة',
          },
          issuer: (item.subtitle as string) || 'Accredited Body',
          year: (item.dateRange as string) || '2026',
          badgeCode: `CERT-${Date.now().toString().slice(-6)}`,
          credentialUrl: (item.credentialUrl as string) || undefined,
        };
        updated = {
          ...prev,
          certifications: [newCert, ...prev.certifications],
        };
      }

      saveToStorage(updated);
      return updated;
    });

    if (isSoundEnabled) playSuccessChime();
  };

  const resetData = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    if (isSoundEnabled) playSnapSound();
  };

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personal && parsed.flagshipProjects) {
        setData(parsed);
        saveToStorage(parsed);
        if (isSoundEnabled) playSuccessChime();
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON format", e);
    }
    return false;
  };

  const t = getTranslation(language);

  return (
    <PortfolioContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        data,
        setData,
        addEntry,
        updateProject,
        deleteProject,
        reorderProjects,
        addCertification,
        deleteCertification,
        addExperience,
        deleteExperience,
        resetData,
        exportJson,
        importJson,
        isSoundEnabled,
        toggleSound,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
