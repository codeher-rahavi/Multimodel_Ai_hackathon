interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 75 ? '#10b981' : value >= 50 ? '#3b82f6' : value >= 30 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 tabular-nums">{Math.round(value)}%</span>
        {label && <span className="text-xs text-slate-500 font-medium mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-slate-400 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
