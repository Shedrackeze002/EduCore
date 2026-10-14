#!/bin/bash
# Usage: video/tools/words.sh src/content/<course>/videos/<id>.ts ...
# Counts the spoken words in each script (350 to 450 makes about four minutes at the calm pace,
# and under about 300 runs short; there is no upper limit).
for f in "$@"; do
  w=$(grep -o "say: '[^']*'\|say: \"[^\"]*\"" "$f" | sed "s/^say: .//; s/.$//" | wc -w)
  printf "%-60s %5s words\n" "$(basename "$f")" "$w"
done
