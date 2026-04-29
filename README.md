# Enterprise Intelligence — Service Design Case Study

One-page portfolio site for the Luminus interview, May 2026.

## Local preview
```bash
cd web
python3 -m http.server 8765
# open http://localhost:8765
```

Served by the running server (port 8765).

## Deploy to Vercel
```bash
npm i -g vercel    # one-time, if needed
cd web
vercel --prod      # interactive setup the first time
```
Vercel will detect the static site automatically. The `vercel.json` adds long-cache headers for `/public/img/` and basic security headers.

## Structure
```
web/
  index.html          ← single-page site
  vercel.json         ← Vercel deploy config
  public/img/         ← curated visuals from the BNP project (16 files, ~2 MB)
  _analysis/          ← raw text extracts from source PDFs/PPTXs (excluded from deploy if needed)
```
