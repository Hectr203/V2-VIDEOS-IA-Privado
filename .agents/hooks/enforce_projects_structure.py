#!/usr/bin/env python3
"""
Hook de validación estricta de estructura y fechas para video-studio/projects.
Se ejecuta en los puntos de control del ciclo de vida del agente (PreToolUse y PostToolUse).
"""

import json
import os
import re
import shlex
import sys
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
STUDIO_NAMES = ("video-studio-2d", "video-studio-3d", "video-studio")
PROJECTS_DIRS = [WORKSPACE_ROOT / name / "projects" for name in STUDIO_NAMES]

PERMITTED_ROOT_FILES = {
    ".gitkeep",
    ".gitignore",
    "tsconfig.json",
    "render_jobs",
    ".DS_Store",
}

FECHA_PATTERN = re.compile(
    r"^\d{1,2} de (?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}$",
    re.IGNORECASE,
)


def inspeccionar_path(target_path_str: str) -> tuple[bool, str]:
    """Verifica si un path intenta escribir o crear algo ilegal en video-studio-*/projects/."""
    try:
        p = Path(target_path_str)
        if not p.is_absolute():
            p = (WORKSPACE_ROOT / p).resolve()
        else:
            p = p.resolve()
    except Exception:
        return True, ""

    matched_studio = None
    rel = None
    for studio_name, proj_dir in zip(STUDIO_NAMES, PROJECTS_DIRS):
        try:
            rel = p.relative_to(proj_dir)
            matched_studio = studio_name
            break
        except ValueError:
            continue

    if rel is None or matched_studio is None:
        return True, ""

    parts = rel.parts
    if not parts:
        return True, ""

    primer_segmento = parts[0]

    if primer_segmento in PERMITTED_ROOT_FILES:
        return True, ""

    if not FECHA_PATTERN.match(primer_segmento):
        return (
            False,
            f"Intento de acceso o escritura en la raíz de projects no permitido: '{primer_segmento}'. "
            f"Todo proyecto debe guardarse forzosamente dentro de su carpeta de fecha "
            f"('{matched_studio}/projects/<DD de mes de YYYY>/<slug>/').",
        )

    return True, ""


def handle_pre_tool_use(payload: dict) -> dict:
    tool_call = payload.get("toolCall", {})
    args = tool_call.get("args", {})

    target_file = args.get("TargetFile") or args.get("target_file") or args.get("Path")
    if target_file:
        valido, motivo = inspeccionar_path(str(target_file))
        if not valido:
            return {"decision": "deny", "reason": motivo}

    command_line = args.get("CommandLine") or args.get("command") or ""
    if command_line and any(f"{s}/projects" in command_line for s in STUDIO_NAMES):
        try:
            tokens = shlex.split(command_line)
        except Exception:
            tokens = command_line.split()
        for token in tokens:
            clean_token = token.strip("\"'")
            if any(f"{s}/projects/" in clean_token for s in STUDIO_NAMES):
                valido, motivo = inspeccionar_path(clean_token)
                if not valido:
                    return {"decision": "deny", "reason": motivo}

    return {"decision": "allow"}


def handle_post_tool_use(payload: dict) -> dict:
    for proj_dir in PROJECTS_DIRS:
        if proj_dir.exists():
            for item in proj_dir.iterdir():
                nombre = item.name
                if nombre in PERMITTED_ROOT_FILES:
                    continue
                if item.is_symlink() or item.is_file() or not FECHA_PATTERN.match(nombre):
                    if item.is_symlink():
                        item.unlink()
                    print(
                        f"[AVISO HOOK] Se detectó y corrigió un elemento no permitido en {proj_dir}: {nombre}",
                        file=sys.stderr,
                    )
    return {}


def main():
    raw_input = sys.stdin.read().strip()
    payload = {}
    if raw_input:
        try:
            payload = json.loads(raw_input)
        except Exception:
            pass

    # Si tiene toolCall, es PreToolUse
    if "toolCall" in payload:
        response = handle_pre_tool_use(payload)
    else:
        # Es PostToolUse u otro evento
        response = handle_post_tool_use(payload)

    print(json.dumps(response))


if __name__ == "__main__":
    main()
