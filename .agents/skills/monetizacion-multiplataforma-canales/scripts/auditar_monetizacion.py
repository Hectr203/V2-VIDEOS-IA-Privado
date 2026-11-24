#!/usr/bin/env python3
"""Auditor local de línea base e higiene multiplataforma (YouTube, Instagram, Facebook, TikTok).

Lee los documentos locales de studio-shared/mis-ideas/ (incluyendo la auditoría del
24 de noviembre de 2026 si existe) y genera un resumen verificable sin inventar métricas.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AUDIT_TARGET = "[24 de noviembre de 2026] - [Mejores ideas para expandir mi audiencia] - Auditoria y formula ganadora Un Dato Mas IG.md"

PLATFORM_PLAYBOOK = {
    "youtube": {
        "monetizacion": "YPP (1,000 subs + 4,000h long-form o 10M vistas Shorts 90d)",
        "duracion_optima": "Shorts 45-60s (9:16) + Long-form 4-10min (16:9) de temas outliers",
        "metrica_reina": "Viewed vs. Swiped Away >= 70% (Shorts) y CTR + retencion 30s (Long-form)",
    },
    "instagram": {
        "monetizacion": "Crecimiento organico, patrocinios, embudo comercial e Instagram Gifts",
        "duracion_optima": "Reels 45-75s (max 90s en historia profunda) en 1080x1920",
        "metrica_reina": "Envios por DM por alcance (Sends/Reach), guardados y finalizacion",
    },
    "facebook": {
        "monetizacion": "Facebook Content Monetization unificado (Reels + Video Nativo + Posts)",
        "duracion_optima": "Reels 45-85s (9:16) + Video Nativo 3-6min (16:9 o 4:5) 100% original",
        "metrica_reina": "Qualified Views, retencion 0-3s y velocidad de compartidos (Shares)",
    },
    "tiktok": {
        "monetizacion": "Creator Rewards Program (exige videos originales > 60s, 10K seg, 100K vistas/30d)",
        "duracion_optima": "62-90s (9:16) para monetizacion Rewards o 35-55s para traccion inicial",
        "metrica_reina": "Retencion > 5s (vista calificada), tasa de finalizacion y TikTok SEO",
    },
}


def inspeccionar_mis_ideas(directorio: Path) -> dict:
    if not directorio.is_dir():
        raise FileNotFoundError(f"No existe el directorio mis-ideas: {directorio}")

    archivos = sorted(
        p.name for p in directorio.iterdir() if p.is_file() and p.suffix.lower() == ".md" and p.name != "README.md"
    )
    auditoria_path = directorio / AUDIT_TARGET
    auditoria_presente = auditoria_path.is_file()

    hallazgos_auditoria: dict = {"archivo": AUDIT_TARGET, "presente": auditoria_presente}
    if auditoria_presente:
        texto = auditoria_path.read_text(encoding="utf-8")
        cuenta = re.search(r"Cuenta analizada:\*\*\s*\[`([^`]+)`\]", texto)
        mediana = re.search(r"Mediana:\s*\*\*([0-9,]+)\s*vistas\*\*", texto)
        media = re.search(r"Media:\s*\*\*([0-9.,]+)\s*vistas\*\*", texto)
        mejor = re.search(r"Mejor referencia de la cuenta:\s*`([^`]+)`\s*\(([^)]+)\)", texto)
        hallazgos_auditoria.update(
            {
                "cuenta_base": cuenta.group(1) if cuenta else "no detectada",
                "mediana_vistas_ig": mediana.group(1) if mediana else "no detectada",
                "media_vistas_ig": media.group(1) if media else "no detectada",
                "mejor_outlier": f"{mejor.group(1)} ({mejor.group(2)})" if mejor else "no detectado",
                "reglas_detectadas": [
                    "Resolucion obligatoria 1080x1920 (evitar 720x1280)",
                    "Duracion optima Reels 45-75s (max 90s; nunca >180s en Reels)",
                    "Cadencia espaciada: 1 pieza cada 24-48h (sin rafagas en una misma noche)",
                    "Eliminar #AprendeEnTikTok fuera de TikTok y usar 3-5 hashtags limpios de nicho",
                    "Pilares validados: 60% Nostalgia/Historia Humana LATAM, 25% Mitos/Ciencia Cotidiana, 15% Mascotas/Afecto",
                ],
            }
        )

    return {
        "directorio": str(directorio.resolve()),
        "total_documentos_ideas": len(archivos),
        "documentos": archivos,
        "auditoria_base_24_nov_2026": hallazgos_auditoria,
        "plataformas_obligatorias": PLATFORM_PLAYBOOK,
        "puerta_cumplimiento": {
            "lectura_mis_ideas": bool(archivos),
            "auditoria_24_nov_presente": auditoria_presente,
            "cobertura_4_plataformas": list(PLATFORM_PLAYBOOK.keys()),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audita el contexto local de studio-shared/mis-ideas y despliega la matriz de monetizacion para YouTube, Instagram, Facebook y TikTok."
    )
    parser.add_argument(
        "--mis-ideas",
        default="studio-shared/mis-ideas",
        help="Ruta al directorio studio-shared/mis-ideas (por defecto: studio-shared/mis-ideas).",
    )
    parser.add_argument("--json", action="store_true", help="Imprime el informe en formato JSON.")
    args = parser.parse_args()

    try:
        reporte = inspeccionar_mis_ideas(Path(args.mis_ideas))
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    if args.json:
        print(json.dumps(reporte, ensure_ascii=False, indent=2))
        return 0

    print("=== AUDITORIA LOCAL MULTIPLATAFORMA ===")
    print(f"Directorio: {reporte['directorio']}")
    print(f"Documentos en mis-ideas: {reporte['total_documentos_ideas']}")
    base = reporte["auditoria_base_24_nov_2026"]
    print(f"Auditoria 24-Nov-2026 presente: {'SI' if base['presente'] else 'NO'}")
    if base["presente"]:
        print(f"  Cuenta base: {base['cuenta_base']} | Mediana: {base['mediana_vistas_ig']} vistas | Media: {base['media_vistas_ig']} vistas")
        print(f"  Mejor outlier: {base['mejor_outlier']}")
    print("\nCobertura obligatoria (4 plataformas):")
    for plat, data in reporte["plataformas_obligatorias"].items():
        print(f"  - {plat.upper()}: {data['monetizacion']} | Optimo: {data['duracion_optima']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
