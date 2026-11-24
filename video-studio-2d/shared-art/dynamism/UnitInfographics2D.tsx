import React from 'react';
import {CARTOON_INK, CARTOON_STROKE} from '../cartoon/sharedCartoonStyle';
import {bounceSpring, kiwiClamp, kiwiEase, kiwiSeeded} from '../math/kiwiMotion';

/**
 * Visualización de unidades por cuadrícula (ej. 100 o 364 sujetos donde solo sobrevive/destaca el X%)
 * con contador superior animado y deslizador temporal inferior.
 */
export const IconPopulationGrid: React.FC<{
  f: number;
  fps: number;
  x: number;
  y: number;
  totalUnits?: number;
  columns?: number;
  survivingRatio?: number; // ej. 0.19 para 19%
  fillDurationSec?: number;
  filterStartSec?: number;
  filterDurationSec?: number;
  unitLabel?: string;
  resultBadge?: string;
  timelineEndLabel?: string;
}> = ({
  f,
  fps,
  x,
  y,
  totalUnits = 120,
  columns = 15,
  survivingRatio = 0.2,
  fillDurationSec = 1.1,
  filterStartSec = 1.6,
  filterDurationSec = 1.4,
  unitLabel = 'CASOS',
  resultBadge = 'LLEGARON AL FINAL',
  timelineEndLabel = '5 AÑOS',
}) => {
  const t = f / fps;
  const fillP = kiwiClamp(t / Math.max(0.2, fillDurationSec));
  const visibleCount = Math.round(totalUnits * kiwiEase(fillP));
  const filterP = kiwiClamp((t - filterStartSec) / Math.max(0.2, filterDurationSec));
  const isFiltering = t >= filterStartSec;

  const rows = Math.ceil(totalUnits / columns);
  const cellW = 28;
  const cellH = 24;
  const gridW = columns * cellW;
  const gridH = rows * cellH;

  const pct = Math.round(survivingRatio * 100);

  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Encabezado numérico vivo */}
      <g transform={`translate(0 ${-gridH / 2 - 48})`}>
        {!isFiltering ? (
          <>
            <text x={-55} y={8} textAnchor="end" fill="#ffffff" fontSize={54} fontWeight={900}>
              {visibleCount}
            </text>
            <g transform="translate(45 -8)">
              <rect x={-78} y={-20} width={156} height={38} rx={19} fill="#38bdf8" stroke={CARTOON_INK} strokeWidth={3.5} />
              <text x={0} y={6} textAnchor="middle" fill={CARTOON_INK} fontSize={18} fontWeight={900}>
                {unitLabel}
              </text>
            </g>
          </>
        ) : (
          <>
            <text x={-85} y={10} textAnchor="end" fill="#facc15" fontSize={58} fontWeight={900}>
              {Math.round(kiwiClamp(filterP) * pct + (1 - kiwiClamp(filterP)) * 100)}%
            </text>
            <g transform="translate(65 -8)">
              <rect x={-125} y={-20} width={250} height={38} rx={19} fill="#f97316" stroke={CARTOON_INK} strokeWidth={3.5} />
              <text x={0} y={6} textAnchor="middle" fill="#ffffff" fontSize={17} fontWeight={900}>
                {resultBadge}
              </text>
            </g>
          </>
        )}
      </g>

      {/* Rejilla de unidades */}
      <g transform={`translate(${-gridW / 2 + cellW / 2} ${-gridH / 2 + cellH / 2})`}>
        {Array.from({length: totalUnits}).map((_, idx) => {
          if (idx >= visibleCount) return null;
          const col = idx % columns;
          const row = Math.floor(idx / columns);
          const seed = kiwiSeeded(idx * 31 + 11);
          const survives = seed < survivingRatio;
          const dropThreshold = seed; // se apagan progresivamente durante filterP
          const dimmed = isFiltering && !survives && filterP > (dropThreshold - survivingRatio) / Math.max(0.05, 1 - survivingRatio);

          return (
            <circle
              key={idx}
              cx={col * cellW}
              cy={row * cellH}
              r={8.5}
              fill={dimmed ? '#312e81' : '#facc15'}
              stroke={dimmed ? '#1e1b4b' : CARTOON_INK}
              strokeWidth={2.2}
              opacity={dimmed ? 0.35 : 1}
            />
          );
        })}
      </g>

      {/* Scrubber temporal inferior */}
      <g transform={`translate(0 ${gridH / 2 + 44})`}>
        <rect x={-gridW / 2} y={-5} width={gridW} height={10} rx={5} fill="#1e293b" stroke={CARTOON_INK} strokeWidth={2.5} />
        <rect
          x={-gridW / 2}
          y={-5}
          width={gridW * kiwiEase(filterP)}
          height={10}
          rx={5}
          fill="#38bdf8"
        />
        <g transform={`translate(${-gridW / 2 + gridW * kiwiEase(filterP)} 0)`}>
          <rect x={-20} y={-22} width={40} height={44} rx={10} fill="#ffffff" stroke={CARTOON_INK} strokeWidth={3} />
          <path d="M -20 -8 H 20 V -14 Q 20 -22 12 -22 H -12 Q -20 -22 -20 -14 Z" fill="#ec4899" />
          <text x={0} y={12} textAnchor="middle" fill={CARTOON_INK} fontSize={18} fontWeight={900}>
            {Math.max(1, Math.round(1 + filterP * 4))}
          </text>
        </g>

        <g transform={`translate(${gridW / 2 + 64} 0)`}>
          <rect x={-48} y={-17} width={96} height={34} rx={17} fill="#6366f1" stroke={CARTOON_INK} strokeWidth={3} />
          <text x={0} y={5} textAnchor="middle" fill="#ffffff" fontSize={15} fontWeight={900}>
            {timelineEndLabel}
          </text>
        </g>
      </g>
    </g>
  );
};

