
'use client';

import { kpis as kpiData } from '@/lib/data';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { CompletionChart } from '@/components/dashboard/completion-chart';
import { RecentApplications } from '@/components/dashboard/recent-applications';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import type { KPI } from '@/lib/types';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();

  const kpis: KPI[] = [
    { title: t('kpi_active_offers'), value: '12', change: '+2', changeType: 'positive' },
    { title: t('kpi_video_completion_rate'), value: '85%', change: '-5%', changeType: 'negative' },
    { title: t('kpi_avg_recruitment_time'), value: `24 ${t('days')}`, change: '-3j', changeType: 'positive' },
    { title: t('kpi_new_candidates'), value: '45', change: '+10', changeType: 'positive' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">{t('dashboard')}</h1>
        <Link href="/jobs/create">
            <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            {t('create_new_offer')}
            </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CompletionChart />
        <RecentApplications />
      </div>
    </div>
  );
}
