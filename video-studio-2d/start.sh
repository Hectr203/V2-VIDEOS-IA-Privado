#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
STUDIO_NAME="$(basename "$DIR")"
BACKEND_DIR="$DIR/backend"

if [[ "$STUDIO_NAME" == *"3d"* ]]; then
  DEFAULT_BACKEND_PORT=8010
  STUDIO_BANNER="VIDEO STUDIO 3D · API & MOTOR PBR (@remotion/three)"
else
  DEFAULT_BACKEND_PORT=8000
  STUDIO_BANNER="VIDEO STUDIO 2D · API & CARTOON DINÁMICO"
fi

VIDEO_STUDIO_HOST="${VIDEO_STUDIO_HOST:-127.0.0.1}"
VIDEO_STUDIO_BROWSER_HOST="${VIDEO_STUDIO_BROWSER_HOST:-localhost}"
VIDEO_STUDIO_BACKEND_PORT="${VIDEO_STUDIO_BACKEND_PORT:-$DEFAULT_BACKEND_PORT}"

echo "=========================================================="
echo "🎬 INICIANDO $STUDIO_BANNER"
echo "=========================================================="
echo "🚀 Backend FastAPI: http://$VIDEO_STUDIO_BROWSER_HOST:$VIDEO_STUDIO_BACKEND_PORT/docs"
echo "📁 Carpeta Video:   $DIR/output/"
echo "Presiona CTRL+C para detener el servidor."
echo ""

source "$BACKEND_DIR/.venv/bin/activate"
exec python3 -m uvicorn main:app --app-dir "$BACKEND_DIR" --host "$VIDEO_STUDIO_HOST" --port "$VIDEO_STUDIO_BACKEND_PORT"
