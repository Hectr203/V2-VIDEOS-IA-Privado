import React from 'react';
import {
  CARTOON_INK,
  CartoonArmIK,
  CartoonFaceFeatures,
  CartoonLegIK,
  CartoonMood,
  CartoonPose,
  HandShape,
  Vec2,
  cartoonBlink,
  inkProps,
} from './sharedCartoonStyle';

export type MonchitoOutfit = 'cotidiano' | 'carpintero' | 'chofer' | 'sereno';
export type MonchitoProp = 'none' | 'receipt' | 'saw' | 'steering' | 'script' | 'flower';

export interface DonMonchitoCartoonProps {
  x?: number;
  y?: number;
  scale?: number;
  flipX?: boolean;
  frame?: number;
  animated?: boolean;
  pose?: CartoonPose;
  mood?: CartoonMood;
  outfit?: MonchitoOutfit;
  mouthOpen?: number;
  lookX?: number;
  lookY?: number;
  tears?: boolean;
  blush?: boolean;
  holdProp?: MonchitoProp;
  showHat?: boolean;
  leftHandOverride?: Vec2;
  rightHandOverride?: Vec2;
}

const MONCHITO_SKIN = '#ddb585';
const MONCHITO_HAIR = '#2a2422';

const MONCHITO_OUTFITS: Record<
  MonchitoOutfit,
  {
    shirt: string;
    sleeve: string;
    sleeveRatio: number;
    pants: string;
    shoe: string;
    hatFill: string;
    hatBand: string;
    apron?: string;
    jacket?: string;
  }
> = {
  cotidiano: {
    shirt: '#26313d',
    sleeve: '#26313d',
    sleeveRatio: 0.65,
    pants: '#355c8a',
    shoe: '#e8e2d5',
    hatFill: '#5c85b8',
    hatBand: '#2f4d73',
  },
  carpintero: {
    shirt: '#d6c5a9',
    sleeve: '#d6c5a9',
    sleeveRatio: 0.72,
    pants: '#3c4a59',
    shoe: '#473021',
    hatFill: '#a67b4b',
    hatBand: '#6b4926',
    apron: '#8c5a32',
  },
  chofer: {
    shirt: '#e3d5ba',
    sleeve: '#e3d5ba',
    sleeveRatio: 1.25,
    pants: '#2c3645',
    shoe: '#1b2026',
    hatFill: '#3b4a61',
    hatBand: '#1e2736',
  },
  sereno: {
    shirt: '#2e3844',
    sleeve: '#70363b',
    sleeveRatio: 1.75,
    pants: '#2c3d54',
    shoe: '#261e1a',
    hatFill: '#4d6f99',
    hatBand: '#2a415e',
    jacket: '#70363b',
  },
};

/**
 * PERSONAJE REUTILIZABLE CANÓNICO (Nov 23): DonMonchitoCartoon
 * Promovido a studio-shared/assets/personajes/ desde don-ramon-fuera-del-set.
 */
