# Agencia Principal

Sistema local unificado de trabajo con IA que opera simultáneamente como **Agencia de Marketing Digital (Gestión de Redes y Monetización en YouTube, Instagram, Facebook y TikTok)** y **Productora Audiovisual Determinista (`video-studio-2d/` y `video-studio-3d/`)**, preparado tanto para contenido de divulgación/entretenimiento monetizable como para **producción de comerciales**.

La documentación orienta al modelo; las pruebas verifican controles concretos. La agencia no sustituye al runtime de agentes del IDE ni certifica servicios externos por estar configurados.

---

## Arquitectura Consolidada en Dos Prompts Maestros

Toda la operación de marketing, auditoría de canales, ideación y producción audiovisual se consolida en **exactamente dos Prompts Maestros coordinados** (versión íntegra lista para copiar y pegar en [PROMPTS-MAESTROS.md](PROMPTS-MAESTROS.md) y gobernada por [asistente-principal.md](asistente-principal.md)):

```text
[BASE DE CONOCIMIENTO OBLIGATORIA PREVIA]
  • studio-shared/mis-ideas/
  • studio-shared/mis-ideas/[24 de noviembre de 2026] - ... - Auditoria y formula ganadora Un Dato Mas IG.md
  • Agencia_Principal/contexts/brands/un-dato-mas/ + Agencia_Principal/skills/
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ PROMPT 1 · Estratega, Auditor y PM      │   │ PROMPT 2 · Director Creativo y          │
│ (Agencia de Marketing Digital / Redes)  │   │ Productor Audiovisual 2D/3D             │
│                                         │   │                                         │
│ • Lee mis-ideas + Auditoría 24-Nov-2026 │   │ • Lee mis-ideas + Auditoría 24-Nov-2026 │
│ • Audita 4 redes: Facebook (prioridad), │──▶│ • Pregunta 1 OBLIGATORIA: ¿2D o 3D?     │
│   Instagram, YouTube y TikTok           │   │   (personajes/activos 100% nuevos)      │
│ • Ejecuta skills SEO, Reels, Social,    │   │ • 2D -> video-studio-2d (ref. El Chavo, │
│   Monetización, Psicología y Ads        │   │   Don Ramón/Doraemon y ojos, IP-Safe)   │
│ • Entrega ideas validadas + calendario  │   │ • 3D -> video-studio-3d (ref. anillos   │
│   + ángulos orgánicos y comerciales     │   │   PBR + preguntas de dirección de arte) │
│ • Guarda en studio-shared/mis-ideas/    │   │ • Pregunta 2 y 3: Plataforma, duración  │
│ • NO renderiza video final              │   │   y enfoque (Orgánico vs. Comercial)    │
└─────────────────────────────────────────┘   │ • Guion (>=80/100) -> Audio -> Contact  │
                                              │   Sheet -> Render 1080p + Copy 4 redes  │
                                              └─────────────────────────────────────────┘
```

### Reglas Obligatorias del Sistema
1. **Lectura previa ineludible:** Ningún prompt genera ideas, estrategias ni guiones sin leer antes `studio-shared/mis-ideas/`, la auditoría del 24 de noviembre de 2026 y las skills vigentes en `Agencia_Principal/skills/`.
2. **4 plataformas siempre cubiertas:** YouTube, Instagram, **Facebook** (con énfasis en Programa Unificado de Monetización de Contenido, *Qualified Views* y *Shares*) y TikTok.
3. **Coherencia visual estricta e *IP-Safe*:**
   - **2D (`video-studio-2d/`):** Estándar `estilo-cartoon-editorial-3d` + `dinamismo-visual-2d` consolidado en *El Chavo*, *Don Ramón* (*Doraemon*) y *los ojos*. **Jamás reutilizar personajes con copyright**; crear siempre personajes nuevos desde cero.
   - **3D (`video-studio-3d/`):** Metodología PBR de *los anillos* (`estilo-estudio-3d-pbr` en `@remotion/three`) + preguntas de dirección de arte para cada pieza nueva.
4. **Pregunta 1 obligatoria en producción:** El Prompt 2 jamás redacta guiones ni prompts visuales antes de preguntar si la pieza será **2D o 3D**, su plataforma/duración y si el enfoque es **monetización orgánica** o **comercial**.
5. **Voz oficial por defecto:** ElevenLabs Gateway Multi-Cuenta con Voz ID `SOYHLrjzK2X1ezoPC6cr` (`eleven_flash_v2_5`).

Ver los textos completos listos para copiar y pegar en [PROMPTS-MAESTROS.md](PROMPTS-MAESTROS.md).

---

## Catálogo e Integración de Skills de Marketing, Monetización y Producción

Todas las habilidades están registradas en `.agencia/catalogo-skills.json` y se integran en los dos prompts maestros:

