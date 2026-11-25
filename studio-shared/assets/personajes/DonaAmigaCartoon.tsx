import React from 'react';
import {
  CARTOON_INK,
  CartoonArmIK,
  CartoonFaceFeatures,
  CartoonLegIK,
  CartoonMood,
  CartoonPose,
  Vec2,
  cartoonBlink,
  inkProps,
} from './sharedCartoonStyle';

export interface DonaAmigaCartoonProps {
  x?: number;
  y?: number;
  scale?: number;
  flipX?: boolean;
  frame?: number;
  animated?: boolean;
  pose?: CartoonPose;
  mood?: CartoonMood;
  mouthOpen?: number;
  tears?: boolean;
  blush?: boolean;
  showHat?: boolean;
  dressColor?: string;
  shawlColor?: string;
  holdProp?: 'none' | 'flower' | 'script';
}

/**
 * PERSONAJE REUTILIZABLE CANÓNICO (Nov 23): DonaAmigaCartoon
 * Promovido a studio-shared/assets/personajes/ desde don-ramon-fuera-del-set (Escenas 11–12).
 * Permite cambiar colores de vestido/chal, quitar sombrero o sostener props manteniendo el estilo exacto.
 */
export const DonaAmigaCartoon: React.FC<DonaAmigaCartoonProps> = ({
  x = 0,
  y = 0,
  scale = 0.96,
  flipX = false,
  frame = 0,
  animated = true,
  pose = 'explicando',
  mood = 'feliz',
  mouthOpen = 0,
  tears = false,
  blush = true,
  showHat = true,
  dressColor = '#7c5ca3',
  shawlColor = '#e9d5ff',
  holdProp = 'none',
}) => {
  const ink = inkProps();
  const breathY = animated ? Math.sin(frame * 0.085 + 1.2) * 2.2 : 0;
  const headTilt = animated ? Math.sin(frame * 0.05) * 2 : 0;
  const blink = cartoonBlink(frame, animated, 53);

  const hipL: Vec2 = {x: -20, y: -102};
  const hipR: Vec2 = {x: 20, y: -102};
  const footL: Vec2 = {x: -28, y: -17};
  const footR: Vec2 = {x: 28, y: -17};
  const shL: Vec2 = {x: -40, y: -204 + breathY};
  const shR: Vec2 = {x: 40, y: -204 + breathY};

  let handL: Vec2 = {x: -60, y: -124 + breathY};
  let handR: Vec2 = {x: 64, y: -128 + breathY};
  if (pose === 'explicando') {
    handL = {x: -82, y: -174 + Math.sin(frame * 0.14) * 7};
    handR = {x: 84, y: -178 - Math.sin(frame * 0.14) * 7};
  } else if (pose === 'celebrando') {
    handL = {x: -86, y: -252 + Math.sin(frame * 0.18) * 8};
    handR = {x: 86, y: -252 - Math.sin(frame * 0.18) * 8};
  } else if (pose === 'triste_encogido') {
    handL = {x: -20, y: -158 + breathY};
    handR = {x: 20, y: -158 + breathY};
  } else if (pose === 'señalando') {
    handL = {x: -64, y: -130 + breathY};
    handR = {x: 108, y: -242 + breathY};
  }
  if (holdProp !== 'none' && pose !== 'triste_encogido') {
    handR = {x: 86, y: -176 + breathY + (animated ? Math.sin(frame * 0.13) * 5 : 0)};
  }

  return (
    <g transform={`translate(${x} ${y}) scale(${flipX ? -scale : scale} ${scale})`}>
      <CartoonLegIK hip={hipL} foot={footL} bend={1} pantsColor="#4c3563" shoeColor="#241733" thighLen={48} calfLen={48} thickness={20} footDir={-1} />
      <CartoonLegIK hip={hipR} foot={footR} bend={-1} pantsColor="#4c3563" shoeColor="#241733" thighLen={48} calfLen={48} thickness={20} footDir={1} />
      <CartoonArmIK shoulder={shL} handTarget={handL} bend={-1} sleeveColor={dressColor} skin="#e3c19b" sleeveRatio={1.15} upperLen={56} lowerLen={52} thickness={19} handShape="abierta" />

      <g transform={`translate(0 ${breathY})`}>
        <path d="M -40 -210 L 40 -210 L 58 -84 Q 0 -70 -58 -84 Z" fill={dressColor} {...ink} />
        <path d="M -44 -212 Q 0 -178 44 -212 L 46 -184 Q 0 -162 -46 -184 Z" fill={shawlColor} {...ink} />
        <rect x="-12" y="-232" width="24" height="22" rx="7" fill="#e3c19b" {...ink} />
      </g>

      <g transform={`translate(0 ${-272 + breathY * 0.8}) rotate(${headTilt})`}>
        <circle cx="-48" cy="-8" r="22" fill="#473c4f" {...ink} />
        <ellipse cx="-58" cy="4" rx="11" ry="14" fill="#e3c19b" {...ink} />
        <ellipse cx="58" cy="4" rx="11" ry="14" fill="#e3c19b" {...ink} />
        <ellipse cx="0" cy="0" rx="58" ry="50" fill="#e3c19b" {...ink} />
        <path d="M -56 -12 C -50 -52 50 -52 56 -12 C 26 -28 -26 -28 -56 -12 Z" fill="#5b4d66" {...ink} />
        {showHat && (
          <g transform="translate(0 -42)">
            <ellipse cx="0" cy="8" rx="64" ry="12" fill="#5e4382" {...ink} />
            <path d="M -40 8 C -36 -22 36 -22 40 8 Z" fill={dressColor} {...ink} />
            <circle cx="28" cy="0" r="8" fill="#fde047" {...ink} />
          </g>
        )}
        <CartoonFaceFeatures mood={mood} mouthOpen={mouthOpen} blink={blink} tears={tears} blush={blush} eyeY={-4} eyeSpacing={22} mouthY={24} />
      </g>

      <CartoonArmIK
        shoulder={shR}
        handTarget={handR}
        bend={1}
        sleeveColor={dressColor}
        skin="#e3c19b"
        sleeveRatio={1.15}
        upperLen={56}
        lowerLen={52}
        thickness={19}
        handShape={holdProp !== 'none' ? 'puno' : 'abierta'}
      />

      {holdProp === 'flower' && (
        <g transform={`translate(${handR.x + 10} ${handR.y - 24}) rotate(8)`}>
          <path d="M 0 28 Q -4 6 0 -16" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
          <circle cx="0" cy="-22" r="11" fill="#ffffff" {...ink} />
          <circle cx="0" cy="-22" r="4.5" fill="#facc15" />
        </g>
      )}
      {holdProp === 'script' && (
        <g transform={`translate(${handR.x + 14} ${handR.y - 16}) rotate(10)`}>
          <rect x="-24" y="-30" width="48" height="60" rx="6" fill="#fffbeb" {...ink} />
          <line x1="-14" y1="-12" x2="14" y2="-12" stroke={CARTOON_INK} strokeWidth="3.2" />
          <line x1="-14" y1="2" x2="12" y2="2" stroke={CARTOON_INK} strokeWidth="3.2" />
          <line x1="-14" y1="16" x2="8" y2="16" stroke={CARTOON_INK} strokeWidth="3.2" />
        </g>
      )}
    </g>
  );
};
