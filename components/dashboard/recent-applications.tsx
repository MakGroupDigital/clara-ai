
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { candidates } from '@/lib/data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { useMemo } from 'react';
import type { CandidateStatus } from '@/lib/types';


export function RecentApplications() {
  const { t } = useTranslation();
  
  const translatedCandidates = useMemo(() => candidates.map(c => ({
    ...c,
    status: t(c.status.toLowerCase().replace(' ', '_')) as CandidateStatus,
  })), [t]);

  return (
    <Card className="lg:col-span-4 bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
      <CardHeader>
        <CardTitle>{t('recent_applications')}</CardTitle>
        <CardDescription>{t('new_applications_this_week', { count: candidates.length })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {translatedCandidates.slice(0, 4).map((candidate) => (
          <Link href={`/candidates/${candidate.id}`} key={candidate.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="hidden h-9 w-9 sm:flex border-2 border-primary/30">
              <AvatarImage src={candidate.avatarUrl} alt="Avatar" />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{candidate.name}</p>
              <p className="text-sm text-muted-foreground">{candidate.jobTitle}</p>
            </div>
            <div className="ml-auto font-medium flex items-center gap-2">
                <Badge variant={
                    candidate.status === t('shortlisted') ? 'default' : 
                    candidate.status === t('rejected') ? 'destructive' : 'secondary'
                }
                className={cn(
                    candidate.status === t('shortlisted') && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                    candidate.status === t('rejected') && 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                    candidate.status === t('pending') && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                )}
                >{candidate.status}</Badge>
                <span className='text-primary'>{candidate.matchScore}%</span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
