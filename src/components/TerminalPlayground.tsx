import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { Terminal, CornerDownLeft, Sparkles, CheckCircle2, RotateCcw, Palette, ExternalLink, Volume2, VolumeOff } from 'lucide-react';

interface TerminalOutput {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'json' | 'test';
  content: React.ReactNode;
}

interface TerminalPlaygroundProps {
  theme: 'classic' | 'cyber';
  onToggleTheme: () => void;
}

export const TerminalPlayground: React.FC<TerminalPlaygroundProps> = ({ theme, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isRunningTest, setIsRunningTest] = useState(false);

  // UPGRADE 1 — Auto-demo state
  const [isAutoDemo, setIsAutoDemo] = useState(true);
  const autoDemoTimers = useRef<number[]>([]);
  const autoDemoStarted = useRef(false);

  // UPGRADE 2 — Screen shake state
  const [isShaking, setIsShaking] = useState(false);

  // UPGRADE 3 — Keyboard sound FX state
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Initial welcome message
  const [outputs, setOutputs] = useState<TerminalOutput[]>([
    {
      id: 'init-1',
      type: 'output',
      content: (
        <div className="space-y-1">
          <div className="text-[#CCFF00] font-black tracking-wider text-xs md:text-sm">
            RUBY LIVE DEV SHELL v2.4.0 (x86_64-rubyos)
          </div>
          <div className="text-white/60 text-xs">
            Type a command below or click a quick-action chip to explore projects, run test pipelines, or toggle system themes.
          </div>
          <div className="text-white/40 text-[11px] pt-1">
            Type <span className="text-[#CCFF00] font-bold">help</span> to list all available commands.
          </div>
        </div>
      ),
    },
  ]);

  // Auto-scroll terminal logs ONLY inside the container, never scrolling the browser window
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [outputs, isRunningTest]);

  const quickChips = [
    { label: 'help', cmd: 'help' },
    { label: 'about', cmd: 'about' },
    { label: 'skills', cmd: 'skills' },
    { label: 'projects', cmd: 'projects' },
    { label: 'run test', cmd: 'run test' },
    { label: 'curl /api', cmd: 'curl /api/portfolio' },
    { label: 'theme', cmd: 'theme --toggle' },
    { label: 'clear', cmd: 'clear' },
  ];

  // --- UPGRADE 2 helper: trigger screen shake ---
  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  }, []);

  // --- UPGRADE 3 helper: play keyboard click via Web Audio API ---
  const playKeyClick = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Silently ignore audio errors
    }
  }, [isMuted]);

  const handleCommandExecution = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    // Record in history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Push user command echo
    const userEcho: TerminalOutput = {
      id: `cmd-${Date.now()}`,
      type: 'input',
      content: (
        <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
          <span className="text-[#CCFF00] font-bold">ruby@terminal</span>
          <span className="text-white/40">:</span>
          <span className="text-sky-400 font-semibold">~</span>
          <span className="text-white/50">$</span>
          <span className="text-white font-medium">{trimmed}</span>
        </div>
      ),
    };

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setOutputs([]);
      return;
    }

    let responseOutput: TerminalOutput;

    if (lower === 'help') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 py-1 text-xs md:text-sm font-mono">
            <div className="text-[#CCFF00] font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-white/80">
              <div>
                <span className="text-sky-400 font-bold">about</span> : Developer summary & mindset
              </div>
              <div>
                <span className="text-sky-400 font-bold">skills</span> : Tech stack breakdown
              </div>
              <div>
                <span className="text-sky-400 font-bold">projects</span> : Active featured repositories
              </div>
              <div>
                <span className="text-sky-400 font-bold">run test</span> : Simulate unit test runner
              </div>
              <div>
                <span className="text-sky-400 font-bold">curl /api/portfolio</span> : Fetch JSON payload
              </div>
              <div>
                <span className="text-sky-400 font-bold">theme --toggle</span> : Switch page visual theme
              </div>
              <div>
                <span className="text-sky-400 font-bold">contact</span> : Get direct email & GitHub
              </div>
              <div>
                <span className="text-sky-400 font-bold">clear</span> : Clear console window
              </div>
            </div>
            <div className="text-white/40 text-[11px] pt-1">
              Tip: You can also click any chip above the input box!
            </div>
          </div>
        ),
      };
    } else if (lower === 'about' || lower === 'whoami') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 py-1 text-xs md:text-sm font-mono text-white/90">
            <div className="text-[#CCFF00] font-bold">{portfolioConfig.name} — {portfolioConfig.tagline}</div>
            <div className="text-white/70">
              Aspiring full-stack engineer focused on clean architectures, interactive 3D web interfaces, and modern AI agent pipelines.
            </div>
            <div className="text-white/50 text-[11px]">
              Location: {portfolioConfig.location} | GitHub: @{portfolioConfig.githubUsername}
            </div>
          </div>
        ),
      };
    } else if (lower === 'skills' || lower === 'stack') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-3 py-1 text-xs md:text-sm font-mono">
            {portfolioConfig.pillars.map((pillar) => (
              <div key={pillar.id} className="border-l-2 border-[#CCFF00]/60 pl-3">
                <div className="text-[#CCFF00] font-bold text-xs">{pillar.step}: {pillar.title}</div>
                <div className="text-white/80 text-xs mt-0.5">{pillar.subtitle}</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {pillar.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[11px] border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ),
      };
    } else if (lower === 'projects' || lower === 'projects --featured') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 py-1 text-xs md:text-sm font-mono">
            <div className="text-[#CCFF00] font-bold">FEATURED REPOSITORIES:</div>
            {portfolioConfig.projects.map((proj) => (
              <div key={proj.id} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#CCFF00]/40 transition-colors">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{proj.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#CCFF00] text-black font-extrabold uppercase">
                      {proj.category}
                    </span>
                  </div>
                  <div className="text-white/60 text-xs mt-0.5">{proj.description}</div>
                  <div className="text-sky-400 text-[11px] mt-1 font-semibold">{proj.tags.join(' • ')}</div>
                </div>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white text-xs font-bold transition-all shrink-0 self-start sm:self-center"
                >
                  <span>Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        ),
      };
    } else if (lower === 'run test' || lower === 'test' || lower === 'npm test') {
      // UPGRADE 2 — trigger shake on run test
      triggerShake();
      setIsRunningTest(true);
      setOutputs((prev) => [...prev, userEcho]);

      setTimeout(() => {
        setOutputs((prev) => [
          ...prev,
          {
            id: `test-run-${Date.now()}`,
            type: 'test',
            content: (
              <div className="space-y-2 py-2 text-xs md:text-sm font-mono">
                <div className="text-white/60">Running simulated test suites across active repositories...</div>
                <div className="space-y-1.5 pl-2 border-l-2 border-emerald-400">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>PASS CubeSolver: Kociemba 2-Phase Engine solved scramble in 18 steps (12ms)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>PASS Pink Outdoor: Reservation state machine validated & Google OAuth passed (24ms)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>PASS WarungAI: Gemini API multimodal schema parsed with zero hallucination (48ms)</span>
                  </div>
                </div>
                <div className="text-[#CCFF00] font-bold pt-1">
                  Test Suites: 3 passed, 3 total | Tests: 18 passed, 18 total | All systems operational.
                </div>
              </div>
            ),
          },
        ]);
        setIsRunningTest(false);
      }, 700);
      return;
    } else if (lower.startsWith('curl') || lower === 'api') {
      // UPGRADE 2 — trigger shake on curl
      triggerShake();

      const payload = {
        status: 200,
        author: portfolioConfig.name,
        role: portfolioConfig.tagline,
        activeProjects: portfolioConfig.projects.map((p) => ({
          name: p.title,
          stack: p.tags,
          repo: p.githubUrl,
        })),
        contact: {
          email: portfolioConfig.email,
          github: portfolioConfig.githubUrl,
          location: portfolioConfig.location,
        },
      };

      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'json',
        content: (
          <div className="py-2 text-xs font-mono bg-black/60 p-3 rounded-xl border border-white/10 overflow-x-auto">
            <div className="text-emerald-400 mb-1">HTTP/2 200 OK — content-type: application/json</div>
            <pre className="text-[#CCFF00]">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        ),
      };
    } else if (lower.includes('theme')) {
      onToggleTheme();
      const nextTheme = theme === 'classic' ? 'Cyber Dark Monochrome' : 'Classic Electric Blue';
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'success',
        content: (
          <div className="flex items-center gap-2 py-1 text-xs md:text-sm font-mono text-[#CCFF00]">
            <Palette className="w-4 h-4" />
            <span>Theme toggled successfully! Switched to: <strong>{nextTheme}</strong></span>
          </div>
        ),
      };
    } else if (lower === 'contact' || lower === 'email') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 py-1 text-xs md:text-sm font-mono">
            <div className="text-[#CCFF00] font-bold">GET IN TOUCH:</div>
            <div className="text-white/80">
              Email: <a href={`mailto:${portfolioConfig.email}`} className="text-sky-400 underline font-semibold">{portfolioConfig.email}</a>
            </div>
            <div className="text-white/80">
              GitHub: <a href={portfolioConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-semibold">{portfolioConfig.githubUrl}</a>
            </div>
          </div>
        ),
      };
    } else if (lower === 'sudo' || lower === 'secret') {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'output',
        content: (
          <div className="py-1 text-xs md:text-sm font-mono text-amber-300">
            [ACCESS GRANTED] You already possess full privileges here! Build boldly, learn relentlessly.
          </div>
        ),
      };
    } else {
      responseOutput = {
        id: `resp-${Date.now()}`,
        type: 'error',
        content: (
          <div className="py-1 text-xs md:text-sm font-mono text-rose-400">
            command not found: {trimmed}. Type <span className="text-[#CCFF00] font-bold">help</span> to view all valid commands.
          </div>
        ),
      };
    }

    setOutputs((prev) => [...prev, userEcho, responseOutput]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isRunningTest) return;
    const cmd = inputVal;
    setInputVal('');
    handleCommandExecution(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  // --- UPGRADE 1: Interrupt auto-demo on user interaction ---
  const interruptAutoDemo = useCallback(() => {
    if (!isAutoDemo) return;
    setIsAutoDemo(false);
    // Clear all pending auto-demo timers
    autoDemoTimers.current.forEach((id) => clearTimeout(id));
    autoDemoTimers.current = [];
  }, [isAutoDemo]);

  // --- UPGRADE 1: Auto-demo with IntersectionObserver ---
  useEffect(() => {
    if (!isAutoDemo || autoDemoStarted.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && isAutoDemo && !autoDemoStarted.current) {
          autoDemoStarted.current = true;
          observer.disconnect();

          const demoCommands = ['whoami', 'skills', 'run test'];
          let cumulativeDelay = 1500; // initial wait

          const typeAndExecute = (cmd: string, startDelay: number) => {
            // Type character by character
            let charIdx = 0;
            const typeTimerId = window.setTimeout(() => {
              const interval = window.setInterval(() => {
                charIdx++;
                const partial = cmd.slice(0, charIdx);
                setInputVal(partial);
                if (charIdx >= cmd.length) {
                  clearInterval(interval);
                  // Execute after finishing typing
                  const execTimer = window.setTimeout(() => {
                    setInputVal('');
                    handleCommandExecution(cmd);
                  }, 200);
                  autoDemoTimers.current.push(execTimer);
                }
              }, 50);
              autoDemoTimers.current.push(interval as unknown as number);
            }, startDelay);
            autoDemoTimers.current.push(typeTimerId);
          };

          demoCommands.forEach((cmd) => {
            typeAndExecute(cmd, cumulativeDelay);
            // typing duration + 200ms exec delay + 2000ms pause (except after last)
            cumulativeDelay += cmd.length * 50 + 200 + 2000;
          });

          // After all commands finish, mark auto-demo as done
          const finishTimer = window.setTimeout(() => {
            setIsAutoDemo(false);
          }, cumulativeDelay);
          autoDemoTimers.current.push(finishTimer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
    // handleCommandExecution is intentionally omitted to avoid re-triggering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoDemo]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      autoDemoTimers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="playground" 
      className={`pt-2 pb-20 md:pt-4 md:pb-28 px-4 sm:px-6 md:px-10 relative z-20 w-full transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24 ${
        theme === 'cyber' ? 'bg-[#08090E] text-white' : 'bg-[#0038FF] text-white'
      }`}
    >
      {/* Shake keyframes */}
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-2px)} 75%{transform:translateX(2px)} }`}</style>

      {/* Background Grid Pattern - EXACT UNIFORM MATCH TO HERO AND PROJECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Subtle Section Bridge Divider */}
      <div className="max-w-6xl mx-auto relative z-10 mb-8 pt-2">
        <div className="w-full border-t border-white/20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/15 pb-6 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#CCFF00] font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Interactive Console</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              LIVE DEV PLAYGROUND
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm md:text-base font-medium">
            An interactive environment to test and explore my workflow directly. Run commands, inspect APIs, or simulate builds.
          </p>
        </motion.div>

        {/* macOS-style Glassmorphism Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`w-full rounded-2xl md:rounded-3xl border border-white/20 bg-black/45 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ${isShaking ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
          onClick={() => {
            interruptAutoDemo();
          }}
        >
          {/* Window Chrome Header */}
          <div className="bg-white/10 px-4 md:px-6 py-3.5 border-b border-white/15 flex items-center justify-between">
            {/* Traffic Light Dots */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 shadow-xs"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 shadow-xs"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 shadow-xs"></div>
              <span className="hidden sm:inline-block ml-3 font-mono text-xs text-white/60 font-semibold">
                ruby@dev-box: ~ (zsh)
              </span>
            </div>

            {/* Live Indicator & Quick Theme Toggle & Mute Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] md:text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>INTERACTIVE</span>
              </div>
              
              {/* UPGRADE 3 — Mute/Unmute toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((prev) => !prev);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white font-mono text-[10px] md:text-xs font-semibold border border-white/20 transition-all cursor-pointer"
                title={isMuted ? 'Unmute keyboard sounds' : 'Mute keyboard sounds'}
              >
                {isMuted ? <VolumeOff className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                <span className="hidden sm:inline">{isMuted ? 'Unmuted' : 'Sound'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandExecution('theme --toggle');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white font-mono text-[10px] md:text-xs font-semibold border border-white/20 transition-all cursor-pointer"
                title="Toggle global theme"
              >
                <Palette className="w-3 h-3" />
                <span className="hidden sm:inline">Theme</span>
              </button>
            </div>
          </div>

          {/* Quick-Action Command Chips */}
          <div className="bg-white/5 px-4 md:px-6 py-2.5 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="text-white/40 font-mono text-[11px] shrink-0 mr-1 hidden sm:inline">Quick commands:</span>
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleCommandExecution(chip.cmd)}
                disabled={isRunningTest}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white font-mono text-xs font-semibold transition-all border border-white/10 hover:border-transparent shrink-0 cursor-pointer active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Terminal Screen & Logs Area */}
          <div 
            ref={logsContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 md:p-6 min-h-[250px] sm:min-h-[300px] max-h-[380px] sm:max-h-[440px] overflow-y-auto space-y-3 font-mono cursor-text scroll-smooth"
          >
            {outputs.map((out) => (
              <div key={out.id} className="animate-in fade-in duration-200">
                {out.content}
              </div>
            ))}

            {isRunningTest && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-sky-400 animate-pulse font-mono">
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Running test suites across Node.js and Three.js environments...</span>
              </div>
            )}
          </div>

          {/* Active Command Input Bar */}
          <form 
            onSubmit={handleFormSubmit}
            className="border-t border-white/15 bg-black/60 px-4 md:px-6 py-3 flex items-center gap-2"
          >
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-mono text-[#CCFF00] font-bold shrink-0">
              <Terminal className="w-4 h-4 text-[#CCFF00]" />
              <span className="hidden sm:inline">ruby@terminal:~$</span>
              <span className="sm:hidden">$</span>
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                // Interrupt auto-demo when user types
                interruptAutoDemo();
              }}
              onKeyDown={(e) => {
                // UPGRADE 3 — play click sound on each keypress
                playKeyClick();
                handleKeyDown(e);
              }}
              disabled={isRunningTest}
              placeholder="type 'help', 'run test', or 'projects'..."
              className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none placeholder:text-white/30"
              autoComplete="off"
              spellCheck="false"
            />

            <button
              type="submit"
              disabled={isRunningTest || !inputVal.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">Enter</span>
              <CornerDownLeft className="w-3 h-3 stroke-[2.5]" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
