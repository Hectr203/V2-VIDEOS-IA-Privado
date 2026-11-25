---
name: produccion-comercial-anuncios
description: Use when scripting, structuring, or directing commercial video ads (15s, 30s, or 60s) for products, brands, or services using either 2D cartoon storytelling (video-studio-2d) or 3D PBR product visualization (video-studio-3d).
---

# Producción de Comerciales y Anuncios 2D/3D (`produccion-comercial-anuncios`)

## Objetivo y alcance
Convertir la infraestructura de la productora audiovisual (`video-studio-2d` y `video-studio-3d`) en una máquina determinista de **comerciales y anuncios de respuesta directa o branding** (15s, 30s y 60s), escalando el mismo estándar de retención orgánica hacia campañas pagadas y clientes comerciales.

- **Alcance:** Brief comercial, arquitectura de guion 15s/30s/60s, selección del motor óptimo (2D storytelling vs. 3D PBR producto), pruebas A/B de 3 ganchos, diseño de *end-cards* comerciales y especificaciones por plataforma (Meta/Facebook/Instagram Ads, TikTok Ads, YouTube Ads).
- **Exclusión:** No lanza campañas pagadas ni configura gasto publicitario sin autorización expresa; nunca fabrica testimonios, estadísticas clínicas ni garantías legales inexistentes.

## Cuándo usar / cuándo no usar
- **Usar cuando:**
  - En el **Modos 2 y 3 (Producción)**, el usuario elige el enfoque **Formato Comercial / Anuncio de Producto / Marca** (en lugar de entretenimiento educativo orgánico).
  - En el **Modo 1 (Ideas)**, se diseña una campaña comercial o propuesta de monetización vía clientes/patrocinios.
  - Se requiere animar un producto físico en 3D PBR (cortes de rayos X, despieces *exploded view*, pruebas de resistencia, acabados de lujo) o dramatizar un problema-solución en 2D cartoon original.
- **No usar cuando:**
  - El video es puramente de divulgación/curiosidades orgánicas del canal sin objetivo publicitario.

## Entradas y requisitos
- Confirmación previa obligatoria del **formato 2D vs. 3D** (Pregunta 1 del Modos 2 y 3).
- Brief comercial mínimo: producto/servicio, dolor principal del comprador, mecanismo diferenciador real (prueba tangible), oferta/CTA autorizado, plataformas de pauta y activos de marca (`contexts/brands/<marca>/`).
- Skills complementarias: `ad-creative`, `copywriting`, `marketing-psychology`, `estilo-cartoon-editorial-3d` + `dinamismo-visual-2d` (ruta 2D) o `estilo-estudio-3d-pbr` (ruta 3D).

## Procedimiento

### 1. Decisión de Motor Audiovisual Comercial (2D vs. 3D)

| Tipo de Comercial | Motor Recomendado | Recursos Nativos del Estudio |
|---|---|---|
| **Storytelling de dolor cotidiano, SaaS, servicios, humor de marca o explicador ágil** | **`video-studio-2d/`** (`estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`) | Personajes 100 % originales *IP-Safe* (mascotas o arquetipos de cliente creados desde cero), `DynamicCameraRig2D`, `VersusSplitBackdrop` (Antes vs. Después), `StampedDossierCard` y `locomotion-templates`. |
| **Producto físico, joyería, tecnología, cosmética, bebidas, ingeniería, demostración interna** | **`video-studio-3d/`** (`estilo-estudio-3d-pbr`, referencia metodológica del proyecto de *los anillos*) | Escenario `StudioStage3D` con reflejos HDRI PBR, giros macro con `AnamorphicSparkle3D`, cortes transversales/rayos X (`MicroLayerStack3D`), vistas explosivas (*exploded view*) y `SatinMetricPill3D`. |

### 2. Estructuras Maestras de Guion Comercial (Direct Response + Branding)

#### Spot de 15 segundos (Thumb-Stopper / Retargeting · `35–45` palabras)
- **`0–3 s` · Gancho Disruptivo:** Mostrar el problema extremo o el plano macro más impactante del producto desde el frame 1. Texto en pantalla `<= 5` palabras.
- **`3–10 s` · Mecanismo Único:** Demostración visual inmediata (corte 3D en rayos X o contraste 2D Antes/Después) que pruebe *cómo* funciona el beneficio.
- **`10–15 s` · Oferta + CTA:** Plano héroe limpio + *end-card* de alto contraste con oferta verificada y acción única.

