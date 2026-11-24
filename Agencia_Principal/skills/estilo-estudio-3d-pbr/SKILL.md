---
name: estilo-estudio-3d-pbr
description: Estándar visual y motor de animación 3D física PBR exclusivo de video-studio-3d basado en Three.js, React Three Fiber y @remotion/three. Permite crear videos 3D de lujo, ingeniería de producto, cortes microscópicos en micras, tanques de vidrio/electrólisis y redes atómicas InstancedMesh 100% en código determinista TypeScript con iluminación HDRI procedural RoomEnvironment y subtítulos minimalistas.
---

# Estilo Estudio 3D PBR (`video-studio-3d/shared-art-3d/`)

Estándar canónico para todas las producciones tridimensionales alojadas en **`video-studio-3d/`** (separado estrictamente de `video-studio-2d/`).

## 1. Arquitectura Técnica 100% en Código (`@remotion/three`)
- **Escenario e Iluminación Física (`StudioStage3D`):** Fondo obsidiana de alto contraste (`#050507`) con halo radial sutil, `THREE.ACESFilmicToneMapping` e iluminación de estudio procedural en memoria (`RoomEnvironment` + `PMREMGenerator` + rig de 3 luces), garantizando reflejos metálicos sedosos sin descargas HDR externas ni bloqueos en render headless (`--gl=angle`).
- **Materiales Físicos (`PBR_PRESETS` en `pbrMaterials.ts`):** `gold24k`, `sterlingSilver`, `palladiumBarrier`, `brushedBrass`, `copperAtom`, `tarnishedDark` (oxidación/descamación comparativa), `borosilicateGlass`, `electrolyteFluid`, `luxuryBoxOuter`, `luxuryVelvetNavy`, `skinSubsurface`.

## 2. Primitivas Paramétricas y Narrativa Macro → Micro → Atómica (`Primitives3D.tsx`)
- `BeveledRing3D`: extrusión paramétrica con bisel interior/exterior y soporte de oxidación progresiva (`tarnishRatio`).
- `MicroLayerStack3D`: bloques de corte transversal para comparar espesores reales (ej. `< 0.2 µm` vs `2,5 µm`) y capas ocultas de ingeniería.
- `AtomicLattice3D`: `THREE.InstancedMesh` de alto rendimiento para cientos de esferas atómicas depositándose (`mode="deposit"`) o infiltrándose por difusión (`mode="diffuse"`).
- `ElectrolysisTank3D`: cubeta transparente de vidrio con aristas limpias, baño líquido, electrodos `+`/`-` y pieza sumergida.

## 3. Tipografía y Overlays de Lujo (`LuxuryOverlays3D.tsx`)
- `MinimalLuxuryCaptions3D`: bloques limpios de 3–4 palabras en el tercio superior con palabra activa en blanco puro brillante (`#ffffff`) y contexto en plata tenue.
- `SatinMetricPill3D`, `LayerLegendStack3D` y `AnamorphicSparkle3D` (destellos ópticos de 4 puntas sobre reflejos especulares).
