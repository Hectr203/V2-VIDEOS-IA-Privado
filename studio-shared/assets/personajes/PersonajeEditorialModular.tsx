import React from 'react';
import {
  CARTOON_INK,
  CARTOON_STROKE,
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

export type ModularGender = 'femenino' | 'masculino';
export type ModularHairStyle =
  | 'corto'
  | 'melena_ondulada'
  | 'mono_alto'
  | 'mono_clasico'
  | 'coletas'
  | 'sin_pelo';
export type ModularOutfitStyle =
  | 'casual'
  | 'abrigo_epoca'
  | 'vestido_clasico'
  | 'vestido_gala'
  | 'traje_elegante'
  | 'bata_cientifica';
export type ModularHatStyle =
  | 'ninguno'
  | 'boina_epoca'
  | 'gorra_tela'
  | 'sombrero_clasico'
  | 'fedora'
  | 'casco';
export type ModularFacialHair = 'ninguno' | 'bigote_fino' | 'bigote_muesca' | 'frondoso' | 'perilla';
export type ModularProp =
  | 'none'
  | 'lantern'
  | 'suitcase'
  | 'script'
  | 'flower'
  | 'clapperboard'
  | 'pointer'
  | 'magnifier';

export interface ModularColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  pants?: string;
  shoe?: string;
  hatFill?: string;
  hatBand?: string;
}

export interface PersonajeEditorialModularProps {
  /** Origen en el centro del suelo (pies en y=0, altura total ~355px, idéntica a proyectos del 23/nov) */
  x?: number;
  y?: number;
  scale?: number;
  flipX?: boolean;
  frame?: number;
  animated?: boolean;
  /** Personalización reutilizable de identidad */
  gender?: ModularGender;
  hairStyle?: ModularHairStyle;
  hairColor?: string;
  skinColor?: string;
  outfitStyle?: ModularOutfitStyle;
  colors?: ModularColors;
  hat?: ModularHatStyle;
  facialHair?: ModularFacialHair;
  glasses?: boolean;
  scarfColor?: string;
  /** Actuación, gestos, lip-sync y props */
  pose?: CartoonPose;
  mood?: CartoonMood;
  mouthOpen?: number;
  lookX?: number;
  lookY?: number;
  tears?: boolean;
  blush?: boolean;
  holdProp?: ModularProp;
  blinkSeed?: number;
  leftHandOverride?: Vec2;
  rightHandOverride?: Vec2;
}

/**
 * PERSONAJE EDITORIAL MODULAR REUTILIZABLE (Estándar Canónico Nov 22/23 — Un Dato Más)
 *
 * Respeta pixel a pixel las proporciones icónicas de El Chavo, Don Ramón y Cómo Funcionan los Ojos:
 * - Cabeza ovalada ancha (rx=60..62, ry=49..50) con orejas redondeadas simétricas (±61).
 * - Contorno uniforme negro tinta #0b0d10 (4.4px) y rellenos planos flat cel.
 * - Ojos sólidos circulares bien espaciados (eyeSpacing=28..30) con parpadeo y lip-sync.
 * - Extremidades IK reales de 2 segmentos (CartoonArmIK + CartoonLegIK).
 * - Totalmente personalizable por props: género, peinado, color de pelo, tono de piel, vestuario,
 *   sombrero, bigote, gafas, pañuelo y prop en mano — ideal para reutilizar en cualquier video nuevo.
 */
export const PersonajeEditorialModular: React.FC<PersonajeEditorialModularProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  flipX = false,
  frame = 0,
  animated = true,
  gender = 'femenino',
  hairStyle,
  hairColor = '#2c201b',
  skinColor = '#e2bc94',
  outfitStyle = 'casual',
  colors = {},
  hat = 'ninguno',
  facialHair = 'ninguno',
  glasses = false,
  scarfColor,
  pose = 'explicando',
  mood = 'feliz',
  mouthOpen = 0,
  lookX = 0,
  lookY = 0,
  tears = false,
  blush = gender === 'femenino',
  holdProp = 'none',
  blinkSeed = 19,
  leftHandOverride,
  rightHandOverride,
}) => {
  const ink = inkProps();
  const activeHair: ModularHairStyle = hairStyle ?? (gender === 'femenino' ? 'melena_ondulada' : 'corto');
  const isDress = outfitStyle === 'vestido_clasico' || outfitStyle === 'vestido_gala';

  const primary =
    colors.primary ??
    (outfitStyle === 'abrigo_epoca'
      ? '#5b6647'
      : outfitStyle === 'vestido_clasico'
        ? '#7c5ca3'
        : outfitStyle === 'vestido_gala'
          ? '#9f1d35'
          : outfitStyle === 'traje_elegante'
            ? '#3b3648'
            : outfitStyle === 'bata_cientifica'
              ? '#f1f5f9'
              : '#2c4c6b');
  const secondary =
    colors.secondary ??
    (outfitStyle === 'vestido_clasico'
      ? '#e9d5ff'
      : outfitStyle === 'vestido_gala'
        ? '#fef3c7'
        : outfitStyle === 'bata_cientifica'
          ? '#1c8c8c'
          : '#f3eee4');
  const accent = colors.accent ?? '#facc15';
  const pants = colors.pants ?? (isDress ? '#3d2c4f' : '#253140');
  const shoe = colors.shoe ?? '#1b1d24';
  const hatFill = colors.hatFill ?? (hat === 'boina_epoca' ? '#8c2d2d' : '#5e4382');
  const hatBand = colors.hatBand ?? '#2a1d38';

  const sleeveRatio =
    outfitStyle === 'casual' ? 0.68 : outfitStyle === 'vestido_gala' ? 0.55 : 1.52;

  const breathY = animated ? Math.sin(frame * 0.09) * 2.4 : 0;
  const headLagY = animated ? Math.sin((frame - 4) * 0.09) * 1.7 : 0;
  const hairSway = animated ? Math.sin((frame - 6) * 0.11) * 4.5 : 0;
  const walkPhase = animated ? Math.sin(frame * 0.24) : 0.65;
  const blink = cartoonBlink(frame, animated, blinkSeed);

  const hipY = pose === 'triste_encogido' ? -104 : -112;
  const hipL: Vec2 = {x: -22, y: hipY};
  const hipR: Vec2 = {x: 22, y: hipY};

  let footL: Vec2 = {x: -30, y: -17};
  let footR: Vec2 = {x: 30, y: -17};
  let torsoLean = 0;
  let headTilt = animated ? Math.sin(frame * 0.055) * 2.1 : 0;

  if (pose === 'caminando') {
    footL = {x: -22 - walkPhase * 28, y: -17 - Math.max(0, -walkPhase) * 14};
    footR = {x: 22 + walkPhase * 28, y: -17 - Math.max(0, walkPhase) * 14};
    torsoLean = 4;
  } else if (pose === 'señalando') {
    footL = {x: -50, y: -17};
    footR = {x: 46, y: -17};
    torsoLean = -3;
  } else if (pose === 'triste_encogido') {
    footL = {x: -22, y: -17};
    footR = {x: 22, y: -17};
    torsoLean = 6;
    headTilt = 9;
  } else if (pose === 'celebrando') {
    footL = {x: -38, y: -17};
    footR = {x: 38, y: -17};
    headTilt = -4;
  } else if (pose === 'pensativo') {
    headTilt = 7;
  }

  const shL: Vec2 = {x: -44, y: -210 + breathY};
  const shR: Vec2 = {x: 44, y: -210 + breathY};

  let handL: Vec2 = {x: -64, y: -122 + breathY};
  let handR: Vec2 = {x: 64, y: -122 + breathY};
  let shapeL: HandShape = 'abierta';
  let shapeR: HandShape = 'abierta';

  if (pose === 'caminando') {
    handL = {x: -74 + walkPhase * 12, y: -134 - walkPhase * 18 + breathY};
    handR = {x: 74 - walkPhase * 12, y: -134 + walkPhase * 18 + breathY};
  } else if (pose === 'explicando') {
    const gest = animated ? Math.sin(frame * 0.16) * 8 : 0;
    handL = {x: -90, y: -176 + gest + breathY};
    handR = {x: 92, y: -184 - gest + breathY};
    shapeL = 'palma_arriba';
    shapeR = 'palma_arriba';
  } else if (pose === 'brazos_cruzados') {
    handL = {x: 22, y: -160 + breathY};
    handR = {x: -22, y: -156 + breathY};
    shapeL = 'puno';
    shapeR = 'puno';
  } else if (pose === 'pensativo') {
    handL = {x: -60, y: -126 + breathY};
    handR = {x: 20, y: -224 + breathY};
    shapeR = 'puno';
  } else if (pose === 'celebrando') {
    const cheer = animated ? Math.sin(frame * 0.22) * 11 : 0;
    handL = {x: -94, y: -282 + cheer};
    handR = {x: 94, y: -282 - cheer};
  } else if (pose === 'triste_encogido') {
    handL = {x: -24, y: -148 + breathY};
    handR = {x: 24, y: -148 + breathY};
  } else if (pose === 'señalando') {
    handL = {x: -68, y: -128 + breathY};
    handR = {x: 118, y: -258 + breathY};
    shapeR = 'senalando';
  }

  if (holdProp !== 'none') {
    handR = {x: 100, y: -178 + breathY + (animated ? Math.sin(frame * 0.14) * 5 : 0)};
    shapeR = 'puno';
  }
  if (leftHandOverride) handL = leftHandOverride;
  if (rightHandOverride) handR = rightHandOverride;

  const leftArmFront = pose === 'brazos_cruzados' || pose === 'triste_encogido';
  const rightArmFront = pose === 'brazos_cruzados' || pose === 'pensativo' || pose === 'triste_encogido' || holdProp !== 'none';
  const leftElbowBend: 1 | -1 = pose === 'brazos_cruzados' ? 1 : -1;
  const rightElbowBend: 1 | -1 = pose === 'brazos_cruzados' ? -1 : 1;
  const armThick = gender === 'femenino' ? 21 : 24;
  const legThick = gender === 'femenino' ? 23 : 28;
  const headRx = gender === 'femenino' ? 60 : 63;
  const headRy = gender === 'femenino' ? 49 : 51;

  const renderLeftArm = () => (
    <CartoonArmIK
      shoulder={shL}
      handTarget={handL}
      upperLen={54}
      lowerLen={50}
      bend={leftElbowBend}
      thickness={armThick}
      skin={skinColor}
      sleeveColor={primary}
      sleeveRatio={sleeveRatio}
      handShape={shapeL}
      handFlipX
    />
  );

  const renderRightArm = () => (
    <g>
      <CartoonArmIK
        shoulder={shR}
        handTarget={handR}
        upperLen={54}
        lowerLen={50}
        bend={rightElbowBend}
        thickness={armThick}
        skin={skinColor}
        sleeveColor={primary}
        sleeveRatio={sleeveRatio}
        handShape={shapeR}
      />

      {holdProp === 'lantern' && (
        <g transform={`translate(${handR.x + 8} ${handR.y + 34})`}>
          <circle cx="0" cy="6" r="42" fill="#fde047" opacity="0.28" />
          <path d="M -8 -26 Q 0 -36 8 -26" fill="none" stroke={CARTOON_INK} strokeWidth={3.6} />
          <rect x="-15" y="-16" width="30" height="36" rx="6" fill="#fef08a" {...ink} />
          <path d="M -18 -16 L 0 -27 L 18 -16 Z" fill="#334155" {...ink} />
          <rect x="-18" y="18" width="36" height="8" rx="3" fill="#334155" {...ink} />
        </g>
      )}
      {holdProp === 'suitcase' && (
        <g transform={`translate(${handR.x + 12} ${handR.y + 36})`}>
          <rect x="-34" y="-16" width="68" height="46" rx="8" fill="#8c4a20" {...ink} />
          <rect x="-12" y="-26" width="24" height="12" rx="4" fill="none" stroke={CARTOON_INK} strokeWidth={4} />
          <line x1="-18" y1="-16" x2="-18" y2="30" stroke="#e2b453" strokeWidth={5} />
          <line x1="18" y1="-16" x2="18" y2="30" stroke="#e2b453" strokeWidth={5} />
        </g>
      )}
      {holdProp === 'script' && (
        <g transform={`translate(${handR.x + 14} ${handR.y - 16}) rotate(10)`}>
          <rect x="-24" y="-30" width="48" height="60" rx="6" fill="#fffbeb" {...ink} />
          <line x1="-14" y1="-14" x2="14" y2="-14" stroke="#475569" strokeWidth={3.4} strokeLinecap="round" />
          <line x1="-14" y1="0" x2="12" y2="0" stroke="#475569" strokeWidth={3.4} strokeLinecap="round" />
          <line x1="-14" y1="14" x2="8" y2="14" stroke="#475569" strokeWidth={3.4} strokeLinecap="round" />
        </g>
      )}
      {holdProp === 'flower' && (
        <g transform={`translate(${handR.x + 10} ${handR.y - 24}) rotate(8)`}>
          <path d="M 0 28 Q -4 6 0 -16" fill="none" stroke="#22c55e" strokeWidth={5} strokeLinecap="round" />
          <circle cx="0" cy="-22" r="12" fill="#ffffff" {...ink} />
          <circle cx="0" cy="-22" r="5" fill="#facc15" />
        </g>
      )}
      {holdProp === 'clapperboard' && (
        <g transform={`translate(${handR.x + 16} ${handR.y - 18}) rotate(-8)`}>
          <rect x="-28" y="-18" width="56" height="40" rx="5" fill="#1e293b" {...inkProps(3.4)} />
          <rect x="-28" y="-30" width="56" height="12" rx="3" fill="#facc15" {...inkProps(3.4)} />
          <line x1="-12" y1="-30" x2="-18" y2="-18" stroke={CARTOON_INK} strokeWidth={4} />
          <line x1="8" y1="-30" x2="2" y2="-18" stroke={CARTOON_INK} strokeWidth={4} />
        </g>
      )}
      {holdProp === 'pointer' && (
        <g transform={`translate(${handR.x} ${handR.y}) rotate(-36)`}>
          <line x1="0" y1="0" x2="108" y2="0" stroke={CARTOON_INK} strokeWidth={7} strokeLinecap="round" />
          <line x1="0" y1="0" x2="108" y2="0" stroke="#facc15" strokeWidth={3.5} strokeLinecap="round" />
          <circle cx="110" cy="0" r="6" fill="#ef4444" stroke={CARTOON_INK} strokeWidth={2.8} />
        </g>
      )}
      {holdProp === 'magnifier' && (
        <g transform={`translate(${handR.x + 8} ${handR.y - 12}) rotate(-26)`}>
          <line x1="0" y1="0" x2="24" y2="-24" stroke={CARTOON_INK} strokeWidth={8.5} strokeLinecap="round" />
          <circle cx="42" cy="-42" r="22" fill="#bae6fd" fillOpacity="0.42" stroke={CARTOON_INK} strokeWidth={5} />
        </g>
      )}
    </g>
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${flipX ? -scale : scale} ${scale})`}>
      {/* Piernas IK articuladas con proporciones exactas Nov 22/23 */}
      <CartoonLegIK
        hip={hipL}
        foot={footL}
        thighLen={49}
        calfLen={48}
        bend={pose === 'caminando' ? -1 : 1}
        thickness={legThick}
        pantsColor={pants}
        shoeColor={shoe}
        footDir={-1}
      />
      <CartoonLegIK
        hip={hipR}
        foot={footR}
        thighLen={49}
        calfLen={48}
        bend={-1}
        thickness={legThick}
        pantsColor={pants}
        shoeColor={shoe}
        footDir={1}
      />
      {!isDress && (
        <rect x="-40" y={hipY - 12} width="80" height="28" rx="13" fill={pants} stroke={CARTOON_INK} strokeWidth={CARTOON_STROKE} />
      )}

      <g transform={`rotate(${torsoLean} 0 -115)`}>
        {!leftArmFront && renderLeftArm()}
        {!rightArmFront && renderRightArm()}

        {/* TORSO Y VESTUARIO EDITORIAL */}
        <g transform={`translate(0 ${breathY})`}>
          {isDress ? (
            <>
              <path
                d="M -42 -214 C -46 -170 -54 -128 -60 -82 Q 0 -68 60 -82 C 54 -128 46 -170 42 -214 C 18 -222 -18 -222 -42 -214 Z"
                fill={primary}
                {...ink}
              />
              {outfitStyle === 'vestido_clasico' && (
                <path d="M -44 -214 Q 0 -178 44 -214 L 46 -186 Q 0 -164 -46 -186 Z" fill={secondary} {...ink} />
              )}
              {outfitStyle === 'vestido_gala' && (
                <>
                  <path d="M -22 -214 Q 0 -184 22 -214 Z" fill={secondary} {...ink} />
                  <path d="M -46 -144 Q 0 -134 46 -144" fill="none" stroke={accent} strokeWidth={6} strokeLinecap="round" />
                  <circle cx="0" cy="-192" r="7" fill={accent} stroke={CARTOON_INK} strokeWidth={2.8} />
                </>
              )}
            </>
          ) : (
            <>
              <path
                d="M -46 -220 C -50 -182 -52 -140 -48 -104 C -20 -97 20 -97 48 -104 C 52 -140 50 -182 46 -220 C 20 -228 -20 -228 -46 -220 Z"
                fill={outfitStyle === 'bata_cientifica' || outfitStyle === 'traje_elegante' ? secondary : primary}
                {...ink}
              />
              {outfitStyle === 'abrigo_epoca' && (
                <>
                  <path d="M -48 -218 C -54 -168 -58 -126 -58 -92 L 58 -92 C 58 -126 54 -168 48 -218 C 22 -226 -22 -226 -48 -218 Z" fill={primary} {...ink} />
                  <path d="M -24 -218 L 0 -172 L 24 -218" fill="none" stroke={CARTOON_INK} strokeWidth={4} strokeLinejoin="round" />
                  <rect x="-48" y="-138" width="96" height="12" rx="4" fill="#3a2518" {...ink} />
                  <rect x="-8" y="-138" width="16" height="12" rx="2" fill={accent} stroke={CARTOON_INK} strokeWidth={3} />
                </>
              )}
              {(outfitStyle === 'traje_elegante' || outfitStyle === 'bata_cientifica') && (
                <>
                  <path d="M -48 -220 L -14 -218 L -16 -96 L -54 -100 C -52 -140 -52 -182 -48 -220 Z" fill={primary} {...ink} />
                  <path d="M 48 -220 L 14 -218 L 16 -96 L 54 -100 C 52 -140 52 -182 48 -220 Z" fill={primary} {...ink} />
                </>
              )}
            </>
          )}

          {/* Pañuelo / bufanda opcional */}
          {scarfColor && (
            <g>
              <path
                d="M -34 -216 C -14 -202 14 -202 34 -216 L 36 -196 C 14 -184 -14 -184 -36 -196 Z"
                fill={scarfColor}
                {...ink}
              />
              <path d="M 10 -196 L 26 -196 L 30 -158 L 12 -158 Z" fill={scarfColor} {...ink} />
            </g>
          )}

          {/* Cuello limpio */}
          <rect x="-13" y="-236" width="26" height="22" rx="7" fill={skinColor} {...ink} />
        </g>

        {leftArmFront && renderLeftArm()}
        {rightArmFront && renderRightArm()}

        {/* ================================================================
            CABEZA CANÓNICA NOV 22/23 (ANCHO > ALTO + OREJAS SIMÉTRICAS)
           ================================================================ */}
        <g transform={`translate(0 ${-274 + breathY + headLagY}) rotate(${headTilt})`}>
          {/* Cabello posterior según peinado */}
          {activeHair === 'mono_alto' && <circle cx="0" cy="-64" r="24" fill={hairColor} {...ink} />}
          {activeHair === 'mono_clasico' && <circle cx="-48" cy="-8" r="22" fill={hairColor} {...ink} />}
          {activeHair === 'coletas' && (
            <>
              <g transform={`translate(-62 -14) rotate(${-14 + hairSway})`}>
                <path d="M 0 -4 C -26 -18 -44 10 -32 36 C -22 50 -6 44 -4 26 Z" fill={hairColor} {...ink} />
                <ellipse cx="-6" cy="-2" rx="10" ry="7" fill={accent} {...ink} />
              </g>
              <g transform={`translate(62 -14) rotate(${14 - hairSway})`}>
                <path d="M 0 -4 C 26 -18 44 10 32 36 C 22 50 6 44 4 26 Z" fill={hairColor} {...ink} />
                <ellipse cx="6" cy="-2" rx="10" ry="7" fill={accent} {...ink} />
              </g>
            </>
          )}
          {activeHair === 'melena_ondulada' && (
            <path
              d={`M -66 -12 C -74 16 -64 42 -42 46 L 42 46 C 64 42 74 16 66 -12 C 64 -58 -64 -58 -66 -12 Z`}
              fill={hairColor}
              {...ink}
            />
          )}

          {/* Orejas redondeadas simétricas (firma visual Nov 22/23) */}
          <ellipse cx={-headRx} cy="4" rx="13" ry="17" fill={skinColor} {...ink} />
          <ellipse cx={headRx} cy="4" rx="13" ry="17" fill={skinColor} {...ink} />

          {/* Cabello lateral corto si aplica */}
          {activeHair === 'corto' && (
            <path
              d="M -62 -14 C -66 -50 66 -50 62 -14 C 66 6 60 18 52 22 L 48 -12 L -48 -12 L -52 22 C -60 18 -66 6 -62 -14 Z"
              fill={hairColor}
              {...ink}
            />
          )}

          {/* Óvalo facial amplio característico (ancho > alto) */}
          <ellipse cx="0" cy="2" rx={headRx} ry={headRy} fill={skinColor} {...ink} />

          {/* Flequillo superior según peinado */}
          {activeHair !== 'sin_pelo' && (
            <path
              d={
                activeHair === 'melena_ondulada'
                  ? `M ${-headRx - 1} -6 C -58 -54 58 -54 ${headRx + 1} -6 C 36 -28 8 -32 -12 -18 C -30 -28 -48 -24 ${-headRx - 1} -6 Z`
                  : `M ${-headRx + 2} -12 C -54 -54 54 -54 ${headRx - 2} -12 C 28 -30 -28 -30 ${-headRx + 2} -12 Z`
              }
              fill={hairColor}
              {...ink}
            />
          )}

          {/* Rasgos faciales compartidos (ojos sólidos expresivos, cejas y lip-sync) */}
          <CartoonFaceFeatures
            mood={mood}
            blink={blink}
            lookX={lookX}
            lookY={lookY}
            mouthOpen={mouthOpen}
            eyeSpacing={29}
            eyeY={2}
            mouthY={28}
            hideMouthWhenClosed={facialHair === 'bigote_muesca' || facialHair === 'frondoso'}
            blush={blush}
            tears={tears}
          />

          {/* Bigote opcional */}
          {facialHair === 'bigote_fino' && (
            <path
              d="M -24 18 Q -10 10 0 16 Q 10 10 24 18 Q 10 24 0 21 Q -10 24 -24 18 Z"
              fill={hairColor}
              stroke={CARTOON_INK}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
          )}
          {facialHair === 'bigote_muesca' && (
            <path
              d="M -36 27 C -22 10 22 10 36 28 C 20 27 4 26 -12 26 L -16 20 L -21 26 Z"
              fill={hairColor}
              stroke={CARTOON_INK}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
          )}
          {facialHair === 'frondoso' && (
            <path
              d="M -40 30 C -32 10 32 10 40 30 C 24 33 12 29 0 30 C -12 29 -24 33 -40 30 Z"
              fill={hairColor}
              stroke={CARTOON_INK}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
          )}

          {/* Gafas opcionales */}
          {glasses && (
            <g>
              <circle cx="-29" cy="2" r="19" fill="#e0f2fe" fillOpacity="0.18" stroke={CARTOON_INK} strokeWidth={3.6} />
              <circle cx="29" cy="2" r="19" fill="#e0f2fe" fillOpacity="0.18" stroke={CARTOON_INK} strokeWidth={3.6} />
              <path d="M -10 2 Q 0 -2 10 2" fill="none" stroke={CARTOON_INK} strokeWidth={3.6} />
            </g>
          )}

          {/* Sombreros modulares */}
          {hat === 'boina_epoca' && (
            <g transform="translate(0 -32)">
              <path
                d="M -64 4 C -72 -32 -32 -52 12 -50 C 52 -48 74 -26 62 4 C 24 10 -24 10 -64 4 Z"
                fill={hatFill}
                {...ink}
              />
              <path d="M -56 4 C -20 10 20 10 56 4 L 54 -6 C 20 0 -20 0 -54 -6 Z" fill={hatBand} {...ink} />
              <path d="M 6 -50 L 12 -58" stroke={CARTOON_INK} strokeWidth={4.5} strokeLinecap="round" />
            </g>
          )}
          {hat === 'sombrero_clasico' && (
            <g transform="translate(0 -42)">
              <ellipse cx="0" cy="8" rx="64" ry="12" fill={hatBand} {...ink} />
              <path d="M -40 8 C -36 -22 36 -22 40 8 Z" fill={hatFill} {...ink} />
              <circle cx="28" cy="0" r="8" fill={accent} {...ink} />
            </g>
          )}
          {hat === 'gorra_tela' && (
            <g transform="translate(0 -34)">
              <path d="M -54 8 C -52 -32 52 -32 54 8 Z" fill={hatFill} {...ink} />
              <path d="M -53 2 Q 0 -6 53 2 L 54 10 Q 0 2 -54 10 Z" fill={hatBand} stroke={CARTOON_INK} strokeWidth={3.5} />
              <path d="M -72 18 Q -35 0 0 4 Q 35 0 72 18 Q 36 28 0 22 Q -36 28 -72 18 Z" fill={hatFill} {...ink} />
            </g>
          )}
          {hat === 'fedora' && (
            <g transform="translate(0 -38)">
              <ellipse cx="0" cy="8" rx="70" ry="12" fill={hatFill} {...ink} />
              <path d="M -44 6 L -36 -28 Q 0 -36 36 -28 L 44 6 Z" fill={hatFill} {...ink} />
              <path d="M -43 0 Q 0 -6 43 0 L 44 8 Q 0 2 -44 8 Z" fill={hatBand} stroke={CARTOON_INK} strokeWidth={3.2} />
            </g>
          )}
          {hat === 'casco' && (
            <path
              d="M -72 -18 L -63 -30 C -63 -58 -50 -84 0 -86 C 50 -84 63 -58 63 -30 L 72 -18 C 28 -14 -28 -14 -72 -18 Z"
              fill={hatFill}
              {...ink}
            />
          )}
        </g>
      </g>
    </g>
  );
};