#### Spot de 30 segundos (Estándar de Adquisición Fría · `65–80` palabras)
- **`0–3 s` · Gancho (3 Variantes A/B):** Visual + verbal + texto sin sonido.
- **`3–10 s` · Agitación del Dolor:** Dramatizar la fricción actual o falla de alternativas genéricas (comparativa lado a lado).
- **`10–22 s` · Solución + Demostración Visual:** Despiece 3D o demostración paso a paso en 2D animando el **beneficio humano**, no solo especificaciones frías.
- **`22–30 s` · Prueba Social / Garantía + CTA:** Sello de confianza real + incentivo y llamado a la acción sin fricción.

#### Spot de 60 segundos (Alto Ticket / Producto Técnico · `130–150` palabras)
- **`0–4 s` · Pattern Interrupt:** Zoom macro a la falla oculta o paradoja del mercado.
- **`4–15 s` · Costo Oculto del Problema:** Simulación de desgaste, pérdida de tiempo o dinero.
- **`15–38 s` · Ingeniería / Historia del Mecanismo:** Secuencia cinemática de ensamblaje, capas microscópicas o narrativa de transformación.
- **`38–50 s` · Prueba de Estrés / Resultados Verificables:** Comparativa de durabilidad, eficiencia o casos documentados.
- **`50–60 s` · Oferta, Urgencia Honesta y Cierre de Marca:** *End-card* con logo de cliente, URL o botón de acción (sin usar `BrandUnDatoMasCard` cuando sea para marca externa).

### 3. Reglas de Retención y Pruebas A/B para Comerciales
1. **Regla de los 3 Ganchos Modulares:** Entregar siempre **3 aperturas alternativas (0–3 s)** para el mismo cuerpo del comercial (1 de dolor/fricción, 1 contraintuitiva/curiosidad y 1 de demostración macro instantánea) para pruebas A/B en Meta/TikTok/YouTube Ads.
2. **Visionado sin Sonido (`Sound-Off First`):** Subtítulos cinéticos limpios en zona segura resaltando beneficios clave (`<= 2` líneas simultáneas) respetando zonas de UI de anuncios.
3. **Pattern Interrupt Obligatorio:** En 2D cambiar encuadre cada `1.5–2.5 s`; en 3D cambiar ángulo de cámara/escala cada `3–5 s`. Jamás dejar un *beauty shot* estático.
4. **Cumplimiento Publicitario y Veracidad:** Prohibido inventar cifras (`"3x más fuerte"` requiere evidencia del cliente marcada como `[CONFIRMAR CON CLIENTE]`), prohibido *clickbait* prohibido por políticas de Meta/TikTok/Google Ads.

### 4. Entregables de Producción Comercial
- Guion cronometrado (`15s / 30s / 60s`) + **3 variantes de gancho (0–3 s)** + *Primary Text* y titulares de anuncio (`ad-creative`).
- Exportaciones multi-aspecto según pauta (`9:16` Reels/TikTok/Shorts, `16:9` YouTube In-Stream, `1:1` o `4:5` Feed Meta).
- Hoja de contactos inspeccionada (`contact-sheet.jpg`) y mezcla EBU R128 (`-18` a `-19 LUFS`, picos `< -1.0 dBFS`).

## Entrega y validación
- Confirmación de motor (2D o 3D), activos originales creados desde cero y ausencia de afirmaciones no verificadas.
- Guion auditado en claridad/retención + paquete de variaciones de copy publicitario libre de *AI tells* (`copywriting`).

## Recursos, procedencia y mantenimiento
- **Procedencia:** Skill nativa de `Agencia_Principal`, integrada con `ad-creative`, `copywriting`, `marketing-psychology`, `estilo-cartoon-editorial-3d`, `dinamismo-visual-2d` y `estilo-estudio-3d-pbr`.
- **Mantenimiento:** Regenerar catálogo con `python3 Agencia_Principal/scripts/catalogo_skills.py --generar`.
