import { useMemo } from "react";
import type { CategorySales } from "../../../services/dashboard";

type Props = {
  data: CategorySales[];
};

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#14b8a6",
];

const SIZE = 180;
const R = 70;
const STROKE = 26;
const C = 2 * Math.PI * R;

function formatCurrency(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

export default function CategoryDonut({ data }: Props) {
  const { slices, total } = useMemo(() => {
    const total = data.reduce((s, d) => s + d.revenue, 0);
    let offset = 0;
    const slices = data.map((d, i) => {
      const fraction = total > 0 ? d.revenue / total : 0;
      const slice = {
        ...d,
        color: COLORS[i % COLORS.length],
        dash: fraction * C,
        offset,
        fraction,
      };
      offset += fraction * C;
      return slice;
    });
    return { slices, total };
  }, [data]);

  if (data.length === 0 || total === 0) {
    return <p className="text-sm text-gray-400">No category sales yet.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-44 w-44 shrink-0">
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {slices.map((s) => (
            <circle
              key={s.type}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={`${s.dash} ${C - s.dash}`}
              strokeDashoffset={-s.offset}
            />
          ))}
        </g>
        <text
          x={SIZE / 2}
          y={SIZE / 2 - 4}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="#1e293b"
        >
          {formatCurrency(total)}
        </text>
        <text
          x={SIZE / 2}
          y={SIZE / 2 + 14}
          textAnchor="middle"
          fontSize="10"
          fill="#94a3b8"
        >
          Total sales
        </text>
      </svg>

      <ul className="w-full space-y-2">
        {slices.map((s) => (
          <li
            key={s.type}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-gray-700">{s.type}</span>
            </span>
            <span className="font-medium text-gray-900">
              {(s.fraction * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
