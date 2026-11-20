import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TerminalPlayground } from './components/TerminalPlayground';
import { JourneySection } from './components/JourneySection';
import { ContactFooter } from './components/ContactFooter';
import { CursorTrail } from './components/CursorTrail';
import { playHoverSound, setSoundMuted, unlockAudioContext } from './lib/soundFx';

export function App() {
  const [theme, setTheme] = useState<'classic' | 'cyber'>('classic');
  const [isMuted, setIsMuted] = useState(false);

  // Ensure refresh starts at top unless a specific hash anchor was requested
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync mute state with soundFx module
  useEffect(() => {
    setSoundMuted(isMuted);
  }, [isMuted]);

  // Global delegated hover sound effect + audio unlock on first gesture
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let lastHoveredEl: Element | null = null;

    const handleUnlock = () => {
      unlockAudioContext();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], .hover-trigger') ?? null;

      if (interactive && interactive !== lastHoveredEl) {
        lastHoveredEl = interactive;
        playHoverSound();
      } else if (!interactive) {
        lastHoveredEl = null;
      }
    };

    window.addEventListener('pointerdown', handleUnlock, { passive: true });
    window.addEventListener('keydown', handleUnlock, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleUnlock);
      window.removeEventListener('keydown', handleUnlock);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'classic' ? 'cyber' : 'classic'));
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
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
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 h-[1100px]"></div>

      <Navbar theme={theme} isMuted={isMuted} onToggleMute={toggleMute} />
      <main className="flex-1 flex flex-col w-full relative z-10">
        <HeroSection />
        <ProfileSection />
        <ProjectsSection theme={theme} />
        <TerminalPlayground
          theme={theme}
          onToggleTheme={toggleTheme}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
        <JourneySection />
      </main>
      <ContactFooter theme={theme} />
    </div>
  );
}

export default App;
