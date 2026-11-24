#!/usr/bin/env python3
"""
Generador y scaffolding estandarizado de proyectos de video 3D PBR autónomos en Remotion (@remotion/three + Three.js).

Crea una carpeta única y auto-contenida por proyecto bajo:
    video-studio-3d/projects/<DD de mes de YYYY>/<slug>/

Uso:
    python3 video-studio-3d/scripts/crear_produccion_3d.py --id ciencia-oro-3d --titulo "Por qué el oro verdadero no se oxida"
"""

import argparse
import datetime
import json
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
STUDIO = HERE.parent
PROJECTS = STUDIO / "projects"
REMOTION = STUDIO / "remotion"

MESES_ES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]


def formatear_fecha_carpeta(dt: datetime.datetime | None = None) -> str:
    if dt is None:
        dt = datetime.datetime.now()
    return f"{dt.day} de {MESES_ES[dt.month - 1]} de {dt.year}"


def validar_id(identificador: str) -> str:
    if not re.match(r"^[a-z0-9]+(?:-[a-z0-9]+)*$", identificador):
        raise ValueError(f"ID inválido: '{identificador}'. Use minúsculas y guiones (ej. 'ciencia-oro-3d').")
    return identificador


def generar_storyboard_plantilla_3d(titulo: str, tema: str) -> dict:
    return {
        "title": titulo,
        "voice_provider": "elevenlabs",
        "voice_id": "SOYHLrjzK2X1ezoPC6cr",
        "voice": "es-MX-JorgeNeural",
        "rate": "+12%",
        "scenes": [
            {
                "id": "01_hook_contraste",
                "chapter": "CONTRASTE INVISIBLE",
                "mode3d": "dual_rings",
                "text": "¿Por qué dos piezas idénticas por fuera envejecen tan distinto? El secreto está escondido a nivel microscópico.",
                "minSeconds": 5.0
            },
            {
                "id": "02_corte_capas",
                "chapter": "LA BARRERA OCULTA",
                "mode3d": "layer_stack",
                "text": "Debajo del acabado brillante existe una pared metálica que bloquea la migración de átomos del interior.",
                "minSeconds": 5.0
            },
            {
                "id": "03_deposito_atomico",
                "chapter": "ÁTOMO A ÁTOMO",
                "mode3d": "atomic_lattice",
                "text": "Con electricidad controlada, los átomos se enlazan metal contra metal formando un escudo que dura años.",
                "minSeconds": 5.0
            }
        ],
        "editorialNotes": f"Producción 3D PBR sobre: {tema}. Iluminación física de estudio, materiales metálicos/cristal y cámaras orbitales en Three.js."
    }


