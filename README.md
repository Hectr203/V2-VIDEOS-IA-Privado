# 🎬 V2-VIDEOS-IA · Agencia de Marketing Digital y Productora Audiovisual 2D/3D con IA

> **Ecosistema operativo unificado en 2 Prompts Maestros: (1) Agencia de Marketing Digital — auditoría de canales, crecimiento y monetización en YouTube, Instagram, Facebook y TikTok — y (2) Productora Audiovisual Determinista separada en `video-studio-2d/` y `video-studio-3d/`, preparada para divulgación monetizable y comerciales 2D/3D.**

---

## 🌟 ¿Qué es esta herramienta?

**V2-VIDEOS-IA** integra estrategia de marketing digital y producción audiovisual profesional en código bajo una sola arquitectura coherente:

1. **Dos Prompts Maestros Consolidados ([PROMPTS-MAESTROS.md](Agencia_Principal/PROMPTS-MAESTROS.md)):**
   - **Prompt 1 · Project Manager, Auditor y Estratega de Contenido:** Lee obligatoriamente `studio-shared/mis-ideas/` y la auditoría del 24/nov/2026 (`Auditoria y formula ganadora Un Dato Mas IG.md`), audita tus 4 plataformas (**Facebook** con énfasis prioritario, **Instagram**, **YouTube** y **TikTok**) y entrega ideas validadas, calendario y ángulos monetizables/comerciales sin renderizar video.
   - **Prompt 2 · Director Creativo y Productor Audiovisual 2D/3D:** Parte de una idea definida, aplica un **protocolo consultivo obligatorio empezando siempre por elegir 2D o 3D** (creando personajes y activos 100 % originales *IP-Safe*), aplica automáticamente la continuidad visual correspondiente, audita el guion (`evaluar_guion.py >= 80/100`) y produce el video final en el estudio aislado correspondiente.
2. **Estudios Físicamente Separados (`video-studio-2d/` vs. `video-studio-3d/`):**
   - **Estudio 2D (`video-studio-2d/`, API `:8000`):** Línea visual consolidada en *El Chavo*, *Don Ramón* (*Doraemon*) y *los ojos* (`estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`, tinta `#0b0d10` `4.4px`, IK `solveIK2D`, micro-cortes cada `1.5–2.5 s`, HUD diegético, cero estética PowerPoint).
   - **Estudio 3D PBR (`video-studio-3d/`, API `:8010`):** Metodología física PBR del proyecto de *los anillos* (`estilo-estudio-3d-pbr` con `@remotion/three`, Three.js y `StudioStage3D` HDRI procedural), ideal para ingeniería, micro-ciencia y comerciales 3D de producto.
3. **Orquestación de Agentes y 172 Habilidades Canónicas:** Incluye skills dedicadas a crecimiento/monetización en Facebook (`facebook-growth-monetizacion`), auditoría de 4 plataformas (`monetizacion-multiplataforma-canales`), producción de comerciales (`produccion-comercial-anuncios`, `ad-creative`, `copywriting`, `marketing-psychology`), preproducción viral, Remotion, Motion Design y la **Tríada de Diseño Sonoro Pro (`earshot` + `real-sound` + `real-sfx` + `openverse-audio`)**.
4. **Activos Compartidos y Voz Oficial:** Biblioteca unificada en `studio-shared/` (414 audios + historial anti-repetición, `mis-ideas/`, `mis-temas/` y `brand-private/`) y Gateway ElevenLabs Multi-Cuenta con voz oficial por defecto **`SOYHLrjzK2X1ezoPC6cr`** (`eleven_flash_v2_5`).

---

## 🎯 Flujo Unificado (2 Prompts Maestros)

