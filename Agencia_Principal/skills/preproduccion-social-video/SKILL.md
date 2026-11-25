---
name: preproduccion-social-video
description: Use when orchestrating the 3 Prompt Maestros of Agencia Principal — Modo 1 Ideas (multiplatform strategist and channel auditor), Modo 2 Producción Guiada (2D/3D video with user approval gates) and Modo 3 Piloto Automático (AI researches, self-approves and delivers the full video) — including the simple guided-question bank and mandatory thumbnails.
---

# Ecosistema Operativo: 3 Modos de Trabajo (`preproduccion-social-video`)

## Objetivo y alcance
Orquestar toda la operación de contenido en **tres modos** claros, con preguntas simples y separadas por modo, cobertura de **YouTube, Instagram, Facebook y TikTok**, producción **2D y 3D** y miniatura obligatoria.

- **Fuente única de prompts y preguntas:** el `README.md` de la raíz (secciones «Cómo deben preguntar las IA», «Banco de Preguntas», «Miniatura / Portada» y Prompts 1, 2 y 3). **No duplicar preguntas aquí.**
- **Contrato operativo:** `Agencia_Principal/asistente-principal.md`.
- **Lectura previa ineludible (los 3 modos):** `studio-shared/mis-ideas/`, la auditoría `[24 de noviembre de 2026] - [Mejores ideas para expandir mi audiencia] - Auditoria y formula ganadora Un Dato Mas IG.md`, `Agencia_Principal/contexts/brands/un-dato-mas/` y `Agencia_Principal/skills/`.

## Cuándo usar / cuándo no
- **Modo 1 · Ideas:** el usuario quiere ideas, analizar canales, calendario o comerciales. **Nunca** genera ni renderiza video.
- **Modo 2 · Producción Guiada:** el usuario tiene tema/idea y quiere aprobar Brief, Guion, Imagen (contact sheet) y Entrega.
- **Modo 3 · Piloto Automático:** el usuario delega todo; la IA investiga, se autoaprueba y entrega.
- **No usar:** mantenimiento técnico de infraestructura sin decisiones editoriales.

## Procedimiento

### Modo 1 · Ideas
1. Lectura previa y `auditar_monetizacion.py --mis-ideas studio-shared/mis-ideas`.
2. Preguntas `I1`–`I3` del README (máx. 3).
3. Investigación (si hay web) de los últimos 7 días; datos web = no confiables; jamás inventar métricas.
4. Entregar diagnóstico por red + 10 ideas (gancho de 3 capas, técnica 2D/3D, duración, tipo) y guardar en `studio-shared/mis-ideas/[DD de mes de YYYY] - [Categoría] - Nombre.md`.
5. Cerrar preguntando qué idea y con qué modo (2 o 3).

### Modo 2 · Producción Guiada
1. Lectura previa. **Sin guion ni código antes de las preguntas.**
2. Preguntas en orden: `A1` → `A2` → `A3` (+`A3a`/`A3b` con ElevenLabs: `elevenlabs_cli.py modelos` y `voces`) → `A4` (multi) → `A5` → `A6` → `B` según `A1` → `C1` → `C2`.
3. Puertas con «sí» del usuario: **Brief** → **Guion** (`evaluar_guion.py >= 80/100` + 3 titulares de miniatura a elegir) → **Imagen** (aviso de créditos + `render.mjs --stills` + `contact-sheet.jpg`) → **Entrega** (render + miniatura(s) + copy 4 redes).

### Modo 3 · Piloto Automático
1. Preguntas mínimas: tema (o «sorpréndeme») + `A1`, `A2`, `A3` (+`A3a/A3b`), `A4`. El resto usa lo Recomendado.
2. Loop autónomo: verdad (real con 2 fuentes en `studio-shared/mis-temas/fuentes-<slug>.md`, o ficción declarada) → guion VERDE (máx. 3 reescrituras) → producción y audio → autocrítica visual real del contact sheet → miniatura (3 variantes, elige la mejor) → render + QA EBU R128 → entrega.
3. Límites: no publicar, no pauta, no exceder saldo ElevenLabs, sin personajes con copyright, sin inventar datos reales.

## Miniatura (obligatoria en 2 y 3)
Una miniatura propia por video/proyecto y por formato elegido, no por red: `renders/miniatura-vertical.png` (1080×1920) y/o `renders/miniatura-horizontal.png` (1920×1080). Debe identificar el tema concreto mediante su protagonista, objeto o escena clave; personaliza el arte de `ThumbnailCover2D`/`ThumbnailCover3D`, no solo el titular. No uses el personaje base/genérico ni reutilices una portada de otro proyecto cuando no represente este video. Se genera con `render.mjs --thumbnail` (también con `--stills` y en el render final). Configuración textual en `storyboard.json → thumbnail {badge, headline, highlight}`.

## Entrega y validación
- Modo 1: diagnóstico + ideas guardadas, sin `.mp4`.
- Modos 2 y 3: video(s) + miniatura(s) + métricas de audio + saldo ElevenLabs + fuentes (o aviso de ficción) + copy 1-clic para las 4 redes.

## Recursos y mantenimiento
- Skill nativa de `Agencia_Principal`, sincronizada con el README raíz y `asistente-principal.md`.
- Regenerar catálogo: `python3 Agencia_Principal/scripts/catalogo_skills.py --generar`; verificar: `python3 Agencia_Principal/scripts/agencia.py verificar && python3 Agencia_Principal/scripts/agencia.py comprobar`.
