import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
  cursorClassName?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 90,
  deletingSpeed = 45,
  delayBetween = 1800,
  className = '',
  cursorClassName = 'text-[#CCFF00]'
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = phrases[currentPhraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(targetPhrase.substring(0, currentText.length + 1));

        if (currentText.length + 1 === targetPhrase.length) {
          // Finished typing phrase, pause before deleting
          setTimeout(() => setIsDeleting(true), delayBetween);
          return;
        }
      } else {
        // Deleting backward
        setCurrentText(targetPhrase.substring(0, currentText.length - 1));

        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          return;
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      <span>{currentText}</span>
      <span className={`ml-0.5 inline-block animate-pulse font-black ${cursorClassName}`}>
        ▋
      </span>
    </span>
  );
};
