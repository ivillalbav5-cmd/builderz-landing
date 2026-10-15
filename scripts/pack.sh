#!/usr/bin/env bash
# Genera builderz-landing-entrega.zip con lo necesario para compilar y publicar.
# Excluye dependencias, builds, secretos locales y archivos de sistema.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="builderz-landing-entrega.zip"
rm -f "$OUT"
zip -r "$OUT" . \
  -x "node_modules/*" ".next/*" ".git/*" "_to_delete/*" ".vercel/*" \
  -x ".env.local" ".env*.local" "*.DS_Store" "*.zip" "*.tsbuildinfo" ".playwright-mcp/*"
echo "Listo: $OUT ($(du -h "$OUT" | cut -f1))"
