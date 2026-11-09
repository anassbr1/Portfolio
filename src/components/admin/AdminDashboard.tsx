import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Lock,
  KeyRound,
  PlusCircle,
  Trash2,
  Edit3,
  MoveUp,
  MoveDown,
  Download,
  Upload,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Award,
  Cpu,
  Terminal,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectItem, ExperienceItem, CertificationItem } from '../../types/portfolio';

const ADMIN_SECRET = 'anass2026';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    updateProject,
    deleteProject,
    reorderProjects,
    addEntry,
    addCertification,
    deleteCertification,
    addExperience,
    deleteExperience,
    resetData,
    exportJson,
    importJson,
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('anass_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Active Admin Sub-View
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'certificates' | 'persistence'>('projects');

  // Editing Project Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectItem['category']>('ml');
  const [newTechStack, setNewTechStack] = useState('Python, PyTorch, Docker');
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [newDemoUrl, setNewDemoUrl] = useState('');

  // New Certification Form State
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('2026');
  const [certCode, setCertCode] = useState('');
  const [certUrl, setCertUrl] = useState('');

  // New Experience Form State
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expLocation, setExpLocation] = useState('Casablanca, Morocco');
  const [expPeriod, setExpPeriod] = useState('2026');
  const [expBullets, setExpBullets] = useState('');
  const [expTech, setExpTech] = useState('Python, Docker, SQL');

  // Import JSON input
  const [importJsonText, setImportJsonText] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  const triggerNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_SECRET) {
      setIsAuthenticated(true);
      sessionStorage.setItem('anass_admin_auth', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Access Denied: Invalid Security Cipher.');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('anass_admin_auth');
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addEntry('project', {
      title: newTitle,
      subtitle: newSubtitle || 'ML Architecture & Pipeline',
      description: newDescEn,
      category: newCategory,
      techStack: newTechStack.split(',').map(s => s.trim()).filter(Boolean),
      repoUrl: newRepoUrl || undefined,
      demoUrl: newDemoUrl || undefined,
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewDescEn('');
    setNewRepoUrl('');
    setNewDemoUrl('');
    triggerNotice('Project created and persisted to state!');
  };

  // Save Edited Project
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    updateProject(editingProject);
    setEditingProject(null);
    triggerNotice('Project updated successfully!');
  };

  // Add Certification
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;

    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: { en: certName, fr: certName, ar: certName },
      issuer: certIssuer || 'Accredited Body',
      year: certYear || '2026',
      badgeCode: certCode || `CERT-${Date.now().toString().slice(-6)}`,
      credentialUrl: certUrl || undefined,
    };

    addCertification(newCert);
    setCertName('');
    setCertIssuer('');
    setCertCode('');
    setCertUrl('');
    triggerNotice('Certificate attached and verified!');
  };

  // Add Experience
  const handleAddExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim()) return;

    const bulletList = expBullets.split('\n').map(s => s.trim()).filter(Boolean);

    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: { en: expRole, fr: expRole, ar: expRole },
      company: { en: expCompany, fr: expCompany, ar: expCompany },
      location: { en: expLocation, fr: expLocation, ar: expLocation },
      period: expPeriod,
      type: 'internship',
      bullets: {
        en: bulletList.length > 0 ? bulletList : ['Engineering core workflows and pipeline architecture.'],
        fr: bulletList.length > 0 ? bulletList : ['Ingénierie des processus et architectures de pipeline.'],
        ar: bulletList.length > 0 ? bulletList : ['هندسة خطوط العمليات ومعالجة البيانات.'],
      },
      techStack: expTech.split(',').map(s => s.trim()).filter(Boolean),
    };

    addExperience(newExp);
    setExpRole('');
    setExpCompany('');
    setExpBullets('');
    triggerNotice('Experience position recorded!');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importJson(importJsonText);
    if (ok) {
      setImportJsonText('');
      triggerNotice('portfolio.json successfully imported and applied!');
    } else {
      setErrorMsg('Invalid JSON structure. Ensure fields match PortfolioData.');
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#08080a] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#6B8E23]/15 border border-[#6B8E23]/40 flex items-center justify-center mx-auto text-[#70A83B]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold font-orbitron text-white">
              ADMIN CMS TERMINAL
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              Isolated Management Console for Anass Bouras Portfolio
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
              <input
                type="password"
                required
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="Enter Passkey (Default: anass2026)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#6B8E23] text-white text-xs outline-none font-mono placeholder:text-neutral-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white font-orbitron font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(107,142,35,0.4)]"
            >
              Authenticate Terminal
            </button>
          </form>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#6B8E23]/30 selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08080a]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Return to Site"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold text-sm text-white">
                ANASS BOURAS // ADMIN CMS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/30">
                AUTHORIZED
              </span>
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Live State Synchronized • Auto-Spinning Carousel Mirror
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white"
          >
            <Download className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-400"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Terminal</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Alert Banner */}
        {successNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-[#6B8E23]/20 border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#70A83B]" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-orbitron font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-[#6B8E23] text-white shadow-[0_0_20px_rgba(107,142,35,0.4)]'
                : 'bg-white/[0.03] text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Project Manager ({data.flagshipProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-orbitron font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-[#6B8E23] text-white shadow-[0_0_20px_rgba(107,142,35,0.4)]'
                : 'bg-white/[0.03] text-neutral-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience ({data.experience.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-orbitron font-semibold transition-all ${
              activeTab === 'certificates'
                ? 'bg-[#6B8E23] text-white shadow-[0_0_20px_rgba(107,142,35,0.4)]'
                : 'bg-white/[0.03] text-neutral-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications ({data.certifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('persistence')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-orbitron font-semibold transition-all ${
              activeTab === 'persistence'
                ? 'bg-[#6B8E23] text-white shadow-[0_0_20px_rgba(107,142,35,0.4)]'
                : 'bg-white/[0.03] text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Persistence & JSON Sync</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#70A83B]" />
                <span>Append New Project</span>
              </h3>

              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Project Title (e.g. Distributed LLM Serving)"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />

                <input
                  type="text"
                  placeholder="Subtitle (e.g. Real-Time Microservice)"
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />

                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                >
                  <option value="ml">Machine Learning & Deep Learning</option>
                  <option value="mlops">MLOps & Pipelines</option>
                  <option value="data_eng">Data Engineering & BI</option>
                  <option value="web">Full-Stack Web</option>
                  <option value="distributed">Distributed Systems</option>
                </select>

                <input
                  type="text"
                  placeholder="Tech Stack Badges (Comma-separated)"
                  value={newTechStack}
                  onChange={e => setNewTechStack(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />

                <input
                  type="url"
                  placeholder="GitHub Repository URL"
                  value={newRepoUrl}
                  onChange={e => setNewRepoUrl(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />

                <input
                  type="url"
                  placeholder="Live Demo URL"
                  value={newDemoUrl}
                  onChange={e => setNewDemoUrl(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />

                <div className="md:col-span-2">
                  <textarea
                    rows={2}
                    placeholder="Brief Project Description"
                    value={newDescEn}
                    onChange={e => setNewDescEn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23] resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-semibold uppercase tracking-wider transition-all"
                  >
                    + Append Project
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Projects List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-orbitron text-white">
                Active Projects Catalog ({data.flagshipProjects.length})
              </h3>

              {data.flagshipProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#70A83B]">
                      <span>#{idx + 1}</span>
                      <span className="uppercase">[{p.category}]</span>
                      <span className="text-neutral-500">//</span>
                      <span className="text-neutral-400">{p.subtitle}</span>
                    </div>
                    <h4 className="text-base font-bold font-orbitron text-white">
                      {p.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => reorderProjects(idx, idx - 1)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 disabled:opacity-30 text-neutral-300"
                      title="Move Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === data.flagshipProjects.length - 1}
                      onClick={() => reorderProjects(idx, idx + 1)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 disabled:opacity-30 text-neutral-300"
                      title="Move Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditingProject(p)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-amber-400"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteProject(p.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#70A83B]" />
                <span>Append Professional Experience</span>
              </h3>

              <form onSubmit={handleAddExp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Role Title (e.g. AI Engineer Intern)"
                  value={expRole}
                  onChange={e => setExpRole(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  required
                  placeholder="Organization / Company"
                  value={expCompany}
                  onChange={e => setExpCompany(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Casablanca, Morocco)"
                  value={expLocation}
                  onChange={e => setExpLocation(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  placeholder="Period (e.g. May 2024 – July 2024)"
                  value={expPeriod}
                  onChange={e => setExpPeriod(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Technologies Used (Comma-separated, e.g. PHP, MySQL, Git)"
                    value={expTech}
                    onChange={e => setExpTech(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    rows={3}
                    placeholder="Key Achievements / Bullets (One per line)"
                    value={expBullets}
                    onChange={e => setExpBullets(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23] resize-none"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-semibold uppercase tracking-wider"
                  >
                    + Append Experience
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {data.experience.map(exp => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-base font-bold font-orbitron text-white">
                      {exp.role.en} @ {exp.company.en}
                    </h4>
                    <p className="text-xs font-mono text-neutral-400">
                      {exp.period} • {exp.location.en}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATIONS */}
        {activeTab === 'certificates' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#70A83B]" />
                <span>Append Verified Certification</span>
              </h3>

              <form onSubmit={handleAddCert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Certificate Name"
                  value={certName}
                  onChange={e => setCertName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  placeholder="Issuing Authority"
                  value={certIssuer}
                  onChange={e => setCertIssuer(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  placeholder="Year / Period"
                  value={certYear}
                  onChange={e => setCertYear(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <input
                  type="text"
                  placeholder="Credential Verification Code"
                  value={certCode}
                  onChange={e => setCertCode(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                />
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Document Path or URL (e.g. /assets/Certificats/mycert.pdf)"
                    value={certUrl}
                    onChange={e => setCertUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-[#6B8E23]"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-semibold uppercase tracking-wider"
                  >
                    + Append Certification
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.certifications.map(c => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5 truncate">
                    <span className="text-[10px] font-mono text-[#70A83B] uppercase font-bold">
                      {c.badgeCode}
                    </span>
                    <h4 className="text-sm font-bold font-orbitron text-white truncate">
                      {c.name.en}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono truncate">{c.issuer}</p>
                  </div>
                  <button
                    onClick={() => deleteCertification(c.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 shrink-0"
                    title="Delete Certification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PERSISTENCE & JSON SYNC */}
        {activeTab === 'persistence' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
                <Save className="w-4 h-4 text-[#70A83B]" />
                <span>Export & Backup State</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Download the current active state of all 10 projects, 8 certificates, and career milestones as a production-ready <code className="text-[#70A83B]">portfolio.json</code> file.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={exportJson}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white font-orbitron font-semibold text-xs uppercase tracking-wider"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download portfolio.json</span>
                </button>

                <button
                  onClick={resetData}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#70A83B]" />
                <span>Import portfolio.json</span>
              </h3>
              <textarea
                rows={6}
                placeholder="Paste portfolio.json string here to import..."
                value={importJsonText}
                onChange={e => setImportJsonText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-neutral-200 outline-none focus:border-[#6B8E23] resize-none"
              />
              <button
                onClick={handleImportSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white font-orbitron font-semibold text-xs uppercase tracking-wider"
              >
                Apply & Import JSON
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#0a0a0c] border border-white/15 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-orbitron font-bold text-white text-sm">
                Edit Project: {editingProject.title}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg bg-white/[0.05] text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 font-mono block mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-[#6B8E23]"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={e => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-[#6B8E23]"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono block mb-1">English Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description.en}
                  onChange={e => setEditingProject({
                    ...editingProject,
                    description: { ...editingProject.description, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-[#6B8E23] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 font-mono block mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.repoUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-[#6B8E23]"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 font-mono block mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-[#6B8E23]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B8E23] text-white font-orbitron font-semibold uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
