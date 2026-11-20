import { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CursorTrail } from './components/CursorTrail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { playHoverSound, setSoundMuted, unlockAudioContext } from './lib/soundFx';

const TerminalPlayground = lazy(() =>
  import('./components/TerminalPlayground').then((m) => ({ default: m.TerminalPlayground }))
);
const JourneySection = lazy(() =>
  import('./components/JourneySection').then((m) => ({ default: m.JourneySection }))
);
const ContactFooter = lazy(() =>
  import('./components/ContactFooter').then((m) => ({ default: m.ContactFooter }))
);

function readStorage<T>(key: string, fallback: T, validate: (val: unknown) => val is T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or privacy mode errors
  }
}

export function App() {
  const [theme, setTheme] = useState<'classic' | 'cyber'>(() =>
    readStorage('ruby_theme', 'classic', (v): v is 'classic' | 'cyber' => v === 'classic' || v === 'cyber')
  );
  const [isMuted, setIsMuted] = useState<boolean>(() =>
    readStorage('ruby_muted', false, (v): v is boolean => typeof v === 'boolean')
  );
  const [isOptimized, setIsOptimized] = useState<boolean>(() =>
    readStorage('ruby_lite_mode', false, (v): v is boolean => typeof v === 'boolean')
  );

  // Ensure refresh starts at top unless a specific hash anchor was requested
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Persist settings & sync theme-color / lite-mode class
  useEffect(() => {
    writeStorage('ruby_theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'cyber' ? '#08090E' : '#0038FF');
    }
  }, [theme]);

  useEffect(() => {
    setSoundMuted(isMuted);
    writeStorage('ruby_muted', isMuted);
  }, [isMuted]);

  useEffect(() => {
    writeStorage('ruby_lite_mode', isOptimized);
    document.documentElement.classList.toggle('lite-mode', isOptimized);
  }, [isOptimized]);

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

  const toggleOptimize = () => {
    setIsOptimized((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion={isOptimized ? 'always' : 'user'}>
        <div
          className={`min-h-screen ${
            theme === 'cyber' ? 'bg-[#08090E]' : 'bg-[#0038FF]'
          } transition-colors duration-500 flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-x-clip w-full scroll-smooth`}
        >
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          {/* Interactive Cursor Trail (disabled in Lite Mode) */}
          <CursorTrail disabled={isOptimized} />

          {/* Background Grid Pattern for the top Hero area */}
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 h-[1100px]"></div>

          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            isOptimized={isOptimized}
            onToggleOptimize={toggleOptimize}
          />
          <main id="main-content" className="flex-1 flex flex-col w-full relative z-10">
            <HeroSection />
            <ProfileSection />
            <ProjectsSection theme={theme} isOptimized={isOptimized} />
            <Suspense fallback={null}>
              <TerminalPlayground
                theme={theme}
                onToggleTheme={toggleTheme}
                isMuted={isMuted}
                onToggleMute={toggleMute}
                isOptimized={isOptimized}
                onToggleOptimize={toggleOptimize}
              />
              <JourneySection />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <ContactFooter theme={theme} />
          </Suspense>
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
