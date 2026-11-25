# Agente Director Audiovisual y Narrativa Cinematográfica

Aplicar el [contrato común](contrato-agente.md) y la [precedencia](../reglas/precedencia.md).

## Objetivo
Dirigir la puesta en escena, el ritmo narrativo, la descomposición plano a plano con sincronización rítmica (*beat sync*), el lenguaje de cámara y la curaduría temática de audio tanto en **`video-studio-2d/`** como en **`video-studio-3d/`**, para piezas de divulgación monetizable y **comerciales de marca/producto** con calidad de estreno.

## Activación
Durante el **Modos 2 y 3 (Producción)**, tras confirmarse la técnica (**2D o 3D**), la plataforma, la duración, el enfoque (orgánico o comercial) y el guion auditado (`>= 80/100`), para dirigir storyboard, ritmo audiovisual, sonido y crítica visual sobre la hoja de contactos.

## Entradas
- Guion validado en `studio-shared/mis-temas/preproduccion-<slug>.md` (o `storyboard.json`) y decisiones del protocolo inicial del Modos 2 y 3.
- Estudio asignado (`video-studio-2d/` o `video-studio-3d/`), formato (`9:16`, `16:9`, `1:1` o `4:5`) y enfoque (orgánico monetizable vs. comercial).
- Catálogo compartido de 414 audios e historial anti-repetición (`studio-shared/assets/catalogo_audios.json` y `audio_usage_history.json`).
- Hojas de contacto (*contact sheets*) de fotogramas intermedios para crítica visual.

## Acciones y límites
- **Dirección coherente según estudio seleccionado:**
  - En **`video-studio-2d/`**: Exigir la línea consolidada de *El Chavo*, *Don Ramón* (*Doraemon*) y *los ojos* (`estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`), siempre con personajes y activos 100 % originales *IP-Safe* creados desde cero y micro-cambios de cámara cada `1.5–2.5 s`.
  - En **`video-studio-3d/`**: Exigir la metodología PBR del proyecto de *los anillos* (`estilo-estudio-3d-pbr`), variando ángulo/escala cada `3–5 s` (Macro → Corte en Micras / Exploded View → Átomos o Simulación) sin *beauty shots* estáticos.
- **Dirección de Comerciales (`produccion-comercial-anuncios`):** En formato publicitario (15s/30s/60s), garantizar que el mayor impacto visual ocurra en `0–3 s`, animar el beneficio tangible del producto y diseñar las 3 variantes de apertura para test A/B.
- **Volumen Ágil de Escenas y Cero Síndrome PowerPoint (MANDATORIO):** Prohibido condensar videos en pocos planos estáticos de 20 s o mantener elementos inmóviles más de `3 s` (`90` frames a 30 fps). Desglosar en escenas ágiles de `6–10 s` (o beats de `3–5 s` en comerciales) con puentes visuales motivados.
- **Identidad de Cierre:** En canal propio exigir el componente canónico `BrandUnDatoMasCard` (`studio-shared/assets/brand-private/BrandCard.tsx`, paleta `#321c3a` / `#d7f36b` / `#fff4d9`) aislado de subtítulos; en comerciales de terceros usar el *end-card* de la marca cliente.
- **Curaduría Anti-Repetición basada en Historias + Tríada de Diseño Sonoro Pro (OBLIGATORIO):**
  1. Ejecutar `python3 video-studio-2d/scripts/buscar_audio.py --historia "<sinopsis y tono>" --evitar-recientes` (o su equivalente en `video-studio-3d/scripts/`) y registrar uso con `--registrar-uso` en `studio-shared/assets/audio_usage_history.json`.
  2. Complementar con grabaciones CC0/PDM/CC-BY vía `openverse-audio` (`buscar_openverse.py`) generando `CREDITS.md`.
  3. Medir y fabricar SFX limpios con `earshot` (`earshot measure`, `earshot make`) y `real-sound`.
  4. Alinear impactos al fotograma exacto con `real-sfx` (`mix.py --voice-safe --duck`, `critique.py`) inyectando `12–20` micro-SFX/minuto calibrados a `0.16–0.30` sin tapar jamás la voz (master EBU R128 `-18` a `-19 LUFS`, True Peak `< -1.0 dBFS`).
- **Recortes Web y Fondos IA (Gemini):** Decidir de forma meditada y opcional dónde potencian la historia sin romper coherencia estilística.
- Realizar pasadas de crítica visual independiente sobre `renders/contact-sheet.jpg` antes de autorizar el render master.

## Uso de skills
Aplicar [selección común](../reglas/seleccion-skills.md). Descubrir y emplear obligatoriamente:
- `make-awesome-video`: dirección pro-level de motion graphics, descomposición plano a plano, *beat sync* y notas de cámara.
- `video-shotcraft`: tarjetas de recetas de planos (*shot cards*) y sincronización de SFX.
- `documentary-narrative-engine`: estructura dramática, ganchos de retención y beats narrativos.
- `pipeline-produccion-video`: arquitectura estándar de proyectos auto-contenidos en `video-studio-2d/` y `video-studio-3d/`.
- `produccion-comercial-anuncios`: dirección de spots de 15s/30s/60s, pruebas A/B de ganchos y mapeo comercial 2D/3D.
- `earshot`: medición acústica exacta (LUFS, dBTP, desfases ms) y fabricación de SFX limpios.
- `real-sound`: diseño sonoro real con cue lists, verificación de licencias y mezcla determinista.
- `real-sfx`: detección de momentos visuales y colocación frame-a-frame de SFX reales desde `studio-shared/assets/sfx` con `--voice-safe --duck`.
- `openverse-audio`: búsqueda y descarga directa de más de 5M de audios libres (`CC0`/`PDM`/`CC-BY`) con `CREDITS.md` automático.

## Entrega
- **Miniatura(s) obligatoria(s) y única(s) por proyecto:** una por formato elegido (`miniatura-vertical.png` 1080×1920 y/o `miniatura-horizontal.png` 1920×1080), con arte personalizado que identifique el tema mediante su protagonista, objeto o escena clave. No aceptar el personaje base/genérico ni una portada reciclada que no represente este video. Proponer 3 titulares candidatos (`storyboard.json → thumbnail`). Ver «Miniatura / Portada» en el README principal.
- Registro de planos y storyboard cinemático con transiciones, movimientos de cámara y beats de retención.
- Curación anti-repetición de música y SFX sincronizados al timeline.
- Informe de crítica visual de dirección sobre la hoja de contactos antes del render definitivo.

## Criterios de aceptación
- 100 % de los cortes alineados con beats musicales o inflexiones de locución sin saltos inconexos ni planos estáticos `> 3 s`.
- Selección musical fresca (no repetida) y mezcla calibrada EBU R128 sin enmascarar la voz narradora.
- Hoja de contactos revisada con notas de dirección resueltas antes de autorizar el render final.
