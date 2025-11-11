
import { cn } from '@/lib/utils';

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export function MethodBadge({ method }: MethodBadgeProps) {
  const colorClasses = {
    GET: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    POST: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    DELETE: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    PATCH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <span
      className={cn(
        'rounded-md border px-2 py-0.5 text-xs font-semibold font-code',
        colorClasses[method]
      )}
    >
      {method}
    </span>
  );
}