/**
 * Expediente / libreta editorial con lupa animada y sello de goma de alto impacto ("DATO REAL", "PELIGRO").
 */
export const StampedDossierCard: React.FC<{
  f: number;
  fps: number;
  x: number;
  y: number;
  header: string;
  headline: string;
  subline?: string;
  stampText?: string;
  stampFrame?: number;
  stampColor?: string;
}> = ({
  f,
  fps,
  x,
  y,
  header,
  headline,
  subline,
  stampText = 'DATO REAL',
  stampFrame = 24,
  stampColor = '#ef4444',
}) => {
  const cardIn = bounceSpring(f, fps, 0);
  const hasStamp = f >= stampFrame;
  const stampS = hasStamp ? bounceSpring(f, fps, stampFrame) : 0;
  const ringP = hasStamp ? kiwiClamp((f - stampFrame) / 18) : 0;

  return (
    <g transform={`translate(${x} ${y}) scale(${cardIn}) rotate(-2.5)`}>
      <rect x={-195} y={-145} width={390} height={290} rx={22} fill={CARTOON_INK} opacity={0.35} transform="translate(8 10)" />
      <rect x={-195} y={-145} width={390} height={290} rx={22} fill="#fffbeb" stroke={CARTOON_INK} strokeWidth={CARTOON_STROKE} />
      <path
        d="M -195 -90 H 195 V -123 Q 195 -145 173 -145 H -173 Q -195 -145 -195 -123 Z"
        fill="#7c3aed"
        stroke={CARTOON_INK}
        strokeWidth={CARTOON_STROKE}
      />
      <text x={0} y={-109} textAnchor="middle" fill="#ffffff" fontSize={20} fontWeight={900} letterSpacing={1.5}>
        {header}
      </text>

      <text x={0} y={-28} textAnchor="middle" fill="#0f172a" fontSize={32} fontWeight={900}>
        {headline}
      </text>
      {subline && (
        <text x={0} y={16} textAnchor="middle" fill="#475569" fontSize={20} fontWeight={700}>
          {subline}
        </text>
      )}

      {/* Sello de goma impactando con onda expansiva */}
      {hasStamp && (
        <g transform={`translate(0 72) rotate(-8) scale(${kiwiClamp(stampS * 1.05, 0.2, 1.3)})`}>
          {ringP < 1 && (
            <circle
              cx={0}
              cy={0}
              r={40 + ringP * 145}
              fill="none"
              stroke={stampColor}
              strokeWidth={4 * (1 - ringP)}
              opacity={1 - ringP}
            />
          )}
          <rect
            x={-135}
            y={-30}
            width={270}
            height={60}
            rx={10}
            fill="#fff1f2"
            fillOpacity={0.92}
            stroke={stampColor}
            strokeWidth={5}
          />
          <rect x={-127} y={-22} width={254} height={44} rx={6} fill="none" stroke={stampColor} strokeWidth={2} strokeDasharray="8 5" />
          <text x={0} y={10} textAnchor="middle" fill={stampColor} fontSize={28} fontWeight={900} letterSpacing={2}>
            {stampText}
          </text>
        </g>
      )}
    </g>
  );
};
