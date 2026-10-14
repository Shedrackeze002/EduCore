#!/bin/bash
# Usage: video/tools/words.sh src/content/<course>/videos/<id>.ts ...
# Counts the spoken words in each script (aim for about 350; under about 300 runs short).
for f in "$@"; do
  w=$(grep -o "say: '[^']*'\|say: \"[^\"]*\"" "$f" | sed "s/^say: .//; s/.$//" | wc -w)
  printf "%-60s %5s words\n" "$(basename "$f")" "$w"
done
