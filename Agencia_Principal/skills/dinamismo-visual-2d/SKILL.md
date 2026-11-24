---
name: dinamismo-visual-2d
description: Motor de dinamismo visual de alta retención para video-studio-2d sobre el estándar estilo-cartoon-editorial-3d. Aporta multicámara por micro-beats cada 1.5-2.5s (DynamicCameraRig2D), fondos de impacto emocional (RadialSunburstBackdrop, SpeedLinesBackdrop, SpotlightStageBackdrop, VersusSplitBackdrop), transiciones cinéticas (SpiralRingPortal, DiagonalSplitCompare, TiltedPunchBanner), HUD diegético gamificado (StoryStateHUD, LiquidDangerMeter, GameHealthBarHUD, TearOffCalendar) y visualizaciones por unidades (IconPopulationGrid, StampedDossierCard). Usar en toda producción 2D para erradicar planos estáticos y lograr ritmo adictivo.
---

# Motor de Dinamismo Visual 2D (`video-studio-2d/shared-art/dynamism/`)

Potencia el lenguaje de personajes `estilo-cartoon-editorial-3d` (tinta negra uniforme `#0b0d10`, `4.4px`, cinemática inversa `solveIK2D`) con ritmo visual cinematográfico continuo sin perder coherencia gráfica.

## 1. Reglas de Ritmo y Encuadre Multicámara (`DynamicCameraRig2D`)
- **Prohibido mantener el mismo encuadre fijo toda la escena:** Cada escena de 6–10 segundos debe definir de **3 a 5 `CameraBeat`s** (`wide`, `medium`, `closeup`, `extreme-closeup`, `dutch-left`, `dutch-right`, `whip-left`, `punch`) cambiando el foco visual cada **1.5 a 2.5 segundos** al compás de las frases clave.
- Aplicar `shake` amortiguado (`0.3–0.6`) únicamente en golpes dramáticos, sellos o revelaciones.

## 2. Fondos Emocionales Reactivos (`ImpactBackdrops2D`)
Alternar el escenario ambiental con fondos de energía cuando la emoción sube:
- `RadialSunburstBackdrop`: giros de trama, revelaciones ("arma secreta", logros, momentos épicos).
- `SpeedLinesBackdrop`: persecuciones, urgencia, carreras o procesos acelerados.
- `SpotlightStageBackdrop`: momentos de soledad, misterio, pérdida o foco íntimo.
- `VersusSplitBackdrop`: choques directos `A vs B` con rayo central entintado en `#0b0d10`.

## 3. Transiciones, HUD Diegético y Visualización por Unidades
- **Puentes sin cortes planos:** Abrir ganchos con `SpiralRingPortal` y comparar realidades simultáneas con `DiagonalSplitCompare` (ej. calle lluviosa vs hogar cálido).
- **HUD narrativo vivo (Cero estética PowerPoint):** Usar `StoryStateHUD`, `LiquidDangerMeter`, `GameHealthBarHUD` y `TearOffCalendar` como elementos diegéticos de tensión narrativa.
- **Datos tangibles (`UnitInfographics2D`):** En vez de mostrar solo un número frío, usar `IconPopulationGrid` (ej. 100–364 unidades encendiéndose y apagándose con deslizador temporal) y `StampedDossierCard` con sello de impacto (`DATO REAL`, `MITO ROTO`, `PELIGRO`).
