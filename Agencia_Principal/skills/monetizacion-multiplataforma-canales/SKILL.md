---
name: monetizacion-multiplataforma-canales
description: Use when auditing all four active channels (YouTube, Instagram, Facebook, TikTok), designing cross-platform monetization and content atomization plans, or prioritizing topics by RPM, retention, and commercial scalability.
---

# Auditoría y Monetización Multiplataforma de Canales (`monetizacion-multiplataforma-canales`)

## Objetivo y alcance
Estandarizar la auditoría integral, el plan de crecimiento y la arquitectura de monetización sobre el ecosistema completo de **4 plataformas activas**: **YouTube**, **Instagram**, **Facebook** y **TikTok**, asegurando coherencia absoluta con el historial de `studio-shared/mis-ideas` y trazando el puente desde ingresos orgánicos hacia producción de comerciales.

- **Alcance:** Diagnóstico de los 4 canales, matriz de monetización/RPM, atomización inteligente 1-a-4 sin penalización por reciclado, priorización editorial y auditoría CLI local (`scripts/auditar_monetizacion.py`).
- **Exclusión:** No inventa métricas, no omite ninguna de las 4 plataformas y no genera ni renderiza videos finales.

## Cuándo usar / cuándo no usar
- **Usar cuando:**
  - Se activa el **Prompt 1 (Estratega, Auditor y Project Manager)** para analizar YouTube, Instagram, Facebook y TikTok.
  - Se planifica un calendario mensual o semanal orientado a alcanzar requisitos de monetización y maximizar retención.
  - Se decide qué duración, formato y adaptación nativa aplicar a una idea ganadora en las 4 redes.
- **No usar cuando:**
  - El usuario solicita únicamente corrección técnica de código o renderizado sin estrategia de canal.

## Entradas y requisitos
1. **Lectura previa obligatoria:**
   - Directorio `studio-shared/mis-ideas/`.
   - Auditoría base vigente: `studio-shared/mis-ideas/[24 de noviembre de 2026] - [Mejores ideas para expandir mi audiencia] - Auditoria y formula ganadora Un Dato Mas IG.md`.
   - Perfil de marca en `Agencia_Principal/contexts/brands/un-dato-mas/` (si existe).
2. **Script verificable incluido:** `scripts/auditar_monetizacion.py` (ejecutable en Python 3 sin dependencias externas).

## Procedimiento

### 1. Ingesta Obligatoria de Identidad e Historial
Antes de opinar o proponer ideas, ejecutar el auditor local o leer directamente `studio-shared/mis-ideas/`:
```bash
python3 Agencia_Principal/skills/monetizacion-multiplataforma-canales/scripts/auditar_monetizacion.py \
  --mis-ideas studio-shared/mis-ideas
```
Extraer: mediana histórica, mejores *outliers* verificados, pilares ganadores (ej. Nostalgia/Historia Humana LATAM `60%`, Ciencia Cotidiana/Mitos Rotos `25%`, Mascotas/Afecto `15%`), errores detectados (ráfagas, baja resolución `720×1280`, videos de >3 min en Reels, hashtags ajenos como `#AprendeEnTikTok`, palabras sensibles en línea 1).

### 2. Matriz Unificada de las 4 Plataformas (Nunca Omitir Ninguna)

