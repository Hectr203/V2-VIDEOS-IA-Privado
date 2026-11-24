import React from 'react';
import {Easing, interpolate} from 'remotion';
import {kiwiClamp, kiwiMix, kiwiSeeded} from '../math/kiwiMotion';

export type CameraShotMode =
  | 'wide'
  | 'medium'
  | 'closeup'
  | 'extreme-closeup'
  | 'dutch-left'
  | 'dutch-right'
  | 'whip-left'
  | 'whip-right'
  | 'punch';

export interface CameraBeat {
  /** Segundo de inicio dentro de la escena */
  fromSec: number;
  /** Tipo de encuadre o movimiento */
  mode: CameraShotMode;
  /** Punto focal X en coordenadas del stage (por defecto centro) */
  focusX?: number;
  /** Punto focal Y en coordenadas del stage (por defecto centro) */
  focusY?: number;
  /** Multiplicador opcional de zoom sobre el preset del modo */
  zoom?: number;
  /** Intensidad de vibración de impacto (0 a 1) al entrar el beat */
  shake?: number;
  /** Duración de transición en segundos (default: 0.28s para corte ágil, 0.06s para punch directo) */
  transitionSec?: number;
}

const MODE_PRESETS: Record<CameraShotMode, {zoom: number; rot: number; whipOffset: number}> = {
  wide: {zoom: 1.0, rot: 0, whipOffset: 0},
  medium: {zoom: 1.18, rot: 0, whipOffset: 0},
  closeup: {zoom: 1.42, rot: 0, whipOffset: 0},
  'extreme-closeup': {zoom: 1.78, rot: 0, whipOffset: 0},
  'dutch-left': {zoom: 1.24, rot: -4.2, whipOffset: 0},
  'dutch-right': {zoom: 1.24, rot: 4.2, whipOffset: 0},
  'whip-left': {zoom: 1.12, rot: -1.8, whipOffset: -220},
  'whip-right': {zoom: 1.12, rot: 1.8, whipOffset: 220},
  punch: {zoom: 1.52, rot: -1.5, whipOffset: 0},
};

export interface DynamicCameraRig2DProps {
  f: number;
  fps: number;
  width: number;
  height: number;
  beats: CameraBeat[];
  /** Deriva orgánica continua para que el plano nunca quede congelado */
  driftAmount?: number;
  children: React.ReactNode;
}

/**
 * Rig multicámara 2D por sub-beats inspirado en narrativa dinámica:
 * Permite encadenar cambios de plano cada 1.2–2.5s dentro de una misma escena
 * (wide -> closeup -> punch -> whip-pan) con interpolación suave, shake de impacto y deriva viva.
 */
export const DynamicCameraRig2D: React.FC<DynamicCameraRig2DProps> = ({
  f,
  fps,
  width,
  height,
  beats,
  driftAmount = 6,
  children,
}) => {
  const t = f / fps;
  const cx = width / 2;
  const cy = height / 2;

  const sorted = beats.length > 0 ? [...beats].sort((a, b) => a.fromSec - b.fromSec) : [{fromSec: 0, mode: 'wide' as const}];

  let activeIdx = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (t >= sorted[i].fromSec) activeIdx = i;
  }

  const curr = sorted[activeIdx];
  const prev = activeIdx > 0 ? sorted[activeIdx - 1] : curr;

  const currPreset = MODE_PRESETS[curr.mode];
  const prevPreset = MODE_PRESETS[prev.mode];

  const transDur = curr.transitionSec ?? (curr.mode === 'punch' ? 0.09 : 0.26);
  const rawP = activeIdx === 0 ? 1 : kiwiClamp((t - curr.fromSec) / Math.max(0.03, transDur));
  const easeP = interpolate(rawP, [0, 1], [0, 1], {
    easing: curr.mode === 'punch' ? Easing.out(Easing.back(1.6)) : Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const prevZoom = curr.zoom && activeIdx === 0 ? curr.zoom : prev.zoom ?? prevPreset.zoom;
  const targetZoom = curr.zoom ?? currPreset.zoom;
  const zoom = kiwiMix(prevZoom, targetZoom, easeP);

  const prevFx = prev.focusX ?? cx;
  const prevFy = prev.focusY ?? cy;
  const currFx = curr.focusX ?? cx;
  const currFy = curr.focusY ?? cy;

  const fx = kiwiMix(prevFx, currFx, easeP);
  const fy = kiwiMix(prevFy, currFy, easeP);
  const rot = kiwiMix(prevPreset.rot, currPreset.rot, easeP);

  // Impulso de barrido rápido (whip-pan) que se disipa al asentar el plano
  const whipImpulse = activeIdx > 0 ? currPreset.whipOffset * (1 - easeP) : 0;

  // Vibración amortiguada de impacto (camera shake determinista)
  const elapsedInBeat = Math.max(0, t - curr.fromSec);
  const shakeDecay = curr.shake ? Math.exp(-elapsedInBeat * 11) * curr.shake : 0;
  const shakeX = shakeDecay * (kiwiSeeded(f * 13 + 7) * 2 - 1) * 22;
  const shakeY = shakeDecay * (kiwiSeeded(f * 29 + 3) * 2 - 1) * 18;

  // Deriva orgánica respiratoria constante (cero fotogramas muertos)
  const driftX = Math.sin(f * 0.035) * driftAmount;
  const driftY = Math.cos(f * 0.028) * (driftAmount * 0.65);

  const tx = (cx - fx) * zoom + whipImpulse + shakeX + driftX;
  const ty = (cy - fy) * zoom + shakeY + driftY;

  const showWhipStreaks = Math.abs(whipImpulse) > 28;

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width,
          height,
          transformOrigin: `${cx}px ${cy}px`,
          transform: `translate3d(${tx}px, ${ty}px, 0px) scale(${zoom}) rotate(${rot}deg)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>

      {showWhipStreaks && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: kiwiClamp(Math.abs(whipImpulse) / 180)}}
        >
          {Array.from({length: 10}).map((_, i) => {
            const y = ((i + 0.5) / 10) * height;
            const len = 140 + (i % 3) * 90;
            const x = ((kiwiSeeded(i * 19 + f) * width) % width);
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x + len}
                y2={y}
                stroke="#ffffff"
                strokeWidth={3 + (i % 3) * 2}
                strokeLinecap="round"
                opacity={0.45}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};
