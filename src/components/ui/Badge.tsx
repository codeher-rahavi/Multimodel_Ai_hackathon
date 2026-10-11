import { type ReactNode } from 'react';

type BadgeColor = 'brand' | 'green' | 'amber' | 'red' | 'slate' | 'purple';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const colorMap: Record<BadgeColor, { bg: string; text: string; dot: string }> = {
  brand: { bg: 'bg-brand-50', text: 'text-brand-700', dot: 'bg-brand-500' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  red: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  purple: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
};

export function Badge({ children, color = 'slate', size = 'sm', dot = false, className = '' }: BadgeProps) {
  const c = colorMap[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${c.bg} ${c.text} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
      } rounded-full font-medium ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />}
      {children}
    </span>
  );
}
