import { useMemo, useState } from "react";
import type { SalesPoint } from "../../../services/dashboard";

type Props = {
  data: SalesPoint[];
};

const W = 640;
const H = 240;
const PAD = { top: 20, right: 16, bottom: 28, left: 48 };

function formatCurrency(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

export default function SalesLineChart({ data }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const geom = useMemo(() => {
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const maxRevenue = Math.max(1, ...data.map((d) => d.revenue));

    const points = data.map((d, i) => {
      const x =
        PAD.left + (data.length <= 1 ? 0 : (i / (data.length - 1)) * innerW);
      const y = PAD.top + innerH - (d.revenue / maxRevenue) * innerH;
      return { x, y, d };
    });

    const line = points.map((p) => `${p.x},${p.y}`).join(" ");
    const area =
      points.length > 0
        ? `${PAD.left},${PAD.top + innerH} ${line} ${
            points[points.length - 1].x
          },${PAD.top + innerH}`
        : "";

    return { points, line, area, maxRevenue, innerH };
  }, [data]);

  if (data.length === 0) {
    return <p className="text-sm text-gray-400">No sales data yet.</p>;
  }

  const yTicks = [0, 0.5, 1].map((f) => ({
    value: geom.maxRevenue * f,
    y: PAD.top + geom.innerH - f * geom.innerH,
  }));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Revenue over time"
    >
      <defs>
        <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {yTicks.map((t) => (
        <g key={t.y}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={t.y}
            y2={t.y}
            stroke="#eef2f7"
          />
          <text x={8} y={t.y + 4} fontSize="10" fill="#94a3b8">
            {formatCurrency(t.value)}
          </text>
        </g>
      ))}

      <polygon points={geom.area} fill="url(#salesFill)" />
      <polyline
        points={geom.line}
        fill="none"
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {geom.points.map((p, i) => (
        <g key={i}>
          <rect
            x={p.x - W / data.length / 2}
            y={PAD.top}
            width={W / data.length}
            height={geom.innerH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
          {hover === i && (
            <>
              <circle cx={p.x} cy={p.y} r="4" fill="#4f46e5" />
              <g>
                <rect
                  x={Math.min(Math.max(p.x - 45, 0), W - 90)}
                  y={p.y - 40}
                  width="90"
                  height="30"
                  rx="4"
                  fill="#1e293b"
                />
                <text
                  x={Math.min(Math.max(p.x, 45), W - 45)}
                  y={p.y - 26}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {formatCurrency(p.d.revenue)}
                </text>
                <text
                  x={Math.min(Math.max(p.x, 45), W - 45)}
                  y={p.y - 15}
                  fontSize="9"
                  fill="#cbd5e1"
                  textAnchor="middle"
                >
                  {new Date(p.d.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </text>
              </g>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
