interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  unit?: string;
  color?: string;
}

export function LineChart({
  data,
  height = 240,
  unit = '%',
  color = '#2563eb',
}: LineChartProps) {
  if (data.length === 0) return null;

  const width = 600;
  const padding = { top: 20, right: 20, bottom: 30, left: 35 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values, 100);
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  const gridLines = [0, 25, 50, 75, 100].filter((v) => v >= minVal && v <= maxVal);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ maxHeight: `${height}px` }}>
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridLines.map((v, i) => {
        const y = padding.top + chartHeight - ((v - minVal) / range) * chartHeight;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-medium">
              {v}{unit}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#areaGradient)" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => (
        <g key={i} className="group">
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2.5" />
          <circle cx={p.x} cy={p.y} r="12" fill="transparent" className="cursor-pointer" />
          <text
            x={p.x}
            y={padding.top + chartHeight + 18}
            textAnchor="middle"
            className="text-[10px] fill-slate-500 font-medium"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
