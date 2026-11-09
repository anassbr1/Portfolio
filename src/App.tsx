import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PortfolioProvider } from './context/PortfolioContext';
import { Preloader } from './components/loader/Preloader';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutMeSection } from './components/sections/AboutMeSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsMatrixSection } from './components/sections/SkillsMatrixSection';
import { ProjectsHubSection } from './components/sections/ProjectsHubSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { QuickInfoDrawer } from './components/common/QuickInfoDrawer';
import { CursorSpotlight } from './components/common/CursorSpotlight';
import { AdminDashboard } from './components/admin/AdminDashboard';

gsap.registerPlugin(ScrollTrigger);

const PublicPortfolio: React.FC = () => {
  // Preloader State: Automatically triggers on every page load / refresh
  const [showPreloader, setShowPreloader] = useState<boolean>(true);

  // Global Lenis Smooth Inertial Scroll linked directly with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <>
      {/* 5-Second Liquid ANBO Preloader Sequence */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Pure Black Foundation in Dark Mode / Pure White in Light Mode */}
      <div className="relative min-h-screen bg-white dark:bg-[#000000] text-neutral-900 dark:text-[#F8FAFC] selection:bg-[#6B8E23]/30 selection:text-white overflow-x-hidden transition-colors duration-300">
        {/* Fluid Olive Mouse-Following Spotlight */}
        <CursorSpotlight />

        {/* Main Section-by-Section Narrative Structure */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Clean Professional Header */}
          <Navbar />

          <main className="flex-1">
            {/* 1. Hero Section: Bio + Typewriter Titles + Refined Portrait */}
            <HeroSection />

            {/* 2. About Me: Philosophy + Ethos */}
            <AboutMeSection />

            {/* 3. Dedicated Academic Qualifications & Milestones */}
            <EducationSection />

            {/* 4. Interactive Skills & Technologies Bento Grid */}
            <SkillsMatrixSection />

            {/* 5. Full-Career Projects Portfolio (Auto-Spinning Infinite Loop) */}
            <ProjectsHubSection />

            {/* 6. Verified Certifications & Credentials Carousel (Auto-Slide + Lightbox) */}
            <CertificatesSection />

            {/* 7. Professional Experience & Internships Carousel (Auto-Advancing Horizontal Track) */}
            <ExperienceSection />

            {/* 8. Direct Contact Hub */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Collapsible Profile Quick-View Slide-Out Drawer */}
        <QuickInfoDrawer />
      </div>
    </>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Separate Password-Protected Admin CMS Page */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/system-terminal-core" element={<AdminDashboard />} />
          <Route path="/admin-portal" element={<AdminDashboard />} />

          {/* Catch-all redirect to public view */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
