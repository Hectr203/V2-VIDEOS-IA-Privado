import React from 'react';
import {CARTOON_INK} from '../cartoon/sharedCartoonStyle';
import {kiwiSeeded} from '../math/kiwiMotion';

export type SunburstPalette = 'magenta' | 'gold' | 'cyan' | 'danger' | 'emerald';

const SUNBURST_COLORS: Record<SunburstPalette, {bgA: string; bgB: string; ray: string; glow: string}> = {
  magenta: {bgA: '#3b0764', bgB: '#701a75', ray: '#d946ef', glow: '#f0abfc'},
  gold: {bgA: '#7c2d12', bgB: '#b45309', ray: '#facc15', glow: '#fef08a'},
  cyan: {bgA: '#0c4a6e', bgB: '#1d4ed8', ray: '#38bdf8', glow: '#bae6fd'},
  danger: {bgA: '#450a0a', bgB: '#991b1b', ray: '#fb7185', glow: '#fecdd3'},
  emerald: {bgA: '#064e3b', bgB: '#047857', ray: '#34d399', glow: '#a7f3d0'},
};

/**
 * Fondo de rayos radiales giratorios de alta energía emocional (revelación, giro, peligro, logro).
 */
export const RadialSunburstBackdrop: React.FC<{
  f: number;
  width: number;
  height: number;
  palette?: SunburstPalette;
  rayCount?: number;
  spinSpeed?: number;
  centerX?: number;
  centerY?: number;
}> = ({f, width, height, palette = 'magenta', rayCount = 18, spinSpeed = 0.38, centerX, centerY}) => {
  const c = SUNBURST_COLORS[palette];
  const cx = centerX ?? width * 0.5;
  const cy = centerY ?? height * 0.48;
  const radius = Math.hypot(width, height) * 1.15;
  const rot = f * spinSpeed;
  const stepDeg = 360 / rayCount;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id={`sunburstBg-${palette}`} cx="50%" cy="48%" r="70%">
          <stop offset="0%" stopColor={c.bgB} />
          <stop offset="100%" stopColor={c.bgA} />
        </radialGradient>
        <radialGradient id={`sunburstGlow-${palette}`} cx="50%" cy="48%" r="48%">
          <stop offset="0%" stopColor={c.glow} stopOpacity="0.48" />
          <stop offset="60%" stopColor={c.ray} stopOpacity="0.12" />
          <stop offset="100%" stopColor={c.bgA} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={`url(#sunburstBg-${palette})`} />

      <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
        {Array.from({length: rayCount}).map((_, i) => {
          const a1 = ((i * stepDeg - stepDeg * 0.24) * Math.PI) / 180;
          const a2 = ((i * stepDeg + stepDeg * 0.24) * Math.PI) / 180;
          const x1 = Math.cos(a1) * radius;
          const y1 = Math.sin(a1) * radius;
          const x2 = Math.cos(a2) * radius;
          const y2 = Math.sin(a2) * radius;
          return <polygon key={i} points={`0,0 ${x1},${y1} ${x2},${y2}`} fill={c.ray} opacity={i % 2 === 0 ? 0.34 : 0.18} />;
        })}
      </g>

      <rect width={width} height={height} fill={`url(#sunburstGlow-${palette})`} />

      {Array.from({length: 14}).map((_, i) => {
        const angle = kiwiSeeded(i * 17 + 3) * Math.PI * 2;
        const dist = ((kiwiSeeded(i * 31 + 9) * 520 + f * (2.6 + (i % 4))) % (Math.max(width, height) * 0.62)) + 45;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        const r = 3 + (i % 4) * 2.2;
        return <circle key={i} cx={px} cy={py} r={r} fill={c.glow} opacity={0.55} />;
      })}
    </svg>
  );
};

/**
 * Fondo de líneas de velocidad cinéticas para persecuciones, carreras o urgencia.
 */
