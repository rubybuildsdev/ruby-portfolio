import React, { useState } from 'react';
import { motion } from 'motion/react';

export const ProfileAvatar: React.FC = () => {
  const [imgSrc, setImgSrc] = useState('/images/profile/avatar-optimized.jpg');

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Neo-Brutalist Frame Container with Lift & Shadow Expansion Hover */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="group relative w-full h-[380px] sm:h-[420px] max-w-[340px] cursor-pointer"
      >
        {/* Layer 1: Electric Blue Offset Shadow */}
        <div 
          className="absolute inset-0 bg-[#0038FF] rounded-[2.5rem] transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 pointer-events-none"
        />

        {/* Layer 2: Neon Volt Offset Shadow */}
        <div 
          className="absolute inset-0 bg-[#CCFF00] rounded-[2.5rem] transform -translate-x-2 -translate-y-2 group-hover:-translate-x-3 group-hover:-translate-y-3 transition-transform duration-300 pointer-events-none"
        />

        {/* Layer 3: Main Avatar Box Frame with 3px Black Border */}
        <div className="relative w-full h-full rounded-[2.3rem] border-3 border-black bg-[#121624] overflow-hidden shadow-2xl z-10 flex items-center justify-center">
          
          {/* Profile Photo - Clean, crisp, no grid overlay, no cutout fringe */}
          <img
            src={imgSrc}
            alt="Ruby Profile Avatar"
            onError={() => setImgSrc('/images/profile/avatar.jpg')}
            className="w-full h-full object-cover object-center relative z-10 group-hover:scale-102 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  );
};