export const DonMonchitoCartoon: React.FC<DonMonchitoCartoonProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  flipX = false,
  frame = 0,
  animated = true,
  pose = 'explicando',
  mood = 'feliz',
  outfit = 'cotidiano',
  mouthOpen = 0,
  lookX = 0,
  lookY = 0,
  tears = false,
  blush = false,
  holdProp = 'none',
  showHat = true,
  leftHandOverride,
  rightHandOverride,
}) => {
  const st = MONCHITO_OUTFITS[outfit];
  const ink = inkProps();
  const breathY = animated ? Math.sin(frame * 0.09) * 2.4 : 0;
  const headLagY = animated ? Math.sin((frame - 4) * 0.09) * 1.7 : 0;
  const walkPhase = animated ? Math.sin(frame * 0.24) : 0.6;
  const blink = cartoonBlink(frame, animated, 17);

  const hipY = pose === 'triste_encogido' ? -105 : -112;
  const hipL: Vec2 = {x: -22, y: hipY};
  const hipR: Vec2 = {x: 22, y: hipY};

  let footL: Vec2 = {x: -32, y: -17};
  let footR: Vec2 = {x: 32, y: -17};
  let torsoLean = 0;
  let headTilt = animated ? Math.sin(frame * 0.055) * 2.2 : 0;

  if (pose === 'caminando') {
    footL = {x: -24 - walkPhase * 29, y: -17 - Math.max(0, -walkPhase) * 14};
    footR = {x: 24 + walkPhase * 29, y: -17 - Math.max(0, walkPhase) * 14};
    torsoLean = 4;
  } else if (pose === 'señalando') {
    footL = {x: -54, y: -17};
    footR = {x: 48, y: -17};
    torsoLean = -3;
  } else if (pose === 'triste_encogido') {
    footL = {x: -22, y: -17};
    footR = {x: 22, y: -17};
    torsoLean = 6;
    headTilt = 10;
  } else if (pose === 'celebrando') {
    footL = {x: -40, y: -17};
    footR = {x: 40, y: -17};
    headTilt = -4;
  } else if (pose === 'pensativo') {
    headTilt = 7;
  }

  const shL: Vec2 = {x: -45, y: -214 + breathY};
  const shR: Vec2 = {x: 45, y: -214 + breathY};

  let handL: Vec2 = {x: -66, y: -122 + breathY};
  let handR: Vec2 = {x: 66, y: -122 + breathY};
  let shapeL: HandShape = 'abierta';
  let shapeR: HandShape = 'abierta';

  if (pose === 'caminando') {
    handL = {x: -76 + walkPhase * 12, y: -134 - walkPhase * 18 + breathY};
    handR = {x: 76 - walkPhase * 12, y: -134 + walkPhase * 18 + breathY};
  } else if (pose === 'explicando') {
    const gest = animated ? Math.sin(frame * 0.16) * 9 : 0;
    handL = {x: -94, y: -178 + gest + breathY};
    handR = {x: 96, y: -188 - gest + breathY};
    shapeL = 'palma_arriba';
    shapeR = 'palma_arriba';
  } else if (pose === 'brazos_cruzados') {
    handL = {x: 22, y: -162 + breathY};
    handR = {x: -22, y: -158 + breathY};
    shapeL = 'puno';
    shapeR = 'puno';
  } else if (pose === 'pensativo') {
    handL = {x: -62, y: -126 + breathY};
    handR = {x: 20, y: -230 + breathY};
    shapeR = 'puno';
  } else if (pose === 'celebrando') {
    const cheer = animated ? Math.sin(frame * 0.22) * 12 : 0;
    handL = {x: -98, y: -292 + cheer};
    handR = {x: 98, y: -292 - cheer};
  } else if (pose === 'triste_encogido') {
    handL = {x: -44, y: -116 + breathY};
    handR = {x: 44, y: -116 + breathY};
  } else if (pose === 'señalando') {
    handL = {x: -70, y: -128 + breathY};
    handR = {x: 122, y: -262 + breathY};
    shapeR = 'senalando';
  }

  if (holdProp !== 'none') {
    handR = {x: 102, y: -186 + breathY + (animated ? Math.sin(frame * 0.14) * 5 : 0)};
    shapeR = 'puno';
  }
  if (leftHandOverride) handL = leftHandOverride;
  if (rightHandOverride) handR = rightHandOverride;

  const crossed = pose === 'brazos_cruzados';
  const headX = torsoLean * 1.4;
  const headY = -286 + headLagY;

  return (
    <g transform={`translate(${x} ${y}) scale(${flipX ? -scale : scale} ${scale})`}>
      <CartoonLegIK hip={hipL} foot={footL} bend={pose === 'caminando' ? -1 : 1} pantsColor={st.pants} shoeColor={st.shoe} thighLen={49} calfLen={49} thickness={23} footDir={-1} />
      <CartoonLegIK hip={hipR} foot={footR} bend={-1} pantsColor={st.pants} shoeColor={st.shoe} thighLen={49} calfLen={49} thickness={23} footDir={1} />

      {!crossed && (
        <CartoonArmIK shoulder={shL} handTarget={handL} bend={-1} sleeveColor={st.sleeve} skin={MONCHITO_SKIN} sleeveRatio={st.sleeveRatio} upperLen={62} lowerLen={56} thickness={22} handShape={shapeL} />
      )}

      <g transform={`translate(${torsoLean} ${breathY})`}>
        <path d="M -46 -222 C -48 -175 -42 -136 -38 -108 L 38 -108 C 42 -136 48 -175 46 -222 C 30 -230 -30 -230 -46 -222 Z" fill={st.shirt} {...ink} />
        <rect x="-39" y="-118" width="78" height="12" rx="4" fill="#2b211a" {...ink} />
        <rect x="-8" y="-118" width="16" height="12" rx="2" fill="#e6be53" stroke={CARTOON_INK} strokeWidth={3} />
        {st.jacket && (
          <>
            <path d="M -46 -222 L -16 -222 L -14 -116 L -40 -116 Z" fill={st.jacket} {...ink} />
            <path d="M 46 -222 L 16 -222 L 14 -116 L 40 -116 Z" fill={st.jacket} {...ink} />
          </>
        )}
        {st.apron && (
          <>
            <path d="M -32 -198 L 32 -198 L 36 -108 L -36 -108 Z" fill={st.apron} {...ink} />
            <path d="M -26 -222 L -22 -198 M 26 -222 L 22 -198" stroke={CARTOON_INK} strokeWidth={4.2} strokeLinecap="round" />
            <rect x="-18" y="-162" width="36" height="26" rx="5" fill="#6b4222" {...ink} />
          </>
        )}
        {outfit === 'chofer' && (
          <path d="M -18 -224 L 0 -204 L 18 -224" fill="none" stroke={CARTOON_INK} strokeWidth={4} strokeLinejoin="round" />
        )}
        <rect x="-14" y="-242" width="28" height="24" rx="8" fill={MONCHITO_SKIN} {...ink} />
      </g>

      <g transform={`translate(${headX} ${headY}) rotate(${headTilt})`}>
        <ellipse cx="-62" cy="4" rx="13" ry="17" fill={MONCHITO_SKIN} {...ink} />
        <ellipse cx="62" cy="4" rx="13" ry="17" fill={MONCHITO_SKIN} {...ink} />
        <ellipse cx="0" cy="0" rx="64" ry="54" fill={MONCHITO_SKIN} {...ink} />
        <path d="M -60 -16 C -64 4 -54 14 -50 6 Z" fill={MONCHITO_HAIR} stroke={CARTOON_INK} strokeWidth={3} />
        <path d="M 60 -16 C 64 4 54 14 50 6 Z" fill={MONCHITO_HAIR} stroke={CARTOON_INK} strokeWidth={3} />
        {!showHat && (
          <path d="M -60 -14 C -58 -58 58 -58 60 -14 C 34 -30 -34 -30 -60 -14 Z" fill={MONCHITO_HAIR} {...ink} />
        )}
        <CartoonFaceFeatures mood={mood} mouthOpen={mouthOpen} blink={blink} lookX={lookX} lookY={lookY} tears={tears} blush={blush} eyeY={-6} eyeSpacing={24} mouthY={28} />
        <path d="M -24 17 Q -10 9 0 15 Q 10 9 24 17 Q 10 23 0 20 Q -10 23 -24 17 Z" fill={MONCHITO_HAIR} stroke={CARTOON_INK} strokeWidth={3.2} strokeLinejoin="round" />
        {showHat && (
          <g transform="translate(0 -34)">
            <path d="M -54 8 C -52 -32 52 -32 54 8 Z" fill={st.hatFill} {...ink} />
            <path d="M -53 2 Q 0 -6 53 2 L 54 10 Q 0 2 -54 10 Z" fill={st.hatBand} stroke={CARTOON_INK} strokeWidth={3.5} />
            <path d="M -72 18 Q -35 0 0 4 Q 35 0 72 18 Q 36 28 0 22 Q -36 28 -72 18 Z" fill={st.hatFill} {...ink} />
          </g>
        )}
      </g>

      <CartoonArmIK shoulder={shR} handTarget={handR} bend={crossed ? -1 : 1} sleeveColor={st.sleeve} skin={MONCHITO_SKIN} sleeveRatio={st.sleeveRatio} upperLen={62} lowerLen={56} thickness={22} handShape={shapeR} />
      {crossed && (
        <CartoonArmIK shoulder={shL} handTarget={handL} bend={1} sleeveColor={st.sleeve} skin={MONCHITO_SKIN} sleeveRatio={st.sleeveRatio} upperLen={62} lowerLen={56} thickness={22} handShape={shapeL} />
      )}

      {holdProp === 'script' && (
        <g transform={`translate(${handR.x + 16} ${handR.y - 18}) rotate(12)`}>
          <rect x="-26" y="-32" width="52" height="64" rx="6" fill="#f8fafc" {...ink} />
          <line x1="-15" y1="-16" x2="15" y2="-16" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-15" y1="-3" x2="12" y2="-3" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
      {holdProp === 'flower' && (
        <g transform={`translate(${handR.x + 10} ${handR.y - 24}) rotate(8)`}>
          <path d="M 0 26 Q -4 6 0 -16" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
          <circle cx="0" cy="-22" r="11" fill="#ffffff" {...ink} />
          <circle cx="0" cy="-22" r="4.5" fill="#facc15" />
        </g>
      )}
    </g>
  );
};
