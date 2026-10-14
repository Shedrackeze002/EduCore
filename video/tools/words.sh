#!/bin/bash
# Usage: video/tools/words.sh src/content/<course>/videos/<id>.ts ...
# Counts the spoken words in each script (350 to 450 makes about four minutes at the calm pace;
# under about 300 runs short, and over about 900 is past seven minutes).
for f in "$@"; do
  w=$(grep -o "say: '[^']*'\|say: \"[^\"]*\"" "$f" | sed "s/^say: .//; s/.$//" | wc -w)
  printf "%-60s %5s words\n" "$(basename "$f")" "$w"
done