```text
[BASE OBLIGATORIA: studio-shared/mis-ideas + Auditoría 24-Nov-2026 + Agencia_Principal/skills]
                                        │
        ┌───────────────────────────────┴───────────────────────────────┐
        ▼                                                               ▼
┌───────────────────────────────────────────┐   ┌───────────────────────────────────────────┐
│ PROMPT 1 · Project Manager y Estratega    │   │ PROMPT 2 · Director Creativo y Productor  │
│ (Agencia de Marketing / 4 Plataformas)    │   │ (Ejecución de Video 2D o 3D)              │
│                                           │   │                                           │
│ • Audita Facebook (foco), IG, YT y TikTok │──▶│ • Pregunta 1 OBLIGATORIA: ¿2D o 3D?       │
│ • Ideas con ganchos 3 capas y retención   │   │   (activos 100% nuevos, IP-Safe)          │
│ • Estrategia monetización + comerciales   │   │ • 2D -> estilo El Chavo/Don Ramón/ojos    │
│ • Guarda en studio-shared/mis-ideas/      │   │ • 3D -> flujo anillos PBR + arte a medida │
│ • NO renderiza video final                │   │ • Pregunta 2 y 3: Plataforma, duración y  │
└───────────────────────────────────────────┘   │   enfoque (Orgánico vs. Comercial)        │
                                                │ • Guion >=80/100 -> Audio -> Contact      │
                                                │   Sheet -> Render 1080p + Copy 4 redes    │
                                                └───────────────────────────────────────────┘
```

Los **dos prompts completos listos para copiar y pegar** viven en **[Agencia_Principal/PROMPTS-MAESTROS.md](Agencia_Principal/PROMPTS-MAESTROS.md)** y se coordinan desde **[Agencia_Principal/asistente-principal.md](Agencia_Principal/asistente-principal.md)**.

---

## 🚀 Cómo Usar Esta Herramienta

### Método 1: Operación Asistida por IA (Recomendado — 2 Prompts Maestros)
1. **Para auditar tus 4 canales, descubrir temas o planificar calendario y monetización:** copia y pega el **Prompt 1** de [Agencia_Principal/PROMPTS-MAESTROS.md](Agencia_Principal/PROMPTS-MAESTROS.md).
2. **Cuando ya tengas una idea definida (divulgación o comercial) para guionizar y producir en 2D o 3D:** copia y pega el **Prompt 2** de [Agencia_Principal/PROMPTS-MAESTROS.md](Agencia_Principal/PROMPTS-MAESTROS.md). El asistente te guiará primero preguntando **2D vs. 3D**, dirección visual, plataforma, duración y enfoque antes de escribir o renderizar.

### Método 2: API Local Separada (`video-studio-2d` y `video-studio-3d`)
Los entornos 2D y 3D operan completamente separados sin interfaz web frontend (enfoque 100 % agente + CLI + Remotion Studio + API FastAPI):

```bash
# Estudio 2D (Cartoon Editorial IK + Motor de Dinamismo Visual) -> API :8000
cd video-studio-2d && ./start.sh

# Estudio 3D (Three.js + @remotion/three PBR Studio Engine)     -> API :8010
cd video-studio-3d && ./start.sh
```

* 🎨 **Video Studio 2D API**: `http://localhost:8000/docs`
* 💎 **Video Studio 3D (PBR) API**: `http://localhost:8010/docs`
* 🎙️ **Voz Oficial por Defecto en ElevenLabs**: `SOYHLrjzK2X1ezoPC6cr` (`ELEVENLABS_DEFAULT_VOICE_ID` en el Gateway Multi-Cuenta).

### Método 3: Flujo por Comandos (CLI)

