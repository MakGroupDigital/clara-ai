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
      {/* Fond avec grille animée */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo avec rotation */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          {/* Cercle de rotation externe */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          
          {/* Logo au centre */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="relative z-10 scale-150">
              <Logo />
            </div>
          </div>
        </div>

        {/* Texte de chargement avec animation */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-headline text-primary animate-pulse">Clara</span>
            <span className="text-2xl font-headline text-accent animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="text-2xl font-headline text-primary animate-pulse" style={{ animationDelay: '0.4s' }}>ai</span>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Lignes futuristes en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={i * 12.5 + '%'}
              y1="0%"
              x2={i * 12.5 + '%'}
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

