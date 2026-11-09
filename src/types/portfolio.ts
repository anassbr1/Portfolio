export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'dark' | 'light';

export type EntryCategory = 'project' | 'experience' | 'skill' | 'certification';

export interface ProjectItem {
  id: string;
  tier: 1 | 2;
  title: string;
  subtitle: string;
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  metrics?: {
    label: { en: string; fr: string; ar: string };
    value: string;
  }[];
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  featured?: boolean;
  category: 'ml' | 'mlops' | 'distributed' | 'data_eng' | 'web';
  status: 'DEPLOYED' | 'PRODUCTION' | 'VALIDATED' | 'RESEARCH' | 'ARCHIVED';
  coordinates?: string;
}

export interface ExperienceItem {
  id: string;
  role: {
    en: string;
    fr: string;
    ar: string;
  };
  company: {
    en: string;
    fr: string;
    ar: string;
  };
  location: {
    en: string;
    fr: string;
    ar: string;
  };
  period: string;
  bullets: {
    en: string[];
    fr: string[];
    ar: string[];
  };
  techStack: string[];
  type: 'internship' | 'fulltime' | 'freelance';
}

export interface AcademicItem {
  id: string;
  degree: {
    en: string;
    fr: string;
    ar: string;
  };
  institution: {
    en: string;
    fr: string;
    ar: string;
  };
  period: string;
  location: string;
  modules?: {
    en: string[];
    fr: string[];
    ar: string[];
  };
  emblem: string;
}

export interface SkillCategory {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  skills: {
    name: string;
    level: number; // 0 - 100
    icon?: string;
    isPrimary?: boolean;
  }[];
}

export interface CertificationItem {
  id: string;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  issuer: string;
  year: string;
  credentialUrl?: string;
  thumbnailUrl?: string;
  badgeCode: string;
}

export interface PortfolioData {
  personal: {
    name: {
      en: string;
      fr: string;
      ar: string;
    };
    title: {
      en: string;
      fr: string;
      ar: string;
    };
    bio: {
      en: string;
      fr: string;
      ar: string;
    };
    location: {
      en: string;
      fr: string;
      ar: string;
    };
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    cvUrl: string;
    portraitStand: string;
    portraitCrossed: string;
  };
  flagshipProjects: ProjectItem[];
  repositories: ProjectItem[];
  experience: ExperienceItem[];
  academics: AcademicItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
}
