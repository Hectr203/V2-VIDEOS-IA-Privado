# Agencia Principal

Sistema local unificado de trabajo con IA que opera simultáneamente como **Agencia de Marketing Digital (Gestión de Redes y Monetización en YouTube, Instagram, Facebook y TikTok)** y **Productora Audiovisual Determinista (`video-studio-2d/` y `video-studio-3d/`)**, preparado tanto para contenido de divulgación/entretenimiento monetizable como para **producción de comerciales**.

La documentación orienta al modelo; las pruebas verifican controles concretos. La agencia no sustituye al runtime de agentes del IDE ni certifica servicios externos por estar configurados.

---

## Tres Modos de Trabajo (Prompts Maestros)

Los **3 Prompts Maestros** y el **Banco de Preguntas** viven **solo** en el [README principal](../README.md) (fuente única). Aquí solo se resume el contrato:

| Modo | Para qué | Preguntas (README) | Aprobación |
| :--- | :--- | :--- | :--- |
| **1 · Ideas** | Ideas, auditoría de canales, calendario. No produce video. | `I1`–`I3` | Usuario elige la idea |
| **2 · Producción Guiada** | Video con puertas: Brief → Guion → Imagen → Entrega. | `A1`–`A6`, `B`, `C1`–`C2` | Usuario en cada puerta |
| **3 · Piloto Automático** | Video completo; la IA investiga, se autoevalúa y entrega. | `A1`–`A4` | La IA (guion `>= 80/100` + QA `PASS`) |

Contrato operativo del agente: [asistente-principal.md](asistente-principal.md). Índice: [PROMPTS-MAESTROS.md](PROMPTS-MAESTROS.md).

### Reglas Obligatorias del Sistema
1. **Lectura previa ineludible:** `studio-shared/mis-ideas/`, la auditoría del 24/nov/2026, `contexts/brands/un-dato-mas/` y las skills vigentes, en los 3 modos.
2. **4 plataformas siempre cubiertas** (YouTube, Instagram, **Facebook** con prioridad, TikTok), salvo que el usuario las acote.
3. **Coherencia visual e *IP-Safe*:** 2D = `estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`; 3D = `estilo-estudio-3d-pbr`. Jamás personajes con copyright.
4. **Preguntas simples:** una decisión por pregunta, ≤4 opciones, selección múltiple solo en estilo (`A4`). Funciona en cualquier IDE o chat.
5. **Voz:** ElevenLabs (modelo y voz elegibles; por defecto `eleven_flash_v2_5` + `SOYHLrjzK2X1ezoPC6cr`), Applio (voz ya entrenada) o Edge-TTS.
6. **Miniatura obligatoria y única por video/proyecto** en cada formato elegido (`miniatura-vertical.png` / `miniatura-horizontal.png`): arte personalizado con el protagonista, objeto o escena clave del tema; no se entrega el personaje base/genérico ni una portada reutilizada que no identifique ese video.

---

## Catálogo e Integración de Skills de Marketing, Monetización y Producción

Todas las habilidades están registradas en `.agencia/catalogo-skills.json` y se integran en los dos prompts maestros:

### A. Skills existentes integradas (Marketing, Redes, SEO y Narrativa)
| Skill | Prompt(s) | Rol operativo |
| :--- | :---: | :--- |
| `preproduccion-social-video` | 1·2·3 | Orquesta la arquitectura consolidada de 3 Prompts Maestros y las puertas de lectura/validación. |
| `estrategia-narrativa-ganchos-retencion` | 1·2·3 | Matriz narrativa en español, *Broad Appeal Check*, 7 arquetipos de gancho y CLI `scripts/evaluar_guion.py` (`>= 80/100`). |
| `reels-scripting` | 1·2·3 | Temporización vertical ágil de 30–75 s para alta tasa de finalización. |
| `social` · `content-strategy` · `customer-research` | 1 | Pilares, buscable vs. compartible, *Information-Gain Gate*, minería segura de audiencia y atomización. |
| `viral-short-form-ideas` · `viral-hooks` · `viral-short-form` · `viral-captions-and-ctas` | 1·2·3 | Ideación viral, ganchos de 3 capas (visual + verbal + texto), retención y copy SEO libre de *engagement bait*. |
| `yt-viral` · `yt-script` · `yt-package` | 1·2·3 | Detección de *outliers* (`swipe.py`), 21 fórmulas (`hooks.json` / `hookscore.py`) y título/portada (`title.py`). |
| `niche-research` · `post-scorer` · `voice-builder` | 1·2·3 | Tendencias verificadas de últimos 7 días, puntuación de copy (`>= 75/100`) y aislamiento de voz (`contexts/brands/un-dato-mas/`). |
| `claude-seo` · `geo-ai-optimization` | 1 | SEO técnico, descubribilidad orgánica y posicionamiento en buscadores/IA. |
| `interview-me` · `idea-refine` · `documentary-narrative-engine` | 1·2·3 | Descubrimiento consultivo, lista *"Qué NO haremos"* y narrativa documental para formatos largos. |

### B. Nuevas skills investigadas, auditadas e integradas
| Skill | Procedencia (Licencia) | Prompt(s) | Capacidad nueva que incorpora |
| :--- | :--- | :---: | :--- |
| `facebook-growth-monetizacion` | Nativa (`Agencia_Principal`) | **1·2·3** | Estrategia dedicada a Facebook bajo el Programa Unificado de Monetización de Contenido (Reels 45–85 s, Video Nativo 3–6 min, *Qualified Views*, *Shares*, originalidad anti-penalización y Grupos). |
| `monetizacion-multiplataforma-canales` | Nativa (`Agencia_Principal` · incluye `scripts/auditar_monetizacion.py`) | **1** | Auditoría unificada de los 4 canales (YouTube, Instagram, Facebook, TikTok), matriz de requisitos/RPM, atomización 1-a-4 sin penalización y verificación local automática de `studio-shared/mis-ideas/`. |
| `produccion-comercial-anuncios` | Nativa (`Agencia_Principal`) | **1·2·3** | Pipeline de **comerciales y anuncios 2D/3D** (spots 15s, 30s y 60s), arquitectura Hook-Agitate-Mechanism-Proof-Offer, 3 variantes A/B de gancho, *sound-off captions* y mapeo a `video-studio-2d` vs. `video-studio-3d`. |
| `ad-creative` | `coreyhaines31/marketingskills` (MIT, auditada) | **1·2·3** | Estrategia creativa publicitaria para Meta/TikTok/YouTube Ads, taxonomía de formatos Meta, guías de anuncios en video motion y ciclos de iteración creativa. |
| `copywriting` | `coreyhaines31/marketingskills` (MIT, auditada) | **1·2·3** | Frameworks persuasivos de titulares/ofertas/CTAs y lista negra exhaustiva de *AI tells* (`references/ai-tells.md`). |
| `marketing-psychology` | `coreyhaines31/marketingskills` (MIT, auditada) | **1·2·3** | Más de 70 modelos mentales y sesgos éticos (brecha de curiosidad, aversión a la pérdida, prueba social, *framing*, Zeigarnik) para retención viral y conversión comercial. |

### C. Skills de Producción Audiovisual 2D/3D y Tríada Sonora Pro (Modos 2 y 3)
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

- [Prompts Maestros](PROMPTS-MAESTROS.md) (índice) y [README principal](../README.md) (los 3 prompts + banco de preguntas).
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
