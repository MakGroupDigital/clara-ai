
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KPI } from '@/lib/types';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function KpiCard({ title, value, change, changeType }: KPI) {
  const { t } = useTranslation();
  return (
    <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {changeType === 'positive' ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-400" />
        ) : (
            <ArrowDownRight className="h-4 w-4 text-rose-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
            "text-xs",
            changeType === 'positive' ? 'text-emerald-400' : 'text-rose-400',
        )}>
          {change} {t('from_last_month')}
        </p>
      </CardContent>
    </Card>
  );
}