export const SpeedLinesBackdrop: React.FC<{
  f: number;
  width: number;
  height: number;
  bgTop?: string;
  bgBot?: string;
  accent?: string;
  direction?: 'left' | 'right';
}> = ({f, width, height, bgTop = '#1e1b4b', bgBot = '#312e81', accent = '#38bdf8', direction = 'left'}) => {
  const dir = direction === 'left' ? -1 : 1;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="speedBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={bgTop} />
          <stop offset="100%" stopColor={bgBot} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#speedBgGrad)" />
      {Array.from({length: 26}).map((_, i) => {
        const y = ((i + 0.4) / 26) * height;
        const speed = 26 + (i % 5) * 11;
        const lineLen = 130 + (i % 4) * 95;
        const rawX = kiwiSeeded(i * 23 + 5) * (width + lineLen) + f * speed * dir;
        const x = (((rawX % (width + lineLen)) + (width + lineLen)) % (width + lineLen)) - lineLen;
        const isAccent = i % 3 === 0;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + lineLen}
            y2={y}
            stroke={isAccent ? accent : '#ffffff'}
            strokeWidth={isAccent ? 5 : 2.6}
            strokeLinecap="round"
            opacity={isAccent ? 0.52 : 0.28}
          />
        );
      })}
    </svg>
  );
};

/**
 * Escenario oscuro dramático con reflector cenital volumétrico (aislamiento emocional o misterio).
 */
export const SpotlightStageBackdrop: React.FC<{
  f: number;
  width: number;
  height: number;
  spotX?: number;
  floorY?: number;
  beamColor?: string;
}> = ({f, width, height, spotX, floorY, beamColor = '#a5b4fc'}) => {
  const sx = spotX ?? width * 0.5;
  const fy = floorY ?? height * 0.76;
  const sway = Math.sin(f * 0.03) * 14;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="spotBeamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={beamColor} stopOpacity="0.42" />
          <stop offset="100%" stopColor={beamColor} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="#0b1026" />
      <rect x={0} y={fy} width={width} height={height - fy} fill="#131b3a" />
      <line x1={0} y1={fy} x2={width} y2={fy} stroke="#312e81" strokeWidth={4} />

      <polygon
        points={`${sx - 55},0 ${sx + 55},0 ${sx + 235 + sway},${fy} ${sx - 235 + sway},${fy}`}
        fill="url(#spotBeamGrad)"
      />
      <ellipse cx={sx + sway} cy={fy} rx={235} ry={30} fill={beamColor} opacity={0.22} />

      {Array.from({length: 12}).map((_, i) => {
        const mx = sx + (kiwiSeeded(i * 19 + 2) - 0.5) * 280 + sway * 0.5;
        const my = ((kiwiSeeded(i * 37 + 1) * fy - f * 0.55) % fy + fy) % fy;
        return <circle key={i} cx={mx} cy={my} r={2.5 + (i % 3)} fill="#e0e7ff" opacity={0.45} />;
      })}
    </svg>
  );
};

/**
 * Pantalla dividida de enfrentamiento "VS" con rayo central estilo cartoon tinta #0b0d10.
 */
export const VersusSplitBackdrop: React.FC<{
  f: number;
  width: number;
  height: number;
  leftColor?: string;
  rightColor?: string;
  showBadge?: boolean;
}> = ({f, width, height, leftColor = '#ea580c', rightColor = '#0284c7', showBadge = true}) => {
  const cx = width * 0.5;
  const cy = height * 0.5;
  const jitter = Math.sin(f * 0.45) * 4;
  const pulse = 1 + Math.sin(f * 0.25) * 0.06;

  const boltPoints = [
    `${cx + 26 + jitter},0`,
    `${cx - 22 - jitter},${height * 0.28}`,
    `${cx + 20 + jitter},${height * 0.46}`,
    `${cx - 26 - jitter},${height * 0.72}`,
    `${cx + 18 + jitter},${height}`,
  ];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0}}>
      <polygon
        points={`0,0 ${cx + 26},0 ${cx - 26},${height} 0,${height}`}
        fill={leftColor}
      />
      <polygon
        points={`${cx + 26},0 ${width},0 ${width},${height} ${cx - 26},${height}`}
        fill={rightColor}
      />

      <polyline
        points={boltPoints.join(' ')}
        fill="none"
        stroke={CARTOON_INK}
        strokeWidth={18}
        strokeLinejoin="round"
      />
      <polyline
        points={boltPoints.join(' ')}
        fill="none"
        stroke="#facc15"
        strokeWidth={9}
        strokeLinejoin="round"
      />

      {showBadge && (
        <g transform={`translate(${cx} ${cy}) scale(${pulse})`}>
          <circle cx={0} cy={6} r={54} fill={CARTOON_INK} opacity={0.4} />
          <circle cx={0} cy={0} r={52} fill="#e11d48" stroke={CARTOON_INK} strokeWidth={5} />
          <text
            x={0}
            y={13}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={38}
            fontWeight={900}
            letterSpacing={1.5}
          >
            VS
          </text>
        </g>
      )}
    </svg>
  );
};