### A. Skills existentes integradas (Marketing, Redes, SEO y Narrativa)
| Skill | Prompt(s) | Rol operativo |
| :--- | :---: | :--- |
| `preproduccion-social-video` | P1 y P2 | Orquesta la arquitectura consolidada de 2 Prompts Maestros y las puertas de lectura/validación. |
| `estrategia-narrativa-ganchos-retencion` | P1 y P2 | Matriz narrativa en español, *Broad Appeal Check*, 7 arquetipos de gancho y CLI `scripts/evaluar_guion.py` (`>= 80/100`). |
| `reels-scripting` | P1 y P2 | Temporización vertical ágil de 30–75 s para alta tasa de finalización. |
| `social` · `content-strategy` · `customer-research` | P1 | Pilares, buscable vs. compartible, *Information-Gain Gate*, minería segura de audiencia y atomización. |
| `viral-short-form-ideas` · `viral-hooks` · `viral-short-form` · `viral-captions-and-ctas` | P1 y P2 | Ideación viral, ganchos de 3 capas (visual + verbal + texto), retención y copy SEO libre de *engagement bait*. |
| `yt-viral` · `yt-script` · `yt-package` | P1 y P2 | Detección de *outliers* (`swipe.py`), 21 fórmulas (`hooks.json` / `hookscore.py`) y título/portada (`title.py`). |
| `niche-research` · `post-scorer` · `voice-builder` | P1 y P2 | Tendencias verificadas de últimos 7 días, puntuación de copy (`>= 75/100`) y aislamiento de voz (`contexts/brands/un-dato-mas/`). |
| `claude-seo` · `geo-ai-optimization` | P1 | SEO técnico, descubribilidad orgánica y posicionamiento en buscadores/IA. |
| `interview-me` · `idea-refine` · `documentary-narrative-engine` | P1 y P2 | Descubrimiento consultivo, lista *"Qué NO haremos"* y narrativa documental para formatos largos. |

### B. Nuevas skills investigadas, auditadas e integradas
| Skill | Procedencia (Licencia) | Prompt(s) | Capacidad nueva que incorpora |
| :--- | :--- | :---: | :--- |
| `facebook-growth-monetizacion` | Nativa (`Agencia_Principal`) | **P1 y P2** | Estrategia dedicada a Facebook bajo el Programa Unificado de Monetización de Contenido (Reels 45–85 s, Video Nativo 3–6 min, *Qualified Views*, *Shares*, originalidad anti-penalización y Grupos). |
| `monetizacion-multiplataforma-canales` | Nativa (`Agencia_Principal` · incluye `scripts/auditar_monetizacion.py`) | **P1** | Auditoría unificada de los 4 canales (YouTube, Instagram, Facebook, TikTok), matriz de requisitos/RPM, atomización 1-a-4 sin penalización y verificación local automática de `studio-shared/mis-ideas/`. |
| `produccion-comercial-anuncios` | Nativa (`Agencia_Principal`) | **P1 y P2** | Pipeline de **comerciales y anuncios 2D/3D** (spots 15s, 30s y 60s), arquitectura Hook-Agitate-Mechanism-Proof-Offer, 3 variantes A/B de gancho, *sound-off captions* y mapeo a `video-studio-2d` vs. `video-studio-3d`. |
| `ad-creative` | `coreyhaines31/marketingskills` (MIT, auditada) | **P1 y P2** | Estrategia creativa publicitaria para Meta/TikTok/YouTube Ads, taxonomía de formatos Meta, guías de anuncios en video motion y ciclos de iteración creativa. |
| `copywriting` | `coreyhaines31/marketingskills` (MIT, auditada) | **P1 y P2** | Frameworks persuasivos de titulares/ofertas/CTAs y lista negra exhaustiva de *AI tells* (`references/ai-tells.md`). |
| `marketing-psychology` | `coreyhaines31/marketingskills` (MIT, auditada) | **P1 y P2** | Más de 70 modelos mentales y sesgos éticos (brecha de curiosidad, aversión a la pérdida, prueba social, *framing*, Zeigarnik) para retención viral y conversión comercial. |

### C. Skills de Producción Audiovisual 2D/3D y Tríada Sonora Pro (Prompt 2)
- **Ruta 2D (`video-studio-2d/`):** `estilo-cartoon-editorial-3d`, `dinamismo-visual-2d`, `animacion-2d-remotion`, `character-animation-engine`, `motion-design`, `ui-ux-pro-max`, `impeccable`, `emilkowalski-skills`, `frontend-design`, `remotion-*`, `locomotion-templates`.
- **Ruta 3D (`video-studio-3d/`):** `estilo-estudio-3d-pbr` (`@remotion/three` + Three.js PBR + `StudioStage3D` HDRI procedural), `remotion-best-practices`, `remotion-render`.
- **Dirección y Tríada Sonora Pro:** `make-awesome-video`, `video-shotcraft`, `earshot`, `real-sound`, `real-sfx` (sobre `studio-shared/assets/sfx` + `uisfx` CC0) y `openverse-audio` (5M+ audios libres CC0/PDM/CC-BY).

