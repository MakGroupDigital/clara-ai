
'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useEffect, useState } from 'react';

type Animation = 'fade-in' | 'slide-in-from-bottom' | 'slide-in-from-left' | 'slide-in-from-right';

interface AnimatedOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function AnimatedOnScroll({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: AnimatedOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  const animationClasses: Record<Animation, string> = {
    'fade-in': 'animate-fade-in',
    'slide-in-from-bottom': 'animate-slide-in-from-bottom',
    'slide-in-from-left': 'animate-slide-in-from-left',
    'slide-in-from-right': 'animate-slide-in-from-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transition-opacity', // Start invisible
        isVisible && 'opacity-100', // Become visible
        isVisible && animationClasses[animation],
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}

    