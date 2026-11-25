export {
  CARTOON_BG_WARM,
  CARTOON_CARD_BG,
  CARTOON_INK,
  CARTOON_SHEET_BG,
  CARTOON_STROKE,
  CartoonArmIK,
  CartoonFaceFeatures,
  CartoonHand,
  CartoonLegIK,
  cartoonBlink,
  inkProps,
  solveIK2D,
} from './sharedCartoonStyle';
export type {
  CartoonMood,
  CartoonPose,
  HandShape,
  Vec2 as CartoonVec2,
} from './sharedCartoonStyle';

// Motor universal parametrizable (cambia género, peinado, vestuario, sombrero, bigote, gafas y props)
export {PersonajeEditorialModular} from './PersonajeEditorialModular';
export type {
  ModularColors,
  ModularFacialHair,
  ModularGender,
  ModularHairStyle,
  ModularHatStyle,
  ModularOutfitStyle,
  ModularProp,
  PersonajeEditorialModularProps,
} from './PersonajeEditorialModular';

// Elenco base reutilizable de los proyectos bandera del 22 y 23 de noviembre (El Chavo, Don Ramón, Los Ojos)
export {Personaje1Base} from './Personaje1Base';
export type {BaseOutfit, HatVariant, MustacheVariant, Personaje1BaseProps} from './Personaje1Base';
export {Personaje2Nina} from './Personaje2Nina';
export type {NinaOutfit, Personaje2NinaProps} from './Personaje2Nina';
export {Personaje3Traje} from './Personaje3Traje';
export type {FacialHairVariant, Personaje3TrajeProps, TrajeOutfit} from './Personaje3Traje';
export {Personaje4Marinerito} from './Personaje4Marinerito';
export type {MarineritoOutfit, Personaje4MarineritoProps} from './Personaje4Marinerito';
export {DonMonchitoCartoon} from './DonMonchitoCartoon';
export type {DonMonchitoCartoonProps, MonchitoOutfit, MonchitoProp} from './DonMonchitoCartoon';
export {DonaAmigaCartoon} from './DonaAmigaCartoon';
export type {DonaAmigaCartoonProps} from './DonaAmigaCartoon';
export {DoctoraIris} from './DoctoraIris';
export type {DoctoraIrisProps} from './DoctoraIris';
