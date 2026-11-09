import React from 'react';
import {
  SiPytorch,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiFastapi,
  SiGithubactions,
  SiPython,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGit,
  SiJupyter,
  SiOpencv,
  SiJira,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPhp,
  SiWordpress,
  SiSolidity,
  SiLinux,
} from 'react-icons/si';
import { Cpu, Database, Activity, Code, Layers, FileSpreadsheet, BarChart3 } from 'lucide-react';

interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const getTechBrand = (techName: string) => {
  const norm = techName.toLowerCase().trim();

  if (norm.includes('pytorch') || norm.includes('torch')) {
    return { icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch' };
  }
  if (norm.includes('docker')) {
    return { icon: SiDocker, color: '#2496ED', name: 'Docker' };
  }
  if (norm.includes('postgres')) {
    return { icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' };
  }
  if (norm.includes('mysql')) {
    return { icon: SiMysql, color: '#00758F', name: 'MySQL' };
  }
  if (norm.includes('fastapi')) {
    return { icon: SiFastapi, color: '#009688', name: 'FastAPI' };
  }
  if (norm.includes('github action') || norm.includes('ci/cd') || norm.includes('actions')) {
    return { icon: SiGithubactions, color: '#2088FF', name: 'GitHub Actions' };
  }
  if (norm.includes('python')) {
    return { icon: SiPython, color: '#3776AB', name: 'Python' };
  }
  if (norm.includes('scikit') || norm.includes('sklearn')) {
    return { icon: SiScikitlearn, color: '#F7931E', name: 'Scikit-Learn' };
  }
  if (norm.includes('pandas')) {
    return { icon: SiPandas, color: '#150458', name: 'Pandas' };
  }
  if (norm.includes('numpy')) {
    return { icon: SiNumpy, color: '#013243', name: 'NumPy' };
  }
  if (norm.includes('git')) {
    return { icon: SiGit, color: '#F05032', name: 'Git' };
  }
  if (norm.includes('jupyter') || norm.includes('notebook')) {
    return { icon: SiJupyter, color: '#F37626', name: 'Jupyter' };
  }
  if (norm.includes('opencv') || norm.includes('vision') || norm.includes('grad-cam')) {
    return { icon: SiOpencv, color: '#5C3EE8', name: 'Computer Vision' };
  }
  if (norm.includes('power bi') || norm.includes('powerbi')) {
    return { icon: BarChart3, color: '#F2C811', name: 'Power BI' };
  }
  if (norm.includes('tableau')) {
    return { icon: Activity, color: '#E97627', name: 'Tableau' };
  }
  if (norm.includes('excel')) {
    return { icon: FileSpreadsheet, color: '#217346', name: 'Excel' };
  }
  if (norm.includes('jira')) {
    return { icon: SiJira, color: '#0052CC', name: 'Jira' };
  }
  if (norm.includes('javascript') || norm.includes('js')) {
    return { icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' };
  }
  if (norm.includes('html')) {
    return { icon: SiHtml5, color: '#E34F26', name: 'HTML5' };
  }
  if (norm.includes('css')) {
    return { icon: SiCss, color: '#1572B6', name: 'CSS3' };
  }
  if (norm.includes('php')) {
    return { icon: SiPhp, color: '#777BB4', name: 'PHP' };
  }
  if (norm.includes('wordpress')) {
    return { icon: SiWordpress, color: '#21759B', name: 'WordPress' };
  }
  if (norm.includes('solidity') || norm.includes('blockchain') || norm.includes('web3')) {
    return { icon: SiSolidity, color: '#627EEA', name: 'Solidity / Web3' };
  }
  if (norm.includes('linux')) {
    return { icon: SiLinux, color: '#FCC624', name: 'Linux' };
  }
  if (norm.includes('sql')) {
    return { icon: Database, color: '#38BDF8', name: 'SQL' };
  }
  if (norm.includes('cnn') || norm.includes('neural') || norm.includes('ml')) {
    return { icon: Cpu, color: '#818CF8', name: techName };
  }
  if (norm.includes('etl') || norm.includes('pipeline') || norm.includes('mlops')) {
    return { icon: Layers, color: '#38BDF8', name: techName };
  }

  return { icon: Code, color: '#94A3B8', name: techName };
};

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const brand = getTechBrand(name);
  const IconComponent = brand.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3 py-1.5 gap-2',
    lg: 'text-sm px-4 py-2 gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-900/[0.04] border border-white/10 dark:border-white/10 light:border-slate-900/10 text-slate-200 dark:text-slate-200 light:text-slate-800 backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 select-none ${sizeClasses[size]} ${className}`}
    >
      <IconComponent
        className={`${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
        style={{ color: brand.color }}
      />
      {showLabel && <span>{name}</span>}
    </span>
  );
};
