# Estándar de Producción y Diseño 3D PBR en `video-studio-3d`

Aplicar la [precedencia](precedencia.md) y el [contrato común](../agentes/contrato-agente.md).

## 1. Aislamiento Estricto de Estudios y Referencia Metodológica (`video-studio-3d` vs `video-studio-2d`)
- **Separación total de entornos:** Toda producción tridimensional con mallas, materiales físicos PBR, cámaras orbitales WebGL y simulaciones atómicas/de capas reside exclusivamente en **`video-studio-3d/`** (Backend FastAPI en puerto `8010`, sin frontend web). Jamás mezclar proyectos 3D dentro de `video-studio-2d/`.
- **Referencia metodológica consolidada (*los anillos*):** Todo nuevo proyecto 3D toma como base arquitectónica el flujo establecido en el proyecto reciente de *los anillos* (`video-studio-3d/proyectos-test/demo-estudio-pbr-3d` y `video-studio-3d/shared-art-3d/`), definiendo mediante preguntas consultivas del **Prompt 2** la dirección de arte específica (escala espacial, materiales PBR, iluminación y geometrías originales modeladas desde cero) para cada nuevo tema o **comercial 3D de producto** (`produccion-comercial-anuncios`).
- **Organización cronológica obligatoria:**
  - Producciones oficiales: `video-studio-3d/projects/<DD de mes de YYYY>/<slug>/` (protegido por hook).
  - Prototipos y pruebas: `video-studio-3d/proyectos-test/<slug>/` (protegido por hook).
- **Activos globales compartidos sin duplicidad:** Ambos estudios enlazan `assets`, `mis-ideas` y `mis-temas` hacia `studio-shared/` para unificar el catálogo de 414 audios, el historial anti-repetición y la identidad de marca.

## 2. Motor Técnico 3D (`@remotion/three` + Three.js PBR)
- **100 % Determinista por Fotograma:** Todo giro, traslación de cámara, crecimiento de capa, oxidación, despiece (*exploded view*) o depósito atómico debe calcularse en función de `useCurrentFrame()` (cero `useFrame` impuro basado en reloj delta en tiempo real), variando ángulo/escala cada `3–5 s` para mantener retención alta.
- **Iluminación HDRI Procedural Local (`StudioStage3D`):** Emplear softbox dome procedural + `THREE.PMREMGenerator` y `ACESFilmicToneMapping` desde `video-studio-3d/shared-art-3d/` para obtener reflejos metálicos realistas sin depender de archivos `.hdr` remotos, renderizando con `chromiumOptions = {gl: 'angle'}`.
- **Geometría Procedural Original + Soporte `.glb` Opcional:** Construir piezas técnicas a medida (anillos biselados `BeveledRing3D`, cortes microscópicos `MicroLayerStack3D`, tanques transparentes `ElectrolysisTank3D`, mallas atómicas `AtomicLattice3D` con `InstancedMesh` o productos nuevos de comerciales) directamente en TypeScript; usar `useGLTF` solo cuando se requiera un modelo orgánico complejo.

## 3. Voz Predeterminada, Comerciales y Estándar Acústico
- **ElevenLabs Voz Oficial por Defecto:** `SOYHLrjzK2X1ezoPC6cr` (`ELEVENLABS_DEFAULT_VOICE_ID=SOYHLrjzK2X1ezoPC6cr`, modelo por defecto `eleven_flash_v2_5`) a través del Gateway Multi-Cuenta.
- **Resolución mínima:** `1080×1920` (`9:16`), `1920×1080` (`16:9`) o `1:1`/`4:5` comercial.
- **Puerta de Calidad Pre-Render:** Generar e inspeccionar obligatoriamente `render.mjs --stills` (`renders/contact-sheet.jpg`), validar compilación TypeScript (`tsc --noEmit`) y comprobar niveles EBU R128 (`-18` a `-19 LUFS`, True Peak `< -1.0 dBFS`) antes de entregar.
