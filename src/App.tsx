import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TerminalPlayground } from './components/TerminalPlayground';
import { JourneySection } from './components/JourneySection';
import { ContactFooter } from './components/ContactFooter';
import { CursorTrail } from './components/CursorTrail';

export function App() {
  const [theme, setTheme] = useState<'classic' | 'cyber'>('classic');

  // Ensure refresh starts at top unless a specific hash anchor was requested
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'classic' ? 'cyber' : 'classic'));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
      } transition-colors duration-500 flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-x-clip w-full scroll-smooth`}
    >
      {/* Interactive Cursor Trail matching neon volt & electric blue theme */}
      <CursorTrail />

      {/* Background Grid Pattern for the top Hero area */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 h-[1100px]"></div>

      <Navbar theme={theme} />
      <main className="flex-1 flex flex-col w-full relative z-10">
        <HeroSection />
        <ProfileSection />
        <ProjectsSection theme={theme} />
        <TerminalPlayground theme={theme} onToggleTheme={toggleTheme} />
        <JourneySection />
      </main>
      <ContactFooter theme={theme} />
    </div>
  );
}

export default App;
