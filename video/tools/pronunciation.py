"""Usage: python3 video/tools/pronunciation.py video/out/<id>/pronunciation.txt ...

Narrows the CHECK lines of each pronunciation.txt down to real word differences. The script and
Whisper's transcript are both lower-cased and stripped of punctuation, numbers, number words,
currency words and British/American spelling variants; the words that still differ are printed,
so only those lines need listening to. Most of what remains is transcription noise (homophones,
names, fraction words); a word the voice really gets wrong goes in `speechText`
(src/video/words.ts).
"""
import difflib
import os
import re
import sys

NUM = set('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion point and a an half halves third thirds quarter quarters fourth fourths fifth fifths sixth sixths seventh sevenths eighth eighths ninth ninths tenth tenths twelfth twelfths hundredth hundredths thousandth first second'.split())
CUR = set('dollar dollars cent cents percent per'.split())
SPELL = {'liter': 'litre', 'liters': 'litres', 'meter': 'metre', 'meters': 'metres', 'centimeter': 'centimetre', 'centimeters': 'centimetres', 'millimeter': 'millimetre', 'millimeters': 'millimetres', 'kilometer': 'kilometre', 'kilometers': 'kilometres', 'milliliter': 'millilitre', 'milliliters': 'millilitres', 'color': 'colour', 'colors': 'colours', 'center': 'centre', 'practice': 'practise', 'okay': 'ok', "let's": 'lets', 'analyze': 'analyse', 'favorite': 'favourite', 'favorable': 'favourable', 'gray': 'grey', 'traveled': 'travelled', 'labeled': 'labelled', 'modeled': 'modelled'}


def words(s):
    s = s.lower().replace('’', "'").replace('-', ' ').replace('$', ' dollars ').replace('%', ' percent ')
    s = re.sub(r'(\d),(\d)', r'\1\2', s)
    out = []
    for w in re.findall(r"[a-z']+|\d+(?:\.\d+)?", s):
        w = w.strip("'")
        if not w or re.fullmatch(r'\d+(\.\d+)?', w) or w in NUM or w in CUR:
            continue
        out.append(SPELL.get(w, w))
    return out


def main(paths):
    total = 0
    for p in paths:
        lines = open(p).read().splitlines()
        vid = os.path.basename(os.path.dirname(p))
        for i, line in enumerate(lines):
            if not line.startswith('CHECK'):
                continue
            # CHECK <word error rate> <time> <script line>, then "heard: <transcript>" below it.
            fields = line.split(None, 3)
            script = fields[3] if len(fields) > 3 else ''
            nxt = lines[i + 1] if i + 1 < len(lines) else ''
            heard = nxt.split('heard:', 1)[1].strip() if 'heard:' in nxt else ''
            a, b = words(script), words(heard)
            sm = difflib.SequenceMatcher(None, a, b)
            diffs = [(a[i1:i2], b[j1:j2]) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != 'equal']
            if diffs:
                total += 1
                print(f'{vid} {fields[2] if len(fields) > 2 else ""}')
                for x, y in diffs:
                    print(f'    said {" ".join(x) or "-"}  |  heard {" ".join(y) or "-"}')
    print(f'{total} lines with word differences', file=sys.stderr)


main(sys.argv[1:])
