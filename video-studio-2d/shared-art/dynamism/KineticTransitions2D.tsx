import React from 'react';
import {CARTOON_INK, CARTOON_STROKE} from '../cartoon/sharedCartoonStyle';
import {bounceSpring, kiwiClamp, kiwiEase} from '../math/kiwiMotion';

/**
 * Portal espiral de anillos concéntricos giratorios (ideal para ganchos 0-3s y saltos de mundo).
 */
export const SpiralRingPortal: React.FC<{
  f: number;
  fps: number;
  startFrame?: number;
  durationFrames?: number;
  width: number;
  height: number;
  colors?: [string, string, string];
}> = ({
  f,
  fps: _fps,
  startFrame = 0,
  durationFrames = 34,
  width,
  height,
  colors = ['#ffffff', '#facc15', '#f97316'],
}) => {
  const local = f - startFrame;
  if (local < 0 || local > durationFrames) return null;

  const p = kiwiClamp(local / durationFrames);
  const expand = kiwiEase(p * 1.25);
  const fade = p > 0.72 ? 1 - (p - 0.72) / 0.28 : 1;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const maxR = Math.hypot(width, height) * 0.72;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: fade}}
    >
      <g transform={`translate(${cx} ${cy}) rotate(${local * 9.5})`}>
        {[0, 1, 2, 3, 4].map((idx) => {
          const r = 45 + idx * 78 + expand * maxR * 0.85;
          const circ = 2 * Math.PI * r;
          const dash = circ * (0.62 - idx * 0.06);
          return (
            <circle
              key={idx}
              cx={0}
              cy={0}
              r={r}
              fill="none"
              stroke={colors[idx % colors.length]}
              strokeWidth={22 - idx * 2.5}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform={`rotate(${idx * 68 + local * (idx % 2 === 0 ? 5 : -6)})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

/**
 * Comparativa en pantalla dividida diagonal o vertical en vivo (antes/después, dos realidades paralelas).
 */
export const DiagonalSplitCompare: React.FC<{
  width: number;
  height: number;
  f: number;
  fps: number;
  revealDelayFrames?: number;
  slantPx?: number;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  dividerColor?: string;
}> = ({
  width,
  height,
  f,
  fps,
  revealDelayFrames = 0,
  slantPx = 64,
  leftContent,
  rightContent,
  dividerColor = '#ffffff',
}) => {
  const p = kiwiClamp(bounceSpring(f, fps, revealDelayFrames));
  const mid = width * 0.5 * p + width * 0.5 * (1 - p);
  const topX = mid + slantPx * 0.5;
  const botX = mid - slantPx * 0.5;

  const leftClip = `polygon(0px 0px, ${topX}px 0px, ${botX}px ${height}px, 0px ${height}px)`;
  const rightClip = `polygon(${topX}px 0px, ${width}px 0px, ${width}px ${height}px, ${botX}px ${height}px)`;

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, clipPath: leftClip}}>{leftContent}</div>
      <div style={{position: 'absolute', inset: 0, clipPath: rightClip}}>{rightContent}</div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <line x1={topX} y1={0} x2={botX} y2={height} stroke={CARTOON_INK} strokeWidth={14} />
        <line x1={topX} y1={0} x2={botX} y2={height} stroke={dividerColor} strokeWidth={6} />
      </svg>
    </div>
  );
};

/**
 * Rótulo inclinado de impacto cartoon con resorte, borde de tinta #0b0d10 y sombra sólida.
 */
export const TiltedPunchBanner: React.FC<{
  f: number;
  fps: number;
  delayFrames?: number;
  x: number;
  y: number;
  text: string;
  bg?: string;
  fg?: string;
  tiltDeg?: number;
  fontSize?: number;
}> = ({
  f,
  fps,
  delayFrames = 0,
  x,
  y,
  text,
  bg = '#facc15',
  fg = '#0b0d10',
  tiltDeg = -4.5,
  fontSize = 34,
}) => {
  if (f < delayFrames) return null;
  const s = bounceSpring(f, fps, delayFrames);
  const padX = 28;
  const boxW = Math.max(180, text.length * (fontSize * 0.62) + padX * 2);
  const boxH = fontSize + 30;

  return (
    <g transform={`translate(${x} ${y}) rotate(${tiltDeg}) scale(${s})`}>
      <rect
        x={-boxW / 2 + 6}
        y={-boxH / 2 + 8}
        width={boxW}
        height={boxH}
        rx={boxH * 0.34}
        fill={CARTOON_INK}
        opacity={0.42}
      />
      <rect
        x={-boxW / 2}
        y={-boxH / 2}
        width={boxW}
        height={boxH}
        rx={boxH * 0.34}
        fill={bg}
        stroke={CARTOON_INK}
        strokeWidth={CARTOON_STROKE}
      />
      <text
        x={0}
        y={fontSize * 0.34}
        textAnchor="middle"
        fill={fg}
        fontSize={fontSize}
        fontWeight={900}
        letterSpacing={0.8}
      >
        {text}
      </text>
    </g>
  );
};
