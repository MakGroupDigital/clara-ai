
'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {

  return (
    <Link href="/" className="flex items-center gap-3">
      <svg
        width="40"
        height="40"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        <path d="M26 4C14.9543 4 6 12.9543 6 24C6 35.0457 14.9543 44 26 44C37.0457 44 46 35.0457 46 24C46 12.9543 37.0457 4 26 4Z" stroke="url(#logo-gradient)" strokeWidth="1.5"/>
        <path d="M26 12V18" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
        <path d="M26 30V36" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
        <path d="M36 24H30" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
        <path d="M22 24H16" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
        <path d="M21 21L17 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
        <path d="M31 21L35 17" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
        <path d="M21 27L17 31" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
        <path d="M31 27L35 31" stroke="hsl(var(--accent))" strokeWidth="1.soixante-quinze"/>
        <rect x="22" y="20" width="8" height="8" rx="1.5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      </svg>
      <div className="flex flex-col">
        <span className={cn("font-headline text-2xl font-bold text-accent", className)}>
            Clara<span className="text-primary">.ai</span>
        </span>
        <span className="text-xs text-muted-foreground -mt-1">L'assistante RH moderne</span>
      </div>
    </Link>
  );
}
