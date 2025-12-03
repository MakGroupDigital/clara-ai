
'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {

  return (
    <Link href="/" className="flex items-center gap-3">
      <div className={cn("relative", className)} style={{ width: '40px', height: '40px' }}>
        <Image
          src="/icon-clara.png"
          alt="Clara.ai Logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className={cn("font-headline text-2xl font-bold text-accent", className)}>
            Clara<span className="text-primary">.ai</span>
        </span>
        <span className="text-xs text-muted-foreground -mt-1">L'assistante RH moderne</span>
      </div>
    </Link>
  );
}
