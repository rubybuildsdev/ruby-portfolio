import React from 'react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { 
  PhpIcon,
  JavaScriptIcon,
  TypeScriptIcon, 
  MySqlIcon,
  NodeJsIcon, 
  GitIcon, 
  ReactIcon, 
  ThreeJsIcon, 
  TailwindIcon, 
  ViteIcon,
  GithubIcon 
} from './Icons';
import { ProfileAvatar } from './ProfileAvatar';
import { Sparkles, ArrowUpRight, Terminal, Code2 } from 'lucide-react';
import { ToolchainMarquee, type ToolchainItem } from './ui/toolchain-marquee';

interface TechItem {
  name: string;
  role: string;
  Icon: React.FC<{ className?: string }>;
  accent: string;
}

const CORE_TECHNOLOGIES: TechItem[] = [
  { name: 'PHP', role: 'Backend & APIs', Icon: PhpIcon, accent: '#777BB4' },
  { name: 'JavaScript', role: 'Web & Logic', Icon: JavaScriptIcon, accent: '#F7DF1E' },
  { name: 'TypeScript', role: 'Type-Safe Code', Icon: TypeScriptIcon, accent: '#007ACC' },
  { name: 'MySQL', role: 'Relational DB', Icon: MySqlIcon, accent: '#00618A' },
  { name: 'Node.js', role: 'Server Runtime', Icon: NodeJsIcon, accent: '#539E43' },
  { name: 'Git', role: 'Version Control', Icon: GitIcon, accent: '#F34F29' },
  { name: 'React', role: 'UI Components', Icon: ReactIcon, accent: '#61DAFB' },
  { name: 'Three.js', role: '3D Graphics', Icon: ThreeJsIcon, accent: '#000000' },
  { name: 'Tailwind', role: 'Modern Utility CSS', Icon: TailwindIcon, accent: '#38BDF8' },
  { name: 'Vite', role: 'Fast Bundler', Icon: ViteIcon, accent: '#BD34FE' },
];

// Split the stack into two rows that scroll in opposite directions
const TOOLCHAIN_STACKS: ToolchainItem[][] = [
  CORE_TECHNOLOGIES.slice(0, 5),
  CORE_TECHNOLOGIES.slice(5),
].map((row) =>
  row.map(({ name, Icon, accent }) => ({
    label: name,
    icon: <Icon className="w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem]" />,
    accent,
  }))
);

export const ProfileSection: React.FC = () => {
  return (
    <section
      id="profile"
      data-brightness="bright"
      className="bg-white text-black rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-6 py-16 md:px-10 md:py-24 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] mt-auto w-full overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-black text-[#CCFF00] font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm hover:scale-105 transition-transform cursor-default">
            <Code2 className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>Developer Profile</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            WHO I AM
          </h2>
          <p className="text-black/60 font-semibold text-sm md:text-base max-w-xl mx-auto mt-2">
            Aspiring full-stack engineer building real web systems, 3D simulations, and AI automation.
          </p>
        </motion.div>

        {/* Cohesive Neo-Brutalist Profile Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="bg-[#F8F9FA] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.2rem] p-5 sm:p-8 md:p-14 border-2 border-gray-200/90 shadow-[6px_6px_0px_#0038FF] sm:shadow-[10px_10px_0px_#0038FF] hover:border-black transition-all duration-300 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Neo-Brutalist Static Profile Avatar */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <ProfileAvatar />
            </div>

            {/* Right Column: Bio, Authentic SVG Tech Stack, and Action */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-1.5 text-[#0038FF] font-black text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#0038FF]" />
                <span>Code • Curiosity • Discipline</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-black tracking-tight leading-tight mb-4">
                Building Real Systems, Not Just Surface Mocks
              </h3>

              <p className="text-black/70 text-sm md:text-base font-medium leading-relaxed mb-4">
                I am <strong className="text-black">{portfolioConfig.name}</strong>, an aspiring full-stack engineer who values strong fundamentals, clean code hygiene, and building end-to-end applications.
              </p>

              <p className="text-black/60 text-xs md:text-sm font-semibold leading-relaxed mb-7">
                From full-stack reservation management systems with database transactions (Pink Outdoor), to interactive 3D Rubik's cube algorithms (CubeSolver), and voice-assisted AI tooling (WarungAI)—I learn by shipping working software daily.
              </p>

              {/* Running Tech Stack Marquee */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-black uppercase tracking-wider text-black/50">
                    Core Technologies & Tooling
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black/5 text-black/60 px-2.5 py-0.5 rounded-full">
                    {CORE_TECHNOLOGIES.length} Verified Stacks
                  </span>
                </div>

                <ToolchainMarquee stacks={TOOLCHAIN_STACKS} duration={24} rows={2} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-4 border-t border-gray-200/80">
                <a
                  href="#playground"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-[#0038FF] text-white font-black text-xs md:text-sm hover:bg-[#CCFF00] hover:text-black transition-colors shadow-sm"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Try Live Playground</span>
                </a>

                <a
                  href={portfolioConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-full border-2 border-black bg-white text-black font-bold text-xs md:text-sm hover:bg-black hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Activity</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
