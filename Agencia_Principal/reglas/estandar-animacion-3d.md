# Estándar de Producción y Diseño 3D PBR en `video-studio-3d`

Aplicar la [precedencia](precedencia.md) y el [contrato común](../agentes/contrato-agente.md).

## 1. Aislamiento Estricto de Estudios (`video-studio-3d` vs `video-studio-2d`)
- **Separación total de entornos:** Toda producción tridimensional con mallas, materiales físicos PBR, cámaras orbitales WebGL y simulaciones atómicas/de capas reside exclusivamente en **`video-studio-3d/`** (puertos por defecto: Backend `8010`, Frontend `5183`). Jamás mezclar proyectos 3D dentro de `video-studio-2d/`.
- **Organización cronológica obligatoria:**
  - Producciones oficiales: `video-studio-3d/projects/<DD de mes de YYYY>/<slug>/` (protegido por hook).
  - Prototipos y pruebas: `video-studio-3d/proyectos-test/<slug>/` (protegido por hook).
- **Activos globales compartidos sin duplicidad:** Ambos estudios enlazan `assets`, `mis-ideas` y `mis-temas` hacia `studio-shared/` para unificar el catálogo de 414 audios, el historial anti-repetición y la identidad de marca.

## 2. Motor Técnico 3D (`@remotion/three` + Three.js PBR)
- **100 % Determinista por Fotograma:** Todo giro, traslación de cámara, crecimiento de capa, oxidación o depósito atómico debe calcularse en función de `useCurrentFrame()` (cero `useFrame` impuro basado en reloj delta en tiempo real).
- **Iluminación HDRI Procedural Local (`StudioStage3D`):** Emplear `RoomEnvironment` + `THREE.PMREMGenerator` y `ACESFilmicToneMapping` desde `video-studio-3d/shared-art-3d/` para obtener reflejos metálicos realistas sin depender de archivos `.hdr` remotos, renderizando con `chromiumOptions = {gl: 'angle'}`.
- **Geometría Procedural + Soporte `.glb` Opcional:** Construir piezas técnicas, anillos biselados (`BeveledRing3D`), cortes microscópicos (`MicroLayerStack3D`), tanques transparentes (`ElectrolysisTank3D`) y mallas atómicas (`AtomicLattice3D` con `InstancedMesh`) directamente en TypeScript; usar `useGLTF` solo cuando se requiera un modelo orgánico complejo.

## 3. Voz Predeterminada y Estándar Acústico
- **ElevenLabs Voz Oficial por Defecto:** `SOYHLrjzK2X1ezoPC6cr` (`ELEVENLABS_DEFAULT_VOICE_ID=SOYHLrjzK2X1ezoPC6cr`, modelo por defecto `eleven_flash_v2_5`) a través del Gateway Multi-Cuenta.
- **Puerta de Calidad Pre-Render:** Generar obligatoriamente `render.mjs --stills` (`renders/contact-sheet.jpg`), validar compilación TypeScript y comprobar niveles EBU R128 (`-18` a `-19 LUFS`, True Peak `< -1.0 dBFS`) antes de entregar.