```bash
# 0. Auditoría local de línea base multiplataforma (mis-ideas + 4 redes)
python3 Agencia_Principal/skills/monetizacion-multiplataforma-canales/scripts/auditar_monetizacion.py \
  --mis-ideas studio-shared/mis-ideas

# 1A. Scaffolding 2D Dinámico
python3 video-studio-2d/scripts/crear_produccion_2d.py \
  --id "mi-nuevo-video-2d" \
  --titulo "Título del Video 2D" \
  --tema "Descripción conceptual y dinamismo visual"

# 1B. Scaffolding 3D PBR
python3 video-studio-3d/scripts/crear_produccion_3d.py \
  --id "mi-nuevo-video-3d" \
  --titulo "Título del Video 3D" \
  --tema "Objeto o proceso físico 3D PBR"

# 2. Auditar guion antes de sintetizar voz (umbral >= 80/100)
python3 Agencia_Principal/skills/estrategia-narrativa-ganchos-retencion/scripts/evaluar_guion.py \
  --storyboard "video-studio-2d/projects/<DD de mes de YYYY>/mi-nuevo-video-2d/storyboard.json"

# 3. Locuciones, timeline y música anti-repetición
python3 video-studio-2d/projects/<DD de mes de YYYY>/mi-nuevo-video-2d/prepare.py

# 4. Contact Sheet Gate obligatorio + render final 1080p
node video-studio-2d/projects/<DD de mes de YYYY>/mi-nuevo-video-2d/render.mjs --stills
node video-studio-2d/projects/<DD de mes de YYYY>/mi-nuevo-video-2d/render.mjs
```

---

## 🎭 Equipo de Agentes Especializados

| Agente | Ficha de Rol | Prompt | Especialidad y Responsabilidad |
| :--- | :--- | :---: | :--- |
| **Asistente Principal** | [asistente-principal.md](Agencia_Principal/asistente-principal.md) | P1 y P2 | Orquestador central; ejecuta lectura previa obligatoria, enruta P1/P2 y garantiza el protocolo consultivo. |
| **Agente de Redes Sociales** | [redes-sociales.md](Agencia_Principal/agentes/redes-sociales.md) | **P1** | Project Manager y SMM: auditoría de Facebook (foco), IG, YT y TikTok, monetización, SEO, calendario y pauta/comerciales. |
| **Agente Estratega Narrativo** | [agente-estratega-narrativo.md](Agencia_Principal/agentes/agente-estratega-narrativo.md) | P1 y P2 | *Outliers* (`swipe.py`), psicología de retención, ganchos 3 capas / A/B comerciales y auditoría (`evaluar_guion.py >= 80/100`). |
| **Agente Director Audiovisual** | [agente-director-audiovisual.md](Agencia_Principal/agentes/agente-director-audiovisual.md) | **P2** | Puesta en escena 2D/3D, *shot cards*, *beat sync*, comerciales 15s/30s/60s, curaduría anti-repetición y tríada sonora. |
| **Agente Animador 2D** | [agente-animador-2d.md](Agencia_Principal/agentes/agente-animador-2d.md) | **P2 (2D)** | `video-studio-2d/`: `estilo-cartoon-editorial-3d` + `dinamismo-visual-2d`, personajes originales *IP-Safe* con IK. |
| **Agente Animación Viva** | [agente-animacion-viva.md](Agencia_Principal/agentes/agente-animacion-viva.md) | **P2 (2D)** | Anticipación física, *squash & stretch*, expresividad orgánica y erradicación de rigidez de cartón. |
| **Agente Animador 3D** | [agente-animador-3d.md](Agencia_Principal/agentes/agente-animador-3d.md) | **P2 (3D)** | `video-studio-3d/`: `estilo-estudio-3d-pbr` (`@remotion/three`, `StudioStage3D`, cortes en micras, átomos y producto comercial). |
| **Agente QA Remotion** | [agente-qa-remotion.md](Agencia_Principal/agentes/agente-qa-remotion.md) | **P2** | Puerta de calidad `contact-sheet.jpg`, compilación TypeScript y auditoría acústica EBU R128 (`-18` a `-19 LUFS`). |

---

## 🏗️ Estructura del Repositorio

