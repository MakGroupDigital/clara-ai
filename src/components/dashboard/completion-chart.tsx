
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { completionData } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';
import { Pie, PieChart, Cell } from 'recharts';

export function CompletionChart() {
  const { t } = useTranslation();

  const completionConfig = {
    completed: { label: t('completed'), color: "hsl(var(--primary))" },
    pending: { label: t('pending'), color: "hsl(var(--secondary))" },
  };

  return (
    <Card className="lg:col-span-3 bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
      <CardHeader>
        <CardTitle>{t('kpi_video_completion_rate')}</CardTitle>
        <CardDescription>{t('january_june_2024')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={completionConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={completionData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} startAngle={90} endAngle={450}>
                    {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
