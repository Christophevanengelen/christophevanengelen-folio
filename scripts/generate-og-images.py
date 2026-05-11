#!/usr/bin/env python3
"""
CVE 2026-05-11 · Génère 3 og:images custom 1200×627 pour BNP/SPEOS/HMS.
Social Media Strategist reco · +10 shareability par case.

Charte folio · bg #0A1220 (navy) · fg #F2EBDB (cream) · amber #C76941
Typo · Manrope + Inter via Pillow par défaut système, fallback DejaVu/Helvetica.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os

# Charte
BG = (10, 18, 32)           # #0A1220 navy
FG = (242, 235, 219)        # #F2EBDB cream
FG_MUTED = (142, 135, 117)  # #8E8775
AMBER = (199, 105, 65)      # #C76941
BORDER = (35, 50, 75)
DOT = AMBER

W, H = 1200, 627
PAD = 60

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "img" / "og"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Fonts · essai macOS system + fallback
def load_font(size, weight="regular"):
    candidates = []
    if weight == "bold":
        candidates = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ]
    elif weight == "light":
        candidates = [
            "/System/Library/Fonts/HelveticaNeue.ttc",
            "/System/Library/Fonts/Supplemental/Helvetica Light.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ]
    else:
        candidates = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/HelveticaNeue.ttc",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def render_card(filename: str, eyebrow: str, h1_top: str, h1_amber: str, meta: str, proof: list):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Subtle ambient amber gradient bottom-right (radial-ish via overlay)
    # Skipped (PIL doesn't do radial gradient easily); use a single faint amber stripe
    for x in range(W - 280, W):
        alpha = max(0, (x - (W - 280)) / 280)
        r = int(BG[0] + (AMBER[0] - BG[0]) * alpha * 0.08)
        g = int(BG[1] + (AMBER[1] - BG[1]) * alpha * 0.08)
        b = int(BG[2] + (AMBER[2] - BG[2]) * alpha * 0.08)
        draw.line([(x, 0), (x, H)], fill=(r, g, b))

    # Top stripe · brand dot + name
    dot_y = PAD
    draw.ellipse([PAD, dot_y, PAD + 14, dot_y + 14], fill=AMBER)
    name_font = load_font(20, "regular")
    draw.text((PAD + 26, dot_y - 4), "Christophe van Engelen", font=name_font, fill=FG)

    # Eyebrow · top-left, micro caps
    eyebrow_font = load_font(15, "bold")
    draw.text((PAD, PAD + 70), eyebrow.upper(), font=eyebrow_font, fill=AMBER)

    # H1 · two-line layout, big display
    h1_font_top = load_font(64, "light")
    h1_font_amber = load_font(64, "bold")
    h1_y = PAD + 110
    draw.text((PAD, h1_y), h1_top, font=h1_font_top, fill=FG)

    # Mesure h1_top height pour positionner h1_amber juste en dessous
    bbox_top = draw.textbbox((PAD, h1_y), h1_top, font=h1_font_top)
    h1_amber_y = bbox_top[3] + 8
    draw.text((PAD, h1_amber_y), h1_amber, font=h1_font_amber, fill=AMBER)

    # Meta line · bottom-left, small caps
    meta_font = load_font(16, "regular")
    draw.text((PAD, H - PAD - 80), meta, font=meta_font, fill=FG_MUTED)

    # Proof line · 3 chiffres en bas
    proof_font_num = load_font(36, "bold")
    proof_font_lab = load_font(13, "regular")
    proof_y = H - PAD - 40
    col_w = (W - PAD * 2) // 3
    for i, (num, lab) in enumerate(proof):
        x = PAD + i * col_w
        draw.text((x, proof_y - 10), num, font=proof_font_num, fill=AMBER)
        bbox_num = draw.textbbox((x, proof_y - 10), num, font=proof_font_num)
        draw.text((bbox_num[2] + 12, proof_y + 14), lab, font=proof_font_lab, fill=FG_MUTED)

    # Bottom-right · domain watermark
    domain_font = load_font(14, "regular")
    domain_text = "christophevanengelen.com"
    bbox_d = draw.textbbox((0, 0), domain_text, font=domain_font)
    dw = bbox_d[2] - bbox_d[0]
    draw.text((W - PAD - dw, H - PAD + 2), domain_text, font=domain_font, fill=FG_MUTED)

    out = OUT_DIR / filename
    img.save(out, "JPEG", quality=88, optimize=True)
    print(f"✓ {out.relative_to(OUT_DIR.parent.parent)}  ({out.stat().st_size // 1024} KB)")


# BNP
render_card(
    "og-bnp.jpg",
    eyebrow="BNP Paribas Fortis · 2018 — 2019 · Bruxelles",
    h1_top="30 % des paiements du pays",
    h1_amber="passaient par BNP.",
    meta="Service Design · 6 mois · sponsor BNPPF · Léonidas pré-signe",
    proof=[("6", "PME terrain"), ("4", "fonctions alignées"), ("1", "intention écrite")],
)

# SPEOS
render_card(
    "og-speos.jpg",
    eyebrow="SPEOS · groupe bpost · 2024 — 2025 · Bruxelles",
    h1_top="Installer la fonction UX",
    h1_amber="dans une filiale postale.",
    meta="CX / UX / Service Design · 12 mois · 6/6 clients pilotes valident",
    proof=[("76", "pages signées"), ("6", "pilotes / 6 OK"), ("5", "Value Props MVP")],
)

# HMS
render_card(
    "og-hms.jpg",
    eyebrow="Ewon by HMS Networks · 2021 — 2022 · Nivelles",
    h1_top="Trois plateformes legacy.",
    h1_amber="Une culture à installer.",
    meta="Service Design + UX/UI · 12 mois · 2 M€ obtenus en comité",
    proof=[("2 M€", "débloqués"), ("8", "machine builders"), ("3", "plateformes unifiées")],
)
print("\n✓ Build complete. 3 og:images written to public/img/og/")

# HOME · pack v4-final
render_card(
    "og-home.jpg",
    eyebrow="Service Design · UX · CX · Bruxelles",
    h1_top="J'aide les équipes à transformer",
    h1_amber="un cadrage flou en service.",
    meta="Vingt ans · banque, postal industriel, SaaS, legal-tech · 3 cases publics",
    proof=[("20", "ans"), ("3", "cases publics"), ("1", "mandat à la fois")],
)
