---
name: facebook-growth-monetizacion
description: Use when auditing a Facebook Page or Reels strategy, diagnosing low reach or unoriginal-content penalties on Facebook, designing shareable 9:16 or native 16:9 videos for LATAM audiences, or optimizing for the unified Facebook Content Monetization program.
---

# Crecimiento y Monetización Estratégica en Facebook (`facebook-growth-monetizacion`)

## Objetivo y alcance
Diseñar, auditar y optimizar estrategias de crecimiento orgánico, retención y monetización en **Facebook (Páginas, Reels, Video Nativo y Grupos)** bajo el **Programa Unificado de Monetización de Contenido de Facebook** (*Facebook Content Monetization*, que consolidó *In-Stream Ads*, *Ads on Reels* y *Performance Bonuses*).

- **Alcance:** Auditoría de páginas, ingeniería de compartidos (*Share Velocity*), adaptación nativa anti-penalización desde Instagram/TikTok/YouTube, calendario editorial y arquitectura de retención orientada a *Vistas Calificadas*.
- **Exclusión:** No publica ni automatiza cuentas sin autorización explícita; no promete ingresos garantizados ni fabrica métricas no observadas.

## Cuándo usar / cuándo no usar
- **Usar cuando:**
  - El usuario solicita analizar su canal de Facebook (Prompt 1) o escalar su marca/canal hacia monetización directa en Meta.
  - Se adapta un guion o video pensado para Instagram/TikTok/YouTube hacia Facebook sin caer en penalización por *contenido no original*.
  - Se diseñan campañas orgánicas o comerciales para audiencia hispanohablante 25–55+ (fuerte en nostalgia, familia, salud cotidiana, ciencia explicada y comunidad).
- **No usar cuando:**
  - La tarea es exclusivamente de código Remotion o render local sin decisiones de plataforma.

## Entradas y requisitos
- Lectura obligatoria previa de `studio-shared/mis-ideas/` y de la auditoría de identidad vigente (`[24 de noviembre de 2026] - [Mejores ideas para expandir mi audiencia] - Auditoria y formula ganadora Un Dato Mas IG.md`).
- Métricas reales o URLs de la página de Facebook si el usuario las aporta o si hay acceso de navegador disponible (separar siempre hechos observados de hipótesis).

## Procedimiento

### 1. Cumplimiento Estricto de Originalidad (Cero Penalización Algorítmica)
Facebook penaliza severamente y desmonetiza contenido reciclado sin transformación sustancial:
1. **Prohibido subir con marcas de agua** de TikTok, CapCut o identificadores de otras redes.
2. **Prohibido copiar el mismo copy/hashtags de TikTok** (ej. jamás dejar `#AprendeEnTikTok` o `#FYP` en Facebook).
3. **Diferenciación nativa cuando se reutiliza un guion ganador:**
   - Ajustar el texto en pantalla inicial (0–3 s) y la portada/miniatura con lenguaje más directo y comunitario para audiencia 25–55+.
   - Exportar master limpio (`1080×1920` para Facebook Reels o `1920×1080` / `1080×1350` para video nativo del Feed) con narrativa 100 % propia (`video-studio-2d` o `video-studio-3d`).
   - Evitar enlaces externos en el cuerpo principal de la publicación (reducen el alcance orgánico); si se requiere enlace comercial o de comunidad, ubicarlo en el **primer comentario fijado**.

### 2. Palancas Algorítmicas y de Monetización (Facebook Content Monetization)
Evaluar cada idea o video bajo los 4 multiplicadores reales del programa unificado:

