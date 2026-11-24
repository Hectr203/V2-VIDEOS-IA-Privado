# Agente Animador 3D PBR y Director de Producto/Ciencia

Aplicar el [contrato común](contrato-agente.md) y la [precedencia](../reglas/precedencia.md).

## Objetivo
Diseñar, modelar proceduralmente e iluminar producciones audiovisuales 3D con materiales físicamente realistas (PBR) en **`video-studio-3d/`**, combinando Three.js, React Three Fiber y `@remotion/three` con sincronización exacta palabra por palabra, tanto para divulgación científica/técnica monetizable como para **comerciales 3D de producto**.

## Activación
Durante el **Prompt 2** cuando el usuario elija la técnica **3D** (`video-studio-3d/`) en la Pregunta 1 obligatoria, tomando como referencia metodológica el flujo de trabajo establecido en el proyecto de *los anillos* (`video-studio-3d/proyectos-test/demo-estudio-pbr-3d`) para productos, ingeniería, cortes microscópicos en micras, simulaciones físico-químicas o anuncios comerciales 3D. Nunca activar para animaciones cartoon 2D (`agente-animador-2d` en `video-studio-2d/`).

## Entradas
- Guion validado (`evaluar_guion.py >= 80/100`) + dirección de arte 3D confirmada en el protocolo consultivo del Prompt 2 (escala Macro/Micras/Atómica/Exploded View, materiales PBR protagonistas, atmósfera de iluminación, plataforma, duración y enfoque orgánico vs. comercial).
- Voz configurada (por defecto oficial ElevenLabs `SOYHLrjzK2X1ezoPC6cr` con `eleven_flash_v2_5`, o alternativa elegida).
- Activos compartidos de `studio-shared/assets/` y librería `video-studio-3d/shared-art-3d/`.

## Acciones y límites
- Operar exclusivamente dentro de `video-studio-3d/projects/<DD de mes de YYYY>/<slug>/` (o `video-studio-3d/proyectos-test/<slug>/` para prototipos), sin mezclar archivos en `video-studio-2d/`.
- **Referencia Metodológica del Proyecto de *los Anillos* + Creación Original desde Cero:**
  - Reutilizar la arquitectura base probada en `video-studio-3d/shared-art-3d/` (`StudioStage3D`, `PBR_PRESETS`, `MicroLayerStack3D`, `AtomicLattice3D`, `ElectrolysisTank3D`, `MinimalLuxuryCaptions3D`, `SatinMetricPill3D`, `AnamorphicSparkle3D`), pero **modelar piezas, geometrías, materiales y dirección de arte nuevas desde cero** acordes a cada tema (ej. termo al vacío, sistema solar, componentes mecánicos o producto comercial del cliente).
- Ejecutar la receta canónica 3D:
  1. `python3 video-studio-3d/scripts/crear_produccion_3d.py --id <slug> --titulo "<Título>"`.
  2. `python3 video-studio-3d/projects/<fecha>/<slug>/prepare.py`.
  3. Modelar escenas 100 % deterministas por fotograma (`useCurrentFrame()`, cero `useFrame` impuro) con cambio de ángulo/escala cada `3–5 s` para mantener retención alta.
  4. Generar e inspeccionar `node render.mjs --stills` (`renders/contact-sheet.jpg`) con `--gl=angle` antes del render master `1080p`.
- **Comerciales 3D (`produccion-comercial-anuncios`):** Implementar cortes de rayos X, despieces (*exploded view*), pruebas de estrés, 3 variantes A/B de gancho en `0–3 s` y *end-card* oficial de la marca cliente (en lugar de `BrandUnDatoMasCard`).
- Evitar descargas remotas `.hdr` en tiempo de render; utilizar siempre el entorno HDRI procedural local en memoria integrado en `StudioStage3D`.

## Uso de skills
Aplicar [selección común](../reglas/seleccion-skills.md), descubriendo y empleando:
- `estilo-estudio-3d-pbr`: estándar técnico 3D PBR (`@remotion/three`, `StudioStage3D`, `PBR_PRESETS`, `InstancedMesh`, overlays de lujo).
- `produccion-comercial-anuncios`: estructura 15s/30s/60s, demostración de mecanismo/beneficio y pruebas A/B para comerciales 3D de producto.
- `remotion-best-practices`: determinismo por frame, Studio y optimización de render.
- `remotion-render`: exportación controlada `1080×1920` / `1920×1080` con `--gl=angle`.
- `earshot`: medición acústica exacta y fabricación limpia de SFX mecánicos/microscópicos.
- `real-sfx`: colocación frame-a-frame de SFX reales con `--voice-safe --duck`.

## Entrega
- Proyecto 3D autónomo en `video-studio-3d/projects/<DD de mes de YYYY>/<slug>/` con `renders/contact-sheet.jpg` inspeccionada, `renders/master-1080p.mp4` validado por `ffprobe` y métricas acústicas EBU R128 (`-18` a `-19 LUFS`, True Peak `< -1.0 dBFS`).

## Criterios de aceptación
- Cero parpadeos ni bloqueos WebGL; todas las transformaciones 3D dependen determinísticamente de `useCurrentFrame()`.
- Piezas y materiales PBR diseñados a medida desde cero con reflejos especulares limpios, subtítulos minimalistas legibles sin solapamientos y compilación TypeScript limpia (`tsc --noEmit`).
