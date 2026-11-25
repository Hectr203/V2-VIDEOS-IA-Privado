import React from 'react';
import {Easing, interpolate} from 'remotion';

/**
 * Subtítulos minimalistas de estudio de lujo (3 a 5 palabras centradas arriba,
 * contexto en plata tenue y palabra activa en blanco puro brillante).
 */
export const MinimalLuxuryCaptions3D: React.FC<{
  words: {word: string; start: number; end: number}[];
  f: number;
  fps: number;
  topPercent?: number;
}> = ({words, f, fps, topPercent = 16}) => {
  if (!words || words.length === 0) return null;
  const time = f / fps;

  let activeIdx = words.findIndex((w) => time >= w.start && time < w.end);
  if (activeIdx < 0) {
    const nextIdx = words.findIndex((w) => w.start > time);
    activeIdx = nextIdx < 0 ? words.length - 1 : Math.max(0, nextIdx - 1);
  }

  // Agrupar en frases cortas de 3-4 palabras para ritmo hipnótico de lectura rápida
  const groupSize = 4;
  const groupIdx = Math.floor(activeIdx / groupSize);
  const slice = words.slice(groupIdx * groupSize, (groupIdx + 1) * groupSize);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPercent}%`,
        left: '8%',
        right: '8%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        pointerEvents: 'none',
        textAlign: 'center',
      }}
    >
      {slice.map((item, idx) => {
        const globalIdx = groupIdx * groupSize + idx;
        const isCurrent = globalIdx === activeIdx;
        return (
          <span
            key={`${item.word}-${globalIdx}`}
            style={{
              fontSize: 48,
              fontWeight: isCurrent ? 800 : 500,
              color: isCurrent ? '#ffffff' : 'rgba(203, 213, 225, 0.56)',
              textShadow: isCurrent ? '0 0 24px rgba(255,255,255,0.32)' : '0 2px 10px rgba(0,0,0,0.65)',
              letterSpacing: '-0.02em',
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Píldora satinada oscura o dorada para métricas técnicas ("1 MES", "2,5 µm", "×10 MÁS ORO").
 */
export const SatinMetricPill3D: React.FC<{
  f: number;
  delayFrames?: number;
  xPercent: number;
  yPercent: number;
  text: string;
  variant?: 'dark' | 'gold' | 'danger' | 'silver';
}> = ({f, delayFrames = 0, xPercent, yPercent, text, variant = 'dark'}) => {
  if (f < delayFrames) return null;
  const p = interpolate(f - delayFrames, [0, 14], [0, 1], {
    easing: Easing.out(Easing.back(1.45)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const themes = {
    dark: {
      bg: 'rgba(30, 26, 22, 0.86)',
      border: 'rgba(245, 196, 81, 0.38)',
      fg: '#f8fafc',
      shadow: '0 10px 28px rgba(0,0,0,0.6)',
    },
    gold: {
      bg: 'linear-gradient(135deg, #fde68a 0%, #eab308 55%, #ca8a04 100%)',
      border: 'rgba(255, 255, 255, 0.55)',
      fg: '#1c1917',
      shadow: '0 8px 30px rgba(234, 179, 8, 0.35)',
    },
    danger: {
      bg: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      border: 'rgba(254, 202, 202, 0.45)',
      fg: '#ffffff',
      shadow: '0 8px 26px rgba(220, 38, 38, 0.4)',
    },
    silver: {
      bg: 'rgba(241, 245, 249, 0.92)',
      border: '#ffffff',
      fg: '#0f172a',
      shadow: '0 10px 26px rgba(0,0,0,0.45)',
    },
  };

  const th = themes[variant];

  return (
    <div
      style={{
        position: 'absolute',
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        transform: `translate(-50%, -50%) scale(${p})`,
        background: th.bg,
        border: `1.5px solid ${th.border}`,
        color: th.fg,
        boxShadow: th.shadow,
        padding: '12px 28px',
        borderRadius: 999,
        fontSize: 27,
        fontWeight: 800,
        letterSpacing: '0.03em',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

/**
 * Destello óptico anamórfico de 4 puntas para resaltar brillo metálico espejo.
 */
export const AnamorphicSparkle3D: React.FC<{
  f: number;
  startFrame: number;
  durationFrames?: number;
  xPercent: number;
  yPercent: number;
  size?: number;
  color?: string;
}> = ({f, startFrame, durationFrames = 36, xPercent, yPercent, size = 130, color = '#fef08a'}) => {
  const local = f - startFrame;
  if (local < 0 || local > durationFrames) return null;
  const p = local / durationFrames;
  const intensity = Math.sin(p * Math.PI);
  const rot = local * 1.4;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{
        position: 'absolute',
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        transform: `translate(-50%, -50%) scale(${0.4 + intensity * 0.85}) rotate(${rot}deg)`,
        opacity: intensity,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <radialGradient id="sparkleCore3d" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="45%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={34} fill="url(#sparkleCore3d)" />
      <path d="M 0 -48 Q 2.5 -4 48 0 Q 2.5 4 0 48 Q -2.5 4 -48 0 Q -2.5 -4 0 -48 Z" fill="#ffffff" />
    </svg>
  );
};

/**
 * Tarjeta apilada de leyenda de capas físicas (ej. ORO · 2,5 µm / PARED / PLATA).
 */
export const LayerLegendStack3D: React.FC<{
  f: number;
  delayFrames?: number;
  yPercent?: number;
  rows: {label: string; bg: string; fg: string}[];
}> = ({f, delayFrames = 8, yPercent = 76, rows}) => {
  if (f < delayFrames) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: `${yPercent}%`,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        width: 420,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 20px 45px rgba(0,0,0,0.72)',
        border: '1px solid rgba(255,255,255,0.2)',
        pointerEvents: 'none',
      }}
    >
      {rows.map((r, idx) => {
        const rowP = interpolate(f - (delayFrames + idx * 6), [0, 12], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={r.label}
            style={{
              background: r.bg,
              color: r.fg,
              padding: '13px 22px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 23,
              letterSpacing: '0.06em',
              opacity: rowP,
              transform: `translateY(${(1 - rowP) * 14}px)`,
            }}
          >
            {r.label}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Portada / Miniatura oficial 3D PBR (9:16 universal para Reels/TikTok/Shorts y 16:9 para YouTube/FB).
 */
export const ThumbnailCover3D: React.FC<{
  aspectRatio?: '9:16' | '16:9';
  badge?: string;
  headline: string;
  highlight?: string;
  children?: React.ReactNode;
}> = ({aspectRatio = '9:16', badge = 'INGENIERÍA 3D', headline, highlight, children}) => {
  const isHorizontal = aspectRatio === '16:9';

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: 'StudioSans, system-ui, sans-serif'}}>
      <div style={{position: 'absolute', inset: 0}}>{children}</div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHorizontal
            ? 'linear-gradient(90deg, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.45) 48%, rgba(5,5,7,0.05) 80%)'
            : 'linear-gradient(180deg, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.18) 46%, rgba(5,5,7,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          ...(isHorizontal
            ? {left: 88, top: '50%', width: 840, transform: 'translateY(-50%)', alignItems: 'flex-start', textAlign: 'left' as const}
            : {left: 64, right: 64, top: 170, alignItems: 'center', textAlign: 'center' as const}),
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          pointerEvents: 'none',
        }}
      >
        {badge && (
          <div
            style={{
              background: 'linear-gradient(135deg, #fde68a 0%, #eab308 55%, #ca8a04 100%)',
              color: '#1c1917',
              padding: '10px 28px',
              borderRadius: 999,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            color: '#ffffff',
            fontSize: isHorizontal ? 92 : 84,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            textShadow: '0 12px 36px rgba(0,0,0,0.9)',
          }}
        >
          {headline}
        </div>
        {highlight && (
          <div
            style={{
              background: 'rgba(220, 38, 38, 0.94)',
              border: '2px solid rgba(254, 202, 202, 0.6)',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: 18,
              fontSize: isHorizontal ? 50 : 48,
              fontWeight: 900,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              boxShadow: '0 12px 30px rgba(220, 38, 38, 0.45)',
            }}
          >
            {highlight}
          </div>
        )}
      </div>
    </div>
  );
};