---

## Inicio y Verificación de la Agencia

Ejecutar desde esta carpeta (`Agencia_Principal/`):

```bash
python3 scripts/agencia.py doctor
python3 scripts/agencia.py validar
python3 -m unittest discover -s tests -v
python3 scripts/agencia.py verificar
python3 scripts/agencia.py comprobar
python3 skills/monetizacion-multiplataforma-canales/scripts/auditar_monetizacion.py --mis-ideas ../studio-shared/mis-ideas
```

Para actualizar el catálogo tras crear o editar una skill:

```bash
python3 scripts/catalogo_skills.py --generar
python3 scripts/catalogo_skills.py
```

---

## Organización

- [Prompts Maestros (copiar y pegar)](PROMPTS-MAESTROS.md): Prompt 1 (Project Manager / Auditor / Ideación) y Prompt 2 (Director Creativo / Productor 2D y 3D).
- [Asistente principal](asistente-principal.md) y [agentes](agentes/contrato-agente.md): coordinación, roles y entregables ([redes sociales](agentes/redes-sociales.md), [estratega narrativo](agentes/agente-estratega-narrativo.md), [director audiovisual](agentes/agente-director-audiovisual.md), [animador 2D](agentes/agente-animador-2d.md), [animador 3D](agentes/agente-animador-3d.md), [QA Remotion](agentes/agente-qa-remotion.md)).
- [Precedencia de reglas](reglas/precedencia.md), [estándar 2D](reglas/estandar-animacion-2d.md) y [estándar 3D PBR](reglas/estandar-animacion-3d.md).
- [Identidad de marca `un-dato-mas`](contexts/brands/un-dato-mas/voz_y_tono.md): voz, continuidad visual 2D/3D y ejemplos dorados basados en la auditoría del 24/nov/2026.
- [Inicio de proyectos](GUIA-INICIO-PROYECTO.md) y [Stacks](stacks/README.md).
- `contexts/projects/<id>/`: manifiesto, memoria, ADRs y evidencias por ID explícito.
- `.agencia/catalogo-skills.json` y `.agencia/skills-activos/`: catálogo canónico y entradas ligeras generadas.
- [HITL](reglas/human-in-the-loop.md), [verificación local](reglas/verificacion-local.md), [calidad de entregas](reglas/calidad-entregas.md) y [operación de tareas](reglas/operacion-tareas.md).
- [Auditoría integral](contexts/agency/auditoria-integral.md), [operación comercial](contexts/agency/acuerdos.md) y [escenarios operativos](contexts/agency/evaluacion-operativa.md).
- [Piloto de referencia](contexts/projects/_ejemplo_golden/manifiesto.md).

## MCP, Seguridad y Control de Entregas

OpenCode carga el MCP local `agencia` y las entradas activas (`mcp_config.json`, `mcp/mcp_config.json`). No pegar credenciales literales en chats, Markdown ni JSON versionable. Consultar [registro MCP](mcp/registro-mcp.md).

Las búsquedas y resoluciones de skills se realizan mediante:

```bash
python3 scripts/agencia.py skills --consulta facebook
python3 scripts/agencia.py skills --nombre monetizacion-multiplataforma-canales
python3 scripts/agencia.py skills --nombre produccion-comercial-anuncios
python3 scripts/agencia.py registrar-agente nombre-del-agente
```

## Infraestructura Audiovisual Separada (`video-studio-2d` y `video-studio-3d`)

- **`video-studio-2d/`** (FastAPI `:8000`, sin frontend web): Animación 2D dinámica (`estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`), scaffolding con `video-studio-2d/scripts/crear_produccion_2d.py`.
- **`video-studio-3d/`** (FastAPI `:8010`, sin frontend web): Diseño 3D PBR (`estilo-estudio-3d-pbr` con `@remotion/three`), scaffolding con `video-studio-3d/scripts/crear_produccion_3d.py`.
- **`studio-shared/`**: Almacén compartido único para los 414 audios + historial anti-repetición (`assets/`), banco privado de ideas (`mis-ideas/`) y briefs/cuestionarios (`mis-temas/`).
- **Gateway ElevenLabs Multi-Cuenta:** Voz oficial por defecto `SOYHLrjzK2X1ezoPC6cr` (`eleven_flash_v2_5`), auditable con `python3 ../video-studio-2d/scripts/elevenlabs_cli.py estado`.
