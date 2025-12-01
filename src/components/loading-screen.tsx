'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simuler un chargement de 2-3 secondes
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isExiting && 'opacity-0'
      )}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-6">
        <Logo />
        
        {/* 3 points de chargement */}
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}