| Palanca | Qué mide Facebook | Regla operativa para guion y edición |
|---|---|---|
| **Gancho 0–3 s (Scroll-Stop)** | Filtrado de *Qualified Views* (vistas calificadas que superan el rebote inicial) | Entrar *in media res* en la palabra 1 con contraste visual inmediato y subtítulo legible en silencio (`3–5` palabras). |
| **Velocidad de Compartidos (*Shares*)** | Empuje hacia feeds secundarios y grupos familiares/comunitarios | Diseñar remates que la gente quiera enviar a su pareja, padres, hijos o amigos (*nostalgia LATAM*, *alertas cotidianas de salud/hogar*, *mitos rotos*, *mascotas*). |
| **Retención y Tiempo de Reproducción** | Tasa de finalización y *Earnings Rate* por mil vistas calificadas | Micro-cambios visuales cada `1.5–2.5 s` en 2D (`dinamismo-visual-2d`) o cambio de ángulo/escala cada `3–5 s` en 3D (`estilo-estudio-3d-pbr`); *re-hooks* cada 2 escenas. |
| **Conversación Genuina en Comentarios** | Señal de comunidad activa (evitando *engagement bait*) | Cerrar con una pregunta de experiencia personal o memoria compartida (ej. *"¿Con quién veías este programa en casa?"*); prohibido *"Comenta SÍ"* o *"Dale like si amas a..."*. |

### 3. Arquitectura de Formatos para Monetizar Facebook
Combinar tres formatos complementarios según la madurez de la página:
1. **Facebook Reels (`9:16`, 45–85 s):** Motor principal de descubrimiento y captura de audiencia fría (concentra la mayor cuota de pagos de creadores en video corto). Ideal para historias humanas, datos contraintuitivos y micro-ciencia visual 3D.
2. **Video Nativo Largo (`16:9` o `4:5`, 3–6 min):** Ideal para expandir un tema que ya fue *outlier* en Reels (ej. versión extendida de *El Chavo*, *Don Ramón*, *cómo funciona un objeto 3D* o mini-documental), multiplicando los minutos reproducidos y el *watch time* monetizable.
3. **Publicación Puente de Comunidad / Grupos:** Pregunta ilustrada o carrusel breve derivado del video ganador para mantener viva la página entre entregas y dirigir tráfico hacia un Grupo propio o futuras ofertas comerciales.

### 4. Cadencia, Higiene Editorial y Diagnóstico
- **Cadencia recomendada:** `1` pieza principal al día o `4–5` por semana con mínimo `12–18 h` entre publicaciones (nunca ráfagas de varios videos en una misma noche).
- **Copy nativo para Facebook:**
  - Línea 1 (antes de *"Ver más"*): tensión o dato que detiene el scroll sin *clickbait* vacío.
  - Cuerpo: `2–3` líneas de contexto humano legible en móvil.
  - Cierre: `1` pregunta conversacional o invitación natural a compartir con alguien específico.
  - Hashtags: máximo `2–4` hashtags limpios de nicho en español (opcionales; Facebook prioriza palabras clave naturales en el texto y subtítulos).
- **Escalabilidad comercial:** Usar las piezas de mayor retención y compartidos como base orgánica de prueba para futuros anuncios en Meta Ads (*Partnership Ads* / comerciales 2D o 3D en `produccion-comercial-anuncios`).

## Entrega y validación
Toda auditoría o plan de Facebook entrega:
1. **Diagnóstico de salud de la página** (originalidad, retención 0–3 s, formato, cadencia y cuellos de botella de monetización).
2. **Adaptaciones nativas obligatorias** respecto a Instagram, TikTok y YouTube.
3. **Banco de ideas/ángulos optimizados para *Shares* y *Qualified Views*** guardado en `studio-shared/mis-ideas/[DD de mes de YYYY] - [Categoría] - Nombre del tema.md`.
4. **Copy nativo limpio** auditado con `post-scorer >= 75/100` y libre de *engagement bait* o clichés de IA.

## Recursos, procedencia y mantenimiento
- **Procedencia:** Skill nativa de `Agencia_Principal` (MIT interno), complementaria a `social`, `monetizacion-multiplataforma-canales`, `viral-captions-and-ctas` y `produccion-comercial-anuncios`.
- **Mantenimiento:** Regenerar catálogo con `python3 Agencia_Principal/scripts/catalogo_skills.py --generar` tras modificaciones.
