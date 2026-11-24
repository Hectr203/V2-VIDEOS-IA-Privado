import React from 'react';
import {CARTOON_INK, CARTOON_STROKE} from '../cartoon/sharedCartoonStyle';
import {bounceSpring, kiwiClamp, kiwiEase, kiwiMix} from '../math/kiwiMotion';

export interface StoryUnitStatus {
  id: string;
  state: 'alive' | 'hero' | 'gone';
  color?: string;
}

/**
 * HUD diegético de estado narrativo (ej. "NOCHE 1", "SEMANA 4" con marcadores vivos/caídos).
 * No es un encabezado de diapositiva, sino un marcador gamificado de supervivencia o progreso de historia.
 */
export const StoryStateHUD: React.FC<{
  x?: number;
  y?: number;
  stageLabel: string;
  units?: StoryUnitStatus[];
  f: number;
}> = ({x = 26, y = 28, stageLabel, units = [], f}) => {
  const pulse = 1 + Math.sin(f * 0.14) * 0.05;
  const width = Math.max(154, units.length * 34 + 34);
  const height = units.length > 0 ? 78 : 44;

  return (
    <svg
      width={width + 20}
      height={height + 20}
      viewBox={`0 0 ${width + 20} ${height + 20}`}
      style={{position: 'absolute', left: x, top: y, pointerEvents: 'none', overflow: 'visible'}}
    >
      <rect
        x={4}
        y={6}
        width={width}
        height={height}
        rx={16}
        fill={CARTOON_INK}
        opacity={0.45}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={16}
        fill="#1e1b4b"
        stroke="#f59e0b"
        strokeWidth={3.5}
      />
      <text x={16} y={26} fill="#fde047" fontSize={16} fontWeight={900} letterSpacing={1}>
        {stageLabel}
      </text>

      {units.map((u, idx) => {
        const ux = 24 + idx * 34;
        const uy = 54;
        const baseColor = u.color || (u.state === 'hero' ? '#38bdf8' : '#fbbf24');
        return (
          <g key={u.id} transform={`translate(${ux} ${uy}) scale(${u.state === 'hero' ? pulse : 1})`}>
            <circle
              cx={0}
              cy={0}
              r={12}
              fill={u.state === 'gone' ? '#334155' : baseColor}
              stroke={u.state === 'hero' ? '#ffffff' : CARTOON_INK}
              strokeWidth={2.6}
              opacity={u.state === 'gone' ? 0.5 : 1}
            />
            {u.state === 'gone' && (
              <path
                d="M -6 -6 L 6 6 M 6 -6 L -6 6"
                stroke="#ef4444"
                strokeWidth={3.2}
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Medidor líquido vertical con burbujas ascendentes y línea roja de umbral crítico (ej. AGUA, RIESGO, PRESIÓN).
 */
export const LiquidDangerMeter: React.FC<{
  f: number;
  x: number;
  y: number;
  height?: number;
  level: number; // 0 a 1
  dangerThreshold?: number; // 0 a 1
  label?: string;
  liquidColor?: string;
}> = ({
  f,
  x,
  y,
  height = 310,
  level,
  dangerThreshold = 0.78,
  label = 'NIVEL',
  liquidColor = '#0ea5e9',
}) => {
  const clamped = kiwiClamp(level, 0.04, 0.98);
  const tubeW = 54;
  const innerH = height - 16;
  const fillH = innerH * clamped;
  const fillY = height - 8 - fillH;
  const dangerY = height - 8 - innerH * dangerThreshold;
  const isDanger = clamped >= dangerThreshold - 0.05;
  const clipId = `meterClip-${Math.round(x)}-${Math.round(y)}`;

  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={-tubeW / 2 + 5} y={8} width={tubeW - 10} height={innerH} rx={(tubeW - 10) / 2} />
        </clipPath>
      </defs>

      {/* Píldora superior de etiqueta */}
      <g transform="translate(0 -26)">
        <rect x={-52} y={-18} width={104} height={32} rx={16} fill="#0284c7" stroke={CARTOON_INK} strokeWidth={3.5} />
        <text x={0} y={4} textAnchor="middle" fill="#ffffff" fontSize={16} fontWeight={900}>
          {label}
        </text>
      </g>

      {/* Tubo exterior */}
      <rect
        x={-tubeW / 2}
        y={0}
        width={tubeW}
        height={height}
        rx={tubeW / 2}
        fill="#0f172a"
        stroke="#e2e8f0"
        strokeWidth={4}
      />

      {/* Líquido interior animado con burbujas */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x={-tubeW / 2}
          y={fillY}
          width={tubeW}
          height={fillH + 16}
          fill={isDanger ? '#ef4444' : liquidColor}
        />
        <ellipse
          cx={Math.sin(f * 0.12) * 4}
          cy={fillY}
          rx={tubeW * 0.48}
          ry={6}
          fill="#bae6fd"
          opacity={0.75}
        />
        {[0, 1, 2, 3].map((b) => {
          const by = fillY + fillH - (((f * (1.8 + b * 0.4) + b * 37) % Math.max(24, fillH)));
          const bx = (b % 2 === 0 ? -1 : 1) * (6 + b * 2) + Math.sin(f * 0.1 + b) * 3;
          return <circle key={b} cx={bx} cy={by} r={3.2 + (b % 2) * 1.5} fill="#e0f2fe" opacity={0.7} />;
        })}
      </g>

      {/* Marcas de graduación y umbral rojo */}
      {[0.2, 0.4, 0.6, 0.8].map((tick) => {
        const ty = height - 8 - innerH * tick;
        return <line key={tick} x1={-tubeW / 2 - 8} y1={ty} x2={-tubeW / 2} y2={ty} stroke="#cbd5e1" strokeWidth={2.5} />;
      })}
      <line
        x1={-tubeW / 2 - 6}
        y1={dangerY}
        x2={tubeW / 2 + 6}
        y2={dangerY}
        stroke="#ef4444"
        strokeWidth={4}
        strokeDasharray="6 4"
      />
    </g>
  );
};

/**
 * Barra de vida / energía estilo videojuego con drenado dramático y alerta parpadeante.
 */
export const GameHealthBarHUD: React.FC<{
  f: number;
  fps: number;
  x: number;
  y: number;
  width?: number;
  segments?: number;
  fromRatio: number;
  toRatio: number;
  drainStartSec?: number;
  drainDurSec?: number;
  label?: string;
}> = ({
  f,
  fps,
  x,
  y,
  width = 360,
  segments = 10,
  fromRatio,
  toRatio,
  drainStartSec = 0.2,
  drainDurSec = 0.85,
  label = 'VIDA',
}) => {
  const t = f / fps;
  const p = kiwiEase((t - drainStartSec) / Math.max(0.1, drainDurSec));
  const currentRatio = kiwiClamp(kiwiMix(fromRatio, toRatio, p));
  const activeSegs = Math.max(0, Math.round(currentRatio * segments));
  const isCritical = currentRatio <= 0.25;
  const barColor = isCritical ? '#ef4444' : currentRatio <= 0.55 ? '#facc15' : '#22c55e';
  const segW = (width - 24 - (segments - 1) * 5) / segments;

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-width / 2}
        y={-28}
        width={width}
        height={56}
        rx={16}
        fill="#0f172a"
        stroke="#e2e8f0"
        strokeWidth={CARTOON_STROKE}
      />

      {/* Píldora superior VIDA */}
      <g transform={`translate(${-width / 2 + 54} -30)`}>
        <rect x={-42} y={-14} width={84} height={26} rx={13} fill="#ec4899" stroke={CARTOON_INK} strokeWidth={3} />
        <text x={0} y={5} textAnchor="middle" fill="#ffffff" fontSize={14} fontWeight={900}>
          {label}
        </text>
      </g>

      {Array.from({length: segments}).map((_, i) => {
        const sx = -width / 2 + 12 + i * (segW + 5);
        const lit = i < activeSegs;
        return (
          <rect
            key={i}
            x={sx}
            y={-15}
            width={segW}
            height={30}
            rx={6}
            fill={lit ? barColor : '#1e293b'}
            stroke={CARTOON_INK}
            strokeWidth={2}
          />
        );
      })}

      {isCritical && (
        <g transform={`translate(${width / 2 + 38} 0) scale(${1 + Math.sin(f * 0.35) * 0.12})`}>
          <polygon points="0,-24 24,20 -24,20" fill="#facc15" stroke={CARTOON_INK} strokeWidth={3.8} strokeLinejoin="round" />
          <text x={0} y={14} textAnchor="middle" fill={CARTOON_INK} fontSize={24} fontWeight={900}>
            !
          </text>
        </g>
      )}
    </g>
  );
};

/**
 * Calendario de pared con hojas que se arrancan y caen con física (paso rápido de días/semanas).
 */
export const TearOffCalendar: React.FC<{
  f: number;
  fps: number;
  x: number;
  y: number;
  header?: string;
  pages: string[];
  startSec?: number;
  secPerPage?: number;
}> = ({f, fps, x, y, header = 'DÍA', pages, startSec = 0.2, secPerPage = 0.55}) => {
  const t = f / fps;
  const elapsed = Math.max(0, t - startSec);
  const rawIndex = elapsed / Math.max(0.15, secPerPage);
  const currentIdx = Math.min(pages.length - 1, Math.floor(rawIndex));
  const tearFrac = rawIndex - Math.floor(rawIndex);
  const prevIdx = currentIdx > 0 ? currentIdx - 1 : -1;
  const pop = bounceSpring(f, fps, 0);

  return (
    <g transform={`translate(${x} ${y}) scale(${pop}) rotate(4)`}>
      <rect x={-76} y={-86} width={152} height={172} rx={18} fill={CARTOON_INK} opacity={0.35} transform="translate(6 8)" />
      <rect x={-76} y={-86} width={152} height={172} rx={18} fill="#ffffff" stroke={CARTOON_INK} strokeWidth={CARTOON_STROKE} />
      <path
        d="M -76 -40 H 76 V -68 Q 76 -86 58 -86 H -58 Q -76 -86 -76 -68 Z"
        fill="#ef4444"
        stroke={CARTOON_INK}
        strokeWidth={CARTOON_STROKE}
      />
      <text x={0} y={-56} textAnchor="middle" fill="#ffffff" fontSize={19} fontWeight={900}>
        {header}
      </text>
      <text x={0} y={36} textAnchor="middle" fill="#0f172a" fontSize={pages[currentIdx]?.length > 4 ? 24 : 58} fontWeight={900}>
        {pages[currentIdx]}
      </text>

      {/* Hoja anterior cayendo arrancada */}
      {prevIdx >= 0 && currentIdx < pages.length && tearFrac < 0.75 && (
        <g
          transform={`translate(${-tearFrac * 48} ${tearFrac * 145}) rotate(${-tearFrac * 28})`}
          opacity={1 - tearFrac / 0.75}
        >
          <rect x={-72} y={-38} width={144} height={120} rx={12} fill="#f8fafc" stroke={CARTOON_INK} strokeWidth={3.5} />
          <text x={0} y={34} textAnchor="middle" fill="#475569" fontSize={pages[prevIdx]?.length > 4 ? 22 : 50} fontWeight={900}>
            {pages[prevIdx]}
          </text>
        </g>
      )}
    </g>
  );
};