```text
.
├── README.md                           # Manual general del ecosistema dual (Marketing + Productora 2D/3D)
├── .agents/skills/                     # Habilidades descubiertas automáticamente por el IDE
├── docs/
│   └── GUIA_COMPLETA_PRODUCCION_2D.md  # Manual técnico exhaustivo de producción 2D
├── Agencia_Principal/                  # Agencia IA (28 agentes, 172 skills canónicas)
│   ├── PROMPTS-MAESTROS.md             # Los 2 Prompts Maestros listos para copiar y pegar
│   ├── README.md                       # Documentación operativa y catálogo de skills
│   ├── asistente-principal.md          # Coordinador central y protocolo consultivo
│   ├── agentes/                        # Fichas de agentes especializados
│   ├── contexts/brands/un-dato-mas/    # Identidad oficial de marca basada en auditoría 24-Nov-2026
│   ├── reglas/                         # Estándares 2D/3D, precedencia y rutas-agentes.json
│   ├── skills/                         # Fuentes canónicas (marketing, Facebook, monetización, comerciales, Remotion, audio)
│   └── scripts/                        # CLI `agencia.py`, validación y verificación local
├── studio-shared/                      # Activos compartidos sin duplicidad
│   ├── assets/                         # 414 audios, historial anti-repetición y brand-private/
│   ├── mis-ideas/                      # Auditorías (incl. 24-Nov-2026) y banco privado de ideas (ignorado por Git)
│   └── mis-temas/                      # Briefs validados y cuestionarios privados (ignorado por Git)
├── video-studio-2d/                    # Motor dedicado exclusivamente a Animación 2D Dinámica (API :8000)
│   ├── projects/                       # Producciones finales 2D por fecha (ref. Chavo, Don Ramón, ojos)
│   ├── proyectos-test/                 # Prototipos y experimentos 2D
│   ├── shared-art/                     # Elenco `cartoon/` IK + motor `dynamism/`
│   ├── scripts/                        # `crear_produccion_2d.py`, `buscar_audio.py`, `elevenlabs_cli.py`
│   ├── backend/                        # API FastAPI + Gateway ElevenLabs (`SOYHLrjzK2X1ezoPC6cr`)
│   └── remotion/                       # Motor Remotion 4.x 2D
└── video-studio-3d/                    # Motor dedicado exclusivamente a Diseño 3D PBR (API :8010)
    ├── projects/                       # Producciones finales 3D por fecha
    ├── proyectos-test/                 # Prototipos 3D PBR (ref. demo-estudio-pbr-3d / anillos)
    ├── shared-art-3d/                  # `StudioStage3D`, `PBR_PRESETS`, primitivas 3D y overlays luxury
    ├── scripts/                        # `crear_produccion_3d.py`, `buscar_audio.py`, `elevenlabs_cli.py`
    ├── backend/                        # API FastAPI independiente + Gateway ElevenLabs
    └── remotion/                       # Motor Remotion 4.x + Three.js + @remotion/three (`--gl=angle`)
```

---

## 🔧 Comandos de Mantenimiento y Verificación

```bash
# 1. Auditoría local de línea base multiplataforma (mis-ideas + 4 redes)
python3 Agencia_Principal/skills/monetizacion-multiplataforma-canales/scripts/auditar_monetizacion.py --mis-ideas studio-shared/mis-ideas

# 2. Búsqueda de audios temáticos anti-repetición
python3 video-studio-2d/scripts/buscar_audio.py --historia "curiosidades científicas sobre perros" --evitar-recientes

# 3. Evaluación rápida de un gancho o guion
python3 Agencia_Principal/skills/estrategia-narrativa-ganchos-retencion/scripts/evaluar_guion.py \
  --tema "Perros" \
  --gancho "El abrazo que le das a tu perro cada mañana podría estar poniéndolo en alerta."

# 4. Estado del Gateway Multi-Cuenta ElevenLabs (voz por defecto SOYHLrjzK2X1ezoPC6cr)
python3 video-studio-2d/scripts/elevenlabs_cli.py estado

# 5. Validación integral, catálogo y pruebas con evidencia local
cd Agencia_Principal && python3 scripts/catalogo_skills.py --generar && python3 scripts/agencia.py verificar && python3 scripts/agencia.py comprobar
```
