"""Usage: python3 video/tools/contact-sheet.py <out.png> <id> [<id> ...]

Puts the stills of each video's scenes (after the title) on one sheet, two to a row, so a whole
lesson's layouts can be checked at a glance after `npx tsx video/build.ts <ids> --stills --quick`.
Needs Pillow.
"""
import glob
import sys

from PIL import Image

out, ids = sys.argv[1], sys.argv[2:]
files = []
for vid in ids:
    files += sorted(glob.glob(f'video/out/{vid}/stills/scene-*.png'))[1:]
w, h, cols = 640, 360, 2
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (w * cols, h * max(rows, 1)), 'black')
for i, f in enumerate(files):
    sheet.paste(Image.open(f).resize((w, h)), ((i % cols) * w, (i // cols) * h))
sheet.save(out)
print(f'{len(files)} stills')
