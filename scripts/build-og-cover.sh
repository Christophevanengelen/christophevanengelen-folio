#!/usr/bin/env bash
# Render og-cover.html → public/img/og-cover.jpg (1200x630, JPG quality 85)
# Used by index.html, bnp.html, luminus.html for OG/Twitter share previews.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }

echo "▶ Booting local server on :4421…"
( cd "$ROOT" && python3 -m http.server 4421 > /tmp/cve_og_server.log 2>&1 ) &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null || true" EXIT
sleep 1

TMP_PNG="$(mktemp -t og-cover-XXXXXX).png"
echo "▶ Screenshotting og-cover.html → $TMP_PNG"
"$CHROME" \
  --headless=new --disable-gpu \
  --window-size=1200,630 \
  --hide-scrollbars \
  --virtual-time-budget=2000 \
  --screenshot="$TMP_PNG" \
  "http://localhost:4421/og-cover.html" 2>/dev/null

if [ ! -s "$TMP_PNG" ]; then
  echo "  ✗ Screenshot failed"; exit 1
fi

OUT="$ROOT/public/img/og-cover.jpg"
echo "▶ Converting to JPG → $OUT"
sips -s format jpeg -s formatOptions 85 "$TMP_PNG" --out "$OUT" >/dev/null
W=$(sips -g pixelWidth "$OUT" | awk '/pixelWidth/{print $2}')
H=$(sips -g pixelHeight "$OUT" | awk '/pixelHeight/{print $2}')
echo "  ✓ ${W}x${H} · $(du -h "$OUT" | awk '{print $1}')"
rm -f "$TMP_PNG"