| Plataforma | Motor Principal de Monetización | Duración y Formato Ganador | Métrica Reina de Retención | Palanca de Crecimiento Nativa |
|---|---|---|---|---|
| **YouTube** | YPP (`1,000` subs + `4,000 h` long-form o `10M` vistas Shorts 90 d) · Long-form RPM alto + Shorts como embudo de suscriptores | Shorts `9:16` (`45–60 s`) + Video Largo `16:9` (`4–10 min` expandiendo *outliers*) | `Viewed vs. Swiped Away >= 70%` en Shorts · CTR portada/título + retención 30 s en Long-form | SEO buscable (`yt-package/title.py`), miniatura complementaria al título, series y listas de reproducción. |
| **Instagram** | Crecimiento de audiencia, *Brand Deals*, patrocinios, embudo a servicios comerciales e Instagram Gifts | Reels `9:16` (`45–75 s`, máx. `90 s` en historia profunda) en `1080×1920` | **Envíos por DM por alcance (*Sends/Reach*)**, guardados y tasa de finalización/rewatch | Portada limpia (`3–5` palabras), `3–5` hashtags de nicho, CTA de envío por DM y `1` Reel cada `24–48 h`. |
| **Facebook** | **Facebook Content Monetization** (programa unificado: Reels + Video Nativo + Posts; alto potencial en LATAM 25–55+) | Reels `9:16` (`45–85 s`) + Video Nativo `16:9`/`4:5` (`3–6 min`) sin marcas de agua | **Vistas Calificadas (*Qualified Views*)**, retención 0–3 s y **Velocidad de Compartidos (*Shares*)** | Narrativa 100 % original, disparadores de nostalgia/familia/utilidad, comunidad/Grupos y enlaces solo en comentario fijado. |
| **TikTok** | **Creator Rewards Program** (exige videos originales `> 60 s` y `10K` seguidores / `100K` vistas 30 d) + TikTok SEO | Vertical `9:16` de **`62–90 s`** (para calificar a Rewards) o `35–55 s` en fase de tracción inicial | Retención en los primeros `5 s` (vista calificada), *completion rate* y búsquedas por palabra clave | Palabra clave dicha en voz alta + texto en pantalla + copy buscable, cierre en bucle (*loop*) y respuesta en video a comentarios. |

### 3. Sistema de Atomización 1-a-4 (Una Producción Inteligente, 4 Entregas Nativas)
Al aprobar una idea ganadora en Prompt 1, definir su plan de distribución nativa para evitar penalizaciones por duplicación bruta:
1. **Master Vertical Limpio (`1080×1920`, `62–75 s`):** Cumple el punto dulce de Instagram Reels (`45–75 s`), califica para TikTok Creator Rewards (`> 60 s`) y funciona en Facebook Reels y YouTube Shorts (sin marcas de agua ni hashtags cruzados).
2. **Variación de Gancho / Portada / Copy por Red:**
   - **Instagram:** Copy breve + CTA de envío por DM + portada de `3–5` palabras + `3–5` hashtags de nicho.
   - **Facebook:** Primera línea comunitaria/emocional + CTA de compartir/recuerdo + cero enlaces externos en cuerpo.
   - **TikTok:** Texto buscable en los primeros `3 s` + copy optimizado para búsqueda interna de TikTok + comentario fijado que abre debate.
   - **YouTube:** Título optimizado (`yt-package/title.py`, `<= 40` chars críticos en móvil) + descripción SEO + versión larga `16:9` (`4–8 min`) solo para temas que rompan `>= 3x` la mediana en formato corto.

### 4. Hoja de Ruta en 2 Etapas (Monetización Orgánica → Agencia Comercial)
- **Etapa 1 · Monetización de Canales Propios:** Consolidar cadencia limpia (`1080×1920`, 0 ráfagas), escalar pilares validados (`60/25/15`) y priorizar formatos con mejor retorno de tiempo/RPM (Facebook Reels/Watch + TikTok `>60 s` + YouTube embudo Shorts→Long-form + IG autoridad/alcance).
- **Etapa 2 · Productora de Comerciales (B2B / Marcas):** Usar el portafolio 2D (`video-studio-2d`) y 3D PBR (`video-studio-3d`) como demostración viva de retención para vender spots comerciales de `15s / 30s / 60s` (`produccion-comercial-anuncios` + `ad-creative` + `crm`).

## Entrega y validación
1. Resultado verificado de `auditar_monetizacion.py` (sin datos inventados).
2. Diagnóstico separado para **YouTube, Instagram, Facebook y TikTok** (las 4 obligatorias).
3. Plan accionable de ideas, cadencia, formato y monetización guardado automáticamente en `studio-shared/mis-ideas/[DD de mes de YYYY] - [Categoría] - Nombre del tema.md`.

## Recursos, procedencia y mantenimiento
- **Scripts:** `scripts/auditar_monetizacion.py`.
- **Procedencia:** Skill nativa de `Agencia_Principal`, coordinada con `facebook-growth-monetizacion`, `preproduccion-social-video`, `yt-viral`, `yt-package`, `social` y `content-strategy`.
- **Mantenimiento:** Regenerar catálogo con `python3 Agencia_Principal/scripts/catalogo_skills.py --generar`.
