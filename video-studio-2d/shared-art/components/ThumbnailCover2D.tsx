import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CARTOON_INK} from '../cartoon/sharedCartoonStyle';

export interface ThumbnailCover2DProps {
  aspectRatio?: '9:16' | '16:9';
  badge?: string;
  headline: string;
  highlight?: string;
  accentColor?: string;
  bgTop?: string;
  bgMid?: string;
  bgBottom?: string;
  children?: React.ReactNode;
}

/**
 * Portada / Miniatura oficial 2D de alto impacto e ilustrativa.
 * - En 9:16 (1080x1920): 1 sola miniatura universal para Reels, TikTok, Shorts y Facebook Reels,
 *   respetando zonas seguras (título arriba-centro 3–5 palabras + ilustración héroe grande abajo-centro).
 * - En 16:9 (1920x1080): 1 sola miniatura universal para YouTube y Facebook Horizontal
 *   (titular gigante a la izquierda + escena/personaje ilustrativo a la derecha).
 */
export const ThumbnailCover2D: React.FC<ThumbnailCover2DProps> = ({
  aspectRatio = '9:16',
  badge = 'DATO REAL',
  headline,
  highlight,
  accentColor = '#facc15',
  bgTop = '#1e1338',
  bgMid = '#351c54',
  bgBottom = '#0d091a',
  children,
}) => {
  const isHorizontal = aspectRatio === '16:9';

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${bgTop} 0%, ${bgMid} 52%, ${bgBottom} 100%)`,
        fontFamily: 'StudioSans, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Resplandor radial dramático detrás del elemento ilustrativo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHorizontal
            ? `radial-gradient(circle at 70% 54%, ${accentColor}44 0%, transparent 58%)`
            : `radial-gradient(circle at 50% 62%, ${accentColor}40 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Marco sutil interior de alto contraste */}
      <div
        style={{
          position: 'absolute',
          inset: 22,
          borderRadius: 34,
          border: '4px solid rgba(255, 255, 255, 0.14)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Escena / personaje ilustrativo héroe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
        }}
      >
        {children}
      </div>

      {/* Viñeta protectora para legibilidad instantánea en móvil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHorizontal
            ? 'linear-gradient(90deg, rgba(8,10,20,0.88) 0%, rgba(8,10,20,0.52) 48%, rgba(8,10,20,0.08) 78%)'
            : 'linear-gradient(180deg, rgba(8,10,20,0.86) 0%, rgba(8,10,20,0.22) 44%, rgba(8,10,20,0.08) 72%, rgba(8,10,20,0.72) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Bloque tipográfico de portada (3–5 palabras gigantes, entretenido y directo) */}
      <div
        style={{
          position: 'absolute',
          zIndex: 4,
          ...(isHorizontal
            ? {
                left: 88,
                top: '50%',
                width: 860,
                transform: 'translateY(-50%)',
                alignItems: 'flex-start',
                textAlign: 'left' as const,
              }
            : {
                left: 64,
                right: 64,
                top: 168,
                alignItems: 'center',
                textAlign: 'center' as const,
              }),
          display: 'flex',
          flexDirection: 'column',
          gap: isHorizontal ? 24 : 20,
        }}
      >
        {badge && (
          <div
            style={{
              background: accentColor,
              color: CARTOON_INK,
              border: `5px solid ${CARTOON_INK}`,
              borderRadius: 999,
              padding: isHorizontal ? '10px 30px' : '10px 28px',
              fontSize: isHorizontal ? 30 : 32,
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transform: 'rotate(-2deg)',
              boxShadow: `6px 8px 0px ${CARTOON_INK}`,
            }}
          >
            {badge}
          </div>
        )}

        <div
          style={{
            color: '#ffffff',
            fontSize: isHorizontal ? 96 : 88,
            fontWeight: 900,
            lineHeight: 1.03,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            WebkitTextStroke: `5px ${CARTOON_INK}`,
            paintOrder: 'stroke fill',
            textShadow: `0 10px 0 ${CARTOON_INK}, 0 18px 34px rgba(0,0,0,0.75)`,
          }}
        >
          {headline}
        </div>

        {highlight && (
          <div
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: `5.5px solid ${CARTOON_INK}`,
              borderRadius: 22,
              padding: isHorizontal ? '12px 32px' : '12px 30px',
              fontSize: isHorizontal ? 58 : 54,
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              transform: 'rotate(1.4deg)',
              boxShadow: `7px 9px 0px ${CARTOON_INK}`,
            }}
          >
            {highlight}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
