
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingTitleProps {
  titles: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypingTitle({
  titles,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingTitleProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(typingSpeed);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTick = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      if (isDeleting) {
        setText(prevText => prevText.substring(0, prevText.length - 1));
      } else {
        setText(prevText => fullText.substring(0, prevText.length + 1));
      }

      if (!isDeleting && text === fullText) {
        // Pause at end
        setDelta(pauseDuration);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(typingSpeed);
      } else if (isDeleting) {
        setDelta(deletingSpeed);
      }
    };
    
    timerRef.current = setTimeout(handleTick, delta);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, isDeleting, delta, loopNum, titles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <h2 className={cn("relative", className)}>
        {text}
        <span className="animate-pulse">|</span>
    </h2>
  );
}
