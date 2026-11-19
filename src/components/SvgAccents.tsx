export const ArrowGreenLeft = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

export const ArrowGreenRight = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

export const CircularBadge = ({ text = "OPEN TO LEARN • EXPLORE MY WORK • " }: { text?: string }) => (
  <a 
    href="#projects"
    className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer border-[2px] sm:border-[3px] border-black/10 group"
  >
    <div className="absolute inset-1 animate-[spin_12s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text className="text-[10px] font-black tracking-[0.16em] uppercase" fill="black">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center group-hover:translate-y-1 transition-transform">
      <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-10 sm:h-10 text-black stroke-current overflow-visible" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,20 L50,75 M30,55 L50,75 L70,55" />
      </svg>
    </div>
  </a>
);
