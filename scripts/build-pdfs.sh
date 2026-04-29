#!/usr/bin/env bash
# Build the 3 leave-behind PDFs (FR / NL / EN) from /bnp.html
# Usage:
#   ./scripts/build-pdfs.sh                       # uses live christophevanengelen.be
#   ./scripts/build-pdfs.sh local                 # boots a local server on :4420 and uses it
#
# Output: dist/cve-bnp-fr.pdf, cve-bnp-nl.pdf, cve-bnp-en.pdf
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist"
mkdir -p "$OUT"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }

MODE="${1:-prod}"
if [ "$MODE" = "local" ]; then
  echo "▶ Booting local server on :4420…"
  ( cd "$ROOT" && python3 -m http.server 4420 > /tmp/cve_pdf_server.log 2>&1 ) &
  SERVER_PID=$!
  trap "kill $SERVER_PID 2>/dev/null || true" EXIT
  sleep 1
  BASE="http://localhost:4420"
else
  BASE="https://christophevanengelen.be"
fi

for L in fr nl en; do
  URL="$BASE/bnp.html?lang=$L"
  OUT_PDF="$OUT/cve-bnp-$L.pdf"
  echo "▶ Rendering $L → $OUT_PDF"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    --no-margins \
    --print-to-pdf-no-header \
    --virtual-time-budget=4000 \
    --print-to-pdf="$OUT_PDF" \
    "$URL" 2>/dev/null
  if [ -s "$OUT_PDF" ]; then
    echo "  ✓ $(du -h "$OUT_PDF" | awk '{print $1}')"
  else
    echo "  ✗ FAILED ($OUT_PDF empty)"
  fi
done

echo "▶ Done. Open with:"
echo "  open '$OUT'/cve-bnp-fr.pdf"
