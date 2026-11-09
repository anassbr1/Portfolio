import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import type { Language } from '../../types/portfolio';

export const Navbar: React.FC = () => {
  const { t, data, language, setLanguage, theme, toggleTheme } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#education', label: t.nav.education },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#certificates', label: t.nav.certificates },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200 dark:border-white/[0.08] shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Strictly Anass Bouras (clean, elegant typography, no side tags or emblems) */}
        <a href="#hero" className="flex items-center group py-1">
          <span className="font-orbitron font-bold text-base sm:text-lg tracking-wide text-neutral-900 dark:text-white group-hover:text-[#70A83B] transition-colors">
            {data.personal.name[language] || data.personal.name.en}
          </span>
        </a>

        {/* Center: Minimalist Anchor Links */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-100/90 dark:bg-white/[0.03] border border-neutral-300/80 dark:border-white/[0.08] backdrop-blur-md shadow-2xs">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors group tracking-wide"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-[#6B8E23] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Controls: Lang Switcher + Theme Toggle + Sleek Contact Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Trilingual Switcher (EN | FR | AR) */}
          <div className="flex items-center p-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-white/[0.08] shadow-2xs">
            {languages.map(item => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                  language === item.code
                    ? 'bg-[#6B8E23] text-white shadow-[0_0_10px_rgba(107,142,35,0.4)]'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Clean Robust Dark/Light Toggle */}
          <button
            onClick={e => toggleTheme(e)}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-white/[0.08] hover:border-[#6B8E23]/60 text-neutral-700 dark:text-neutral-300 hover:text-[#70A83B] transition-colors shadow-2xs"
            aria-label="Toggle Theme Mode"
            title="Switch Dark/Light Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#556B2F]" />
            )}
          </button>

          {/* Sleek, Styled Contact Trigger */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
          >
            <span>{t.nav.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={e => toggleTheme(e)}
            className="p-2 rounded-lg border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#556B2F]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-b border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-2xl">
          <div className="flex flex-col space-y-2 text-xs">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-neutral-200 dark:border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-1">
                {languages.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      language === item.code
                        ? 'bg-[#6B8E23] text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#6B8E23] text-white text-xs font-semibold"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
