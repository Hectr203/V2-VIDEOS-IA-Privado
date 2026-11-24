# Identidad Visual y Continuidad 2D / 3D: Un Dato Más

## 1. Bifurcación Visual Estricta (2D vs. 3D)

### A. Línea Visual 2D (`video-studio-2d/`)
- **Referencia estética y técnica consolidada:** Proyectos bandera de la marca:
  - *El Chavo* (`video-studio-2d/projects/22 de noviembre de 2026/chavo-historia-libro-crudo`)
  - *Don Ramón* — también referido en instrucciones de voz como *Doraemon* (`video-studio-2d/projects/23 de noviembre de 2026/don-ramon-fuera-del-set`)
  - *Cómo funcionan los ojos* (`video-studio-2d/projects/23 de noviembre de 2026/como-funcionan-los-ojos`)
- **Estándar técnico obligatorio:** `estilo-cartoon-editorial-3d` + `dinamismo-visual-2d` (`video-studio-2d/shared-art/cartoon/` y `dynamism/`).
  - Tinta negra uniforme `#0b0d10` (`4.4px`), rellenos planos *flat cel*, ojos sólidos expresivos y articulación IK real (`solveIK2D`, 8 poses, 7 expresiones + *lip-sync*).
  - Micro-cortes multicámara cada `1.5–2.5 s` (`DynamicCameraRig2D`), fondos de impacto (`RadialSunburstBackdrop`, `SpeedLinesBackdrop`, `SpotlightStageBackdrop`, `VersusSplitBackdrop`), transiciones (`SpiralRingPortal`, `DiagonalSplitCompare`) y HUD diegético (`StoryStateHUD`, `IconPopulationGrid`, `StampedDossierCard`).
  - **Cero pestañas o contadores PowerPoint:** Prohibido mostrar títulos de capítulo arriba o contadores `1 / 14`; solo `KiwiProgressBar` inferior.
- **Regla *IP-Safe* innegociable:** **Jamás reutilizar personajes con derechos de autor** de *El Chavo*, *Don Ramón* ni *Doraemon*. Esas obras son únicamente referencia técnica y estética; cada nuevo video crea **personajes y elementos 100 % originales desde cero** acordes al tema.

### B. Línea Visual 3D PBR (`video-studio-3d/`)
- **Referencia metodológica consolidada:** Proyecto reciente de *los anillos* (`video-studio-3d/proyectos-test/demo-estudio-pbr-3d` y librería `video-studio-3d/shared-art-3d/`).
- **Estándar técnico obligatorio:** `estilo-estudio-3d-pbr` (`@remotion/three` + Three.js + React Three Fiber 100 % determinista por `useCurrentFrame()`).
  - Escenario `StudioStage3D` (iluminación HDRI procedural local con `PMREMGenerator` + `ACESFilmicToneMapping`, `--gl=angle`), materiales físicos `PBR_PRESETS`, narrativa *Macro → Corte en Micras → Escala Atómica / Exploded View*, y UI minimalista (`MinimalLuxuryCaptions3D`, `SatinMetricPill3D`, `AnamorphicSparkle3D`).
  - En cada nuevo video 3D, definir dirección de arte específica mediante preguntas consultivas y modelar piezas originales desde cero.

## 2. Tarjeta de Cierre Oficial (`BrandUnDatoMasCard`)
- **Componente canónico (para canal propio):** `studio-shared/assets/brand-private/BrandCard.tsx`.
- **Paleta oficial sagrada:** Berenjena `#321c3a` · Lima `#d7f36b` · Crema `#fff4d9`.
- **Aislamiento:** Ubicar la tarjeta sin colisionar con subtítulos inferiores ni zonas de UI de las plataformas.
- **Excepción comercial:** En comerciales para clientes externos (`produccion-comercial-anuncios`), sustituir `BrandUnDatoMasCard` por el *end-card* oficial de la marca cliente.

## 3. Especificaciones Técnicas Obligatorias
- **Resolución mínima obligatoria:** `1080×1920` (vertical `9:16`) o `1920×1080` (horizontal `16:9`) a `30/60 fps`. Prohibido entregar masters finales en `720×1280`.
- **Portadas:** Frame limpio con título gancho de `3–5` palabras sin subtítulo cortado a mitad de frase.
- **Master acústico:** EBU R128 `-18` a `-19 LUFS` integrado, True Peak `< -1.0 dBFS`, música curada con `buscar_audio.py --historia --evitar-recientes` y `12–20` micro-SFX/minuto sincronizados (`earshot` + `real-sfx` + `openverse-audio`).
