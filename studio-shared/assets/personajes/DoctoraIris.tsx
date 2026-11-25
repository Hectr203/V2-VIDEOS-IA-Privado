import React from 'react';
import {PersonajeEditorialModular, PersonajeEditorialModularProps} from './PersonajeEditorialModular';

export interface DoctoraIrisProps
  extends Omit<PersonajeEditorialModularProps, 'gender' | 'hairStyle' | 'outfitStyle' | 'glasses'> {
  holdProp?: 'none' | 'pointer' | 'magnifier';
}

/**
 * PERSONAJE REUTILIZABLE CANÓNICO (Nov 23): DoctoraIris (Científica / Divulgadora con bata y gafas)
 * Construida sobre PersonajeEditorialModular para mantener 100% coherencia con el elenco del 23/nov.
 */
export const DoctoraIris: React.FC<DoctoraIrisProps> = (props) => (
  <PersonajeEditorialModular
    gender="femenino"
    hairStyle="mono_alto"
    hairColor="#2a1a16"
    skinColor="#dfb98e"
    outfitStyle="bata_cientifica"
    colors={{primary: '#f1f5f9', secondary: '#1c8c8c', pants: '#253140', shoe: '#171f29'}}
    glasses
    blush
    blinkSeed={41}
    {...props}
  />
);