def crear_proyecto_3d(prod_id: str, titulo: str, tema: str = "", fecha: str = ""):
    validar_id(prod_id)
    carpeta_fecha = fecha.strip() or formatear_fecha_carpeta()
    fecha_dir = PROJECTS / carpeta_fecha
    fecha_dir.mkdir(parents=True, exist_ok=True)
    proj_dir = fecha_dir / prod_id
    src_dir = proj_dir / "src"
    public_dir = proj_dir / "public"
    renders_dir = proj_dir / "renders"
    stills_dir = renders_dir / "stills"

    if proj_dir.exists():
        print(f"Error: El proyecto 3D '{prod_id}' ya existe en {proj_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"Creando proyecto 3D PBR '{prod_id}' en {proj_dir} (Fecha: {carpeta_fecha})...")
    proj_dir.mkdir(parents=True, exist_ok=True)
    src_dir.mkdir(parents=True, exist_ok=True)
    public_dir.mkdir(parents=True, exist_ok=True)
    renders_dir.mkdir(parents=True, exist_ok=True)
    stills_dir.mkdir(parents=True, exist_ok=True)

    fuente_candidatos = [
        STUDIO.parent / "video-studio-2d/remotion/public/UbuntuSans.ttf",
        Path("/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ] + list((STUDIO.parent / "video-studio-2d/projects").glob("*/*/public/UbuntuSans.ttf"))
    for c in fuente_candidatos:
        if c.exists():
            shutil.copy2(c, public_dir / "UbuntuSans.ttf")
            break

    project_metadata = {
        "id": prod_id,
        "title": titulo,
        "description": tema or titulo,
        "created_at": datetime.datetime.now().isoformat(),
        "type": "3d-pbr-animation",
        "fps": 30,
        "resolution": {"width": 1080, "height": 1920},
        "author": "VideoStudio 3D Agent",
        "version": "1.0.0"
    }
    (proj_dir / "project.json").write_text(json.dumps(project_metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (proj_dir / "tsconfig.json").write_text('{\n  "extends": "../../../tsconfig.json",\n  "include": ["src/**/*"]\n}\n', encoding="utf-8")

    storyboard = generar_storyboard_plantilla_3d(titulo, tema or titulo)
    (proj_dir / "storyboard.json").write_text(json.dumps(storyboard, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    prepare_script = f'''"""Preparación de audio TTS (ElevenLabs / Edge-TTS) y timeline 3D para {prod_id}."""
import asyncio
import hashlib
import json
import math
import subprocess
from pathlib import Path
import edge_tts
import numpy as np

HERE = Path(__file__).resolve().parent
def find_studio(p: Path) -> Path:
    curr = p
    while curr != curr.parent:
        if (curr / "remotion/package.json").exists():
            return curr
        curr = curr.parent
    return p.parents[2]

STUDIO = find_studio(HERE)
PUBLIC = HERE / "public"
SOURCE = HERE / "src"
FPS = 30

def get_duration(path):
    return float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "csv=p=0", str(path)], text=True))

async def generate_narration(scene, config, sem):
    target = PUBLIC / f"{{scene['id']}}.mp3"
    cache_dir = HERE / "audio_cache"
    cache_dir.mkdir(exist_ok=True)
    cache = cache_dir / f"{{scene['id']}}.json"
    provider = config.get('voice_provider', 'elevenlabs')
    voice_cfg = config.get('voice_id') or config.get('voice', 'SOYHLrjzK2X1ezoPC6cr')
    key = hashlib.sha256(json.dumps([scene['text'], provider, voice_cfg, config.get('rate', '+0%')]).encode()).hexdigest()
    if target.exists() and cache.exists():
        data = json.loads(cache.read_text(encoding="utf-8"))
        if data.get('key') == key and target.stat().st_size > 1000:
            return data
    async with sem:
        partial = target.with_suffix('.partial.mp3')
        words = []
        if provider == 'elevenlabs':
            import sys as _sys
            backend_dir = str(STUDIO / "backend")
            if backend_dir not in _sys.path:
                _sys.path.insert(0, backend_dir)
            from services.elevenlabs_gateway import get_elevenlabs_gateway
            gw = get_elevenlabs_gateway()
            if gw.has_keys():
                vid = config.get('voice_id') or gw.default_voice_id
                mid = config.get('elevenlabs_model') or gw.default_model
                res = await asyncio.to_thread(gw.synthesize_with_failover, scene['text'], vid, mid)
                partial.write_bytes(res['audio_bytes'])
                align = res.get('alignment') or {{}}
                chars = align.get('characters') or []
                starts = align.get('character_start_times_seconds') or []
                ends = align.get('character_end_times_seconds') or []
                cur_w, w_start, prev_e = [], None, 0.0
                for ch, s, e in zip(chars, starts, ends):
                    if ch.isspace():
                        if cur_w:
                            words.append({{'word': ''.join(cur_w), 'start': round(w_start or 0.0, 3), 'end': round(prev_e, 3)}})
                            cur_w, w_start = [], None
                    else:
                        if w_start is None:
                            w_start = s
                        cur_w.append(ch)
                        prev_e = e
                if cur_w:
                    words.append({{'word': ''.join(cur_w), 'start': round(w_start or 0.0, 3), 'end': round(prev_e, 3)}})
                seconds = get_duration(partial)
                partial.replace(target)
                data = {{'key': key, 'duration': seconds, 'words': words, 'account_used': res['account_used']}}
                cache.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
                return data
        # Fallback Edge-TTS cuando no hay claves o se pide edge-tts
        base_voice = config.get('voice', 'es-ES-AlvaroNeural')
        if not base_voice.startswith('es-'):
            base_voice = 'es-ES-AlvaroNeural'
        tts = edge_tts.Communicate(scene['text'], base_voice, rate=config.get('rate', '+10%'), boundary='WordBoundary')
        with partial.open('wb') as stream:
            async for chunk in tts.stream():
                if chunk.get('type') == 'audio' and chunk.get('data'):
                    stream.write(chunk['data'])
                elif chunk.get('type') == 'WordBoundary':
                    words.append({{
                        'word': chunk.get('text') or '',
                        'start': float(chunk.get('offset') or 0) / 1e7,
                        'end': (float(chunk.get('offset') or 0) + float(chunk.get('duration') or 0)) / 1e7,
                    }})
        seconds = get_duration(partial)
        partial.replace(target)
        data = {{'key': key, 'duration': seconds, 'words': words}}
        cache.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        return data

def generate_ambient_pad(total_seconds):
    sr = 32000
    count = math.ceil(total_seconds * sr)
    t = np.arange(count) / sr
    sig = 0.018 * np.sin(2 * np.pi * 110 * t) + 0.012 * np.sin(2 * np.pi * 164.81 * t)
    pcm = np.column_stack([sig, sig])
    pcm16 = (pcm * 32767).astype(np.int16)
    import wave
    with wave.open(str(PUBLIC / "score.wav"), 'wb') as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(sr)
        wav.writeframes(pcm16.tobytes())

async def main():
    storyboard = json.loads((HERE / "storyboard.json").read_text(encoding="utf-8"))
    sem = asyncio.Semaphore(2)
    narrations = await asyncio.gather(*(generate_narration(sc, storyboard, sem) for sc in storyboard["scenes"]))
    timeline_scenes = []
    current_frame = 0
    for sc, nar in zip(storyboard["scenes"], narrations):
        dur = max(float(sc.get("minSeconds", 2.5)), float(nar.get("duration", 0.0)) + 0.25)
        frames = math.ceil(dur * FPS)
        timeline_scenes.append({{
            **sc,
            "start": current_frame,
            "frames": frames,
            "words": nar.get("words", []),
            "audio": f"{{sc['id']}}.mp3",
        }})
        current_frame += frames
    tl = {{"title": storyboard["title"], "fps": FPS, "durationInFrames": current_frame, "scenes": timeline_scenes}}
    txt = json.dumps(tl, ensure_ascii=False, indent=2) + "\\n"
    (HERE / "timeline.json").write_text(txt, encoding="utf-8")
    (SOURCE / "timeline.json").write_text(txt, encoding="utf-8")
    generate_ambient_pad(current_frame / FPS)
    print(f"Timeline 3D listo: {{current_frame}} frames ({{current_frame / FPS:.2f}}s)")

if __name__ == "__main__":
    asyncio.run(main())
'''
    (proj_dir / "prepare.py").write_text(prepare_script, encoding="utf-8")

    render_script = f'''import {{createRequire}} from 'node:module';
import {{fileURLToPath}} from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import {{execFileSync, execSync}} from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
function findStudio(dir) {{
  let curr = dir;
  while (curr !== path.dirname(curr)) {{
    if (fsSync.existsSync(path.join(curr, 'remotion/package.json'))) return curr;
    curr = path.dirname(curr);
  }}
  return path.resolve(dir, '../../..');
}}
const studio = findStudio(here);
const remotion = path.join(studio, 'remotion');
const require = createRequire(path.join(remotion, 'package.json'));
const {{bundle}} = require('@remotion/bundler');
const {{selectComposition, renderMedia, renderStill}} = require('@remotion/renderer');

const timeline = JSON.parse(await fs.readFile(path.join(here, 'timeline.json'), 'utf8'));
const renders = path.join(here, 'renders');
const stillsDir = path.join(renders, 'stills');
await fs.mkdir(stillsDir, {{recursive: true}});

const stills = process.argv.includes('--stills');
const draft = process.argv.includes('--draft');
const horizontal = process.argv.includes('--horizontal') || process.argv.includes('--aspect=horizontal');
const bothAspects = process.argv.includes('--both') || process.argv.includes('--aspect=both');
const baseId = '{prod_id}';

console.log(`[Proyecto 3D: ${{baseId}}] Empaquetando escena Three.js PBR...`);
const serveUrl = await bundle({{
  entryPoint: path.join(here, 'src/index.tsx'),
  publicDir: path.join(here, 'public'),
  webpackOverride: (config) => {{
    config.resolve.modules = [path.join(remotion, 'node_modules'), 'node_modules'];
    return config;
  }},
}});

const chromiumOptions = {{gl: 'angle'}};

if (stills) {{
  const composition = await selectComposition({{serveUrl, id: baseId, chromiumOptions}});
  for (const scene of timeline.scenes) {{
    const frame = scene.start + Math.floor(scene.frames * 0.6);
    const stillPath = path.join(stillsDir, `${{scene.id}}.png`);
    await renderStill({{serveUrl, composition, output: stillPath, frame, imageFormat: 'png', scale: 2/3, chromiumOptions}});
    console.log(`  ✓ STILL 3D ${{scene.id}} @${{(frame / 30).toFixed(2)}}s`);
  }}
  const contactSheet = path.join(renders, 'contact-sheet.jpg');
  try {{
    execSync(`ffmpeg -v error -y -pattern_type glob -i '${{stillsDir}}/*.png' -vf 'scale=240:-1,tile=3x3:padding=6:margin=6' -frames:v 1 '${{contactSheet}}'`);
    console.log(`[OK] Contact sheet 3D generado en: ${{contactSheet}}`);
  }} catch (err) {{
    console.warn(`Aviso contact-sheet: ${{err.message}}`);
  }}
}} else {{
  const targets = bothAspects
    ? [
        {{id: baseId, name: draft ? 'preview-720p.mp4' : 'master-1080p.mp4', label: '9:16 Vertical'}},
        {{id: `${{baseId}}-16x9`, name: draft ? 'preview-16x9-720p.mp4' : 'master-16x9-1080p.mp4', label: '16:9 Horizontal'}},
      ]
    : horizontal
    ? [{{id: `${{baseId}}-16x9`, name: draft ? 'preview-16x9-720p.mp4' : 'master-16x9-1080p.mp4', label: '16:9 Horizontal'}}]
    : [{{id: baseId, name: draft ? 'preview-720p.mp4' : 'master-1080p.mp4', label: '9:16 Vertical'}}];

  for (const target of targets) {{
    const composition = await selectComposition({{serveUrl, id: target.id, chromiumOptions}});
    const final = path.join(renders, target.name);
    const partial = path.join(renders, `partial-${{target.name}}`);
    await renderMedia({{
      serveUrl, composition, outputLocation: partial, codec: 'h264', crf: draft ? 22 : 17,
      pixelFormat: 'yuv420p', audioCodec: 'aac', audioBitrate: '192k',
      scale: draft ? 2/3 : 1, concurrency: 2, chromiumOptions,
    }});
    execFileSync('ffprobe', ['-v', 'error', '-show_format', partial]);
    await fs.rename(partial, final);
    console.log(`[ÉXITO 3D] Render guardado en: ${{final}}`);
  }}
}}
'''
    (proj_dir / "render.mjs").write_text(render_script, encoding="utf-8")

    component_name = "".join(p.capitalize() for p in prod_id.split("-")) + "Film3D"
    index_tsx = f'''import React from 'react';
import {{Composition, registerRoot}} from 'remotion';
import {{{component_name}, timeline}} from './Film';

export const ProjectRoot3D: React.FC = () => (
  <>
    <Composition id="{prod_id}" component={{{component_name}}} durationInFrames={{timeline.durationInFrames}} fps={{30}} width={{1080}} height={{1920}} defaultProps={{{{aspectRatio: '9:16' as const}}}} />
    <Composition id="{prod_id}-16x9" component={{{component_name}}} durationInFrames={{timeline.durationInFrames}} fps={{30}} width={{1920}} height={{1080}} defaultProps={{{{aspectRatio: '16:9' as const}}}} />
  </>
);

registerRoot(ProjectRoot3D);
'''
    (src_dir / "index.tsx").write_text(index_tsx, encoding="utf-8")

    film_tsx = f'''import React from 'react';
import {{AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig}} from 'remotion';
import timelineData from './timeline.json';
import {{
  AnamorphicSparkle3D,
  AtomicLattice3D,
  BeveledRing3D,
  MicroLayerStack3D,
  MinimalLuxuryCaptions3D,
  SatinMetricPill3D,
  StudioStage3D,
}} from '../../../../shared-art-3d';

export const timeline = timelineData;
type Scene = (typeof timeline.scenes)[number];

const getAsset = (file: string) => staticFile(file.split('/').pop() || file);

const Scene3DShot: React.FC<{{scene: Scene}}> = ({{scene}}) => {{
  const f = useCurrentFrame();
  const {{fps, width, height}} = useVideoConfig();

  return (
    <AbsoluteFill>
      <StudioStage3D width={{width}} height={{height}} cameraPosition={{[0, 1.35, 5.1]}}>
        {{scene.mode3d === 'layer_stack' ? (
          <MicroLayerStack3D
            rotation={{[0.18, f * 0.012 - 0.3, 0]}}
            layers={{[
              {{name: 'Plata', height: 1.1, preset: 'sterlingSilver'}},
              {{name: 'Paladio', height: 0.22, preset: 'palladiumBarrier'}},
              {{name: 'Oro', height: 0.38, preset: 'gold24k'}},
            ]}}
          />
        ) : scene.mode3d === 'atomic_lattice' ? (
          <AtomicLattice3D f={{f}} fps={{fps}} mode="deposit" preset="gold24k" />
        ) : (
          <>
            <BeveledRing3D position={{[-0.35, 0.72, -0.3]}} rotation={{[0.55, f * 0.022, 0.2]}} tarnishRatio={{0.78}} />
            <BeveledRing3D position={{[0.32, -0.68, 0.3]}} rotation={{[0.62, -f * 0.025, -0.18]}} materialPreset="gold24k" />
          </>
        )}}
      </StudioStage3D>
      <AnamorphicSparkle3D f={{f}} startFrame={{18}} xPercent={{66}} yPercent={{62}} />
      <SatinMetricPill3D f={{f}} delayFrames={{10}} xPercent={{50}} yPercent={{80}} text={{scene.chapter}} variant="gold" />
      <MinimalLuxuryCaptions3D words={{scene.words || []}} f={{f}} fps={{fps}} />
    </AbsoluteFill>
  );
}};

export const {component_name}: React.FC<{{aspectRatio?: '9:16' | '16:9'}}> = () => {{
  return (
    <AbsoluteFill style={{{{background: '#050507', fontFamily: 'system-ui, sans-serif'}}}}>
      {{timeline.scenes.map((scene) => (
        <Sequence key={{scene.id}} from={{scene.start}} durationInFrames={{scene.frames}}>
          <Scene3DShot scene={{scene}} />
          <Audio src={{getAsset(scene.audio)}} volume={{0.96}} />
        </Sequence>
      ))}}
      <Audio src={{getAsset('score.wav')}} volume={{0.22}} />
    </AbsoluteFill>
  );
}};
'''
    (src_dir / "Film.tsx").write_text(film_tsx, encoding="utf-8")

    dummy_tl = {
        "title": titulo,
        "fps": 30,
        "durationInFrames": 180,
        "scenes": [
            {
                "id": "01_hook_contraste",
                "chapter": "CONTRASTE INVISIBLE",
                "mode3d": "dual_rings",
                "text": "Introducción 3D PBR",
                "start": 0,
                "frames": 180,
                "words": [{"word": "Introducción", "start": 0.0, "end": 0.8}, {"word": "3D", "start": 0.8, "end": 1.4}],
                "audio": "01_hook_contraste.mp3"
            }
        ]
    }
    (proj_dir / "timeline.json").write_text(json.dumps(dummy_tl, indent=2) + "\n", encoding="utf-8")
    (src_dir / "timeline.json").write_text(json.dumps(dummy_tl, indent=2) + "\n", encoding="utf-8")

    pkg_path = REMOTION / "package.json"
    if pkg_path.exists():
        pkg = json.loads(pkg_path.read_text(encoding="utf-8"))
        pkg["scripts"][f"render:{prod_id}"] = f'node "../projects/{carpeta_fecha}/{prod_id}/render.mjs"'
        pkg_path.write_text(json.dumps(pkg, indent=2) + "\n", encoding="utf-8")

    print(f"\n[OK] Proyecto 3D PBR '{prod_id}' creado exitosamente en:\n     {proj_dir}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--id", required=True, help="Slug del proyecto 3D (ej. 'ciencia-oro-3d')")
    parser.add_argument("--titulo", required=True, help="Título del video 3D")
    parser.add_argument("--tema", default="", help="Descripción del objeto o fenómeno 3D")
    parser.add_argument("--fecha", default="", help="Carpeta de fecha opcional")
    args = parser.parse_args()
    crear_proyecto_3d(args.id, args.titulo, args.tema, args.fecha)


if __name__ == "__main__":
    main()
