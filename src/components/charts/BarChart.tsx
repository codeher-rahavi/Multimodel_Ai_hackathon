interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
  unit?: string;
}

export function BarChart({ data, maxValue, height = 220, unit = '%' }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 100);
  const getColor = (value: number, defaultColor?: string) => {
    if (defaultColor) return defaultColor;
    if (value >= 75) return 'bg-emerald-500';
    if (value >= 50) return 'bg-brand-500';
    if (value >= 30) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
        {data.map((item, i) => {
          const barHeight = Math.max((item.value / max) * (height - 30), 4);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="text-xs font-semibold text-slate-700 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
                {unit}
              </div>
              <div
                className={`w-full max-w-[48px] ${getColor(item.value, item.color)} rounded-t-lg transition-all duration-700 ease-out relative group-hover:opacity-90`}
                style={{ height: `${barHeight}px` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}{unit}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium text-center leading-tight truncate w-full">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
