import type {MeshPhysicalMaterialParameters} from 'three';

/**
 * Presets físicos PBR calibrados para iluminación envolvente de estudio (softboxes + ACESFilmicToneMapping).
 * Garantizan brillo metálico rico y legible tanto en superficies curvas (anillos/átomos) como en cortes planos.
 */
export const PBR_PRESETS: Record<string, MeshPhysicalMaterialParameters> = {
  gold24k: {
    color: '#ffd147',
    metalness: 0.88,
    roughness: 0.17,
    envMapIntensity: 2.4,
    clearcoat: 0.45,
    clearcoatRoughness: 0.1,
  },
  sterlingSilver: {
    color: '#e8edf2',
    metalness: 0.82,
    roughness: 0.18,
    envMapIntensity: 2.2,
    clearcoat: 0.35,
    clearcoatRoughness: 0.1,
  },
  palladiumBarrier: {
    color: '#94a3b8',
    metalness: 0.78,
    roughness: 0.24,
    envMapIntensity: 1.9,
  },
  brushedBrass: {
    color: '#dfae3b',
    metalness: 0.84,
    roughness: 0.28,
    envMapIntensity: 1.8,
  },
  copperAtom: {
    color: '#f59e56',
    metalness: 0.85,
    roughness: 0.18,
    envMapIntensity: 2.2,
  },
  tarnishedDark: {
    color: '#3a2d24',
    metalness: 0.18,
    roughness: 0.84,
    envMapIntensity: 0.65,
  },
  borosilicateGlass: {
    color: '#e2e8f0',
    metalness: 0.08,
    roughness: 0.08,
    transparent: true,
    opacity: 0.26,
    envMapIntensity: 2.0,
    clearcoat: 1.0,
  },
  electrolyteFluid: {
    color: '#a17c42',
    metalness: 0.0,
    roughness: 0.16,
    transparent: true,
    opacity: 0.36,
  },
  luxuryBoxOuter: {
    color: '#272a36',
    metalness: 0.18,
    roughness: 0.58,
    envMapIntensity: 1.0,
  },
  luxuryVelvetNavy: {
    color: '#23325c',
    metalness: 0.04,
    roughness: 0.85,
    sheen: 0.9,
    sheenColor: '#6b84ba',
  },
  skinSubsurface: {
    color: '#f2cbb0',
    metalness: 0.02,
    roughness: 0.56,
    clearcoat: 0.08,
  },
};
