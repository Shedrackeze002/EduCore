#!/bin/bash
# Usage: video/tools/pack.sh <unit-name> <ids...>
# Makes video/out/<unit-name>/ with one zip per video, each small enough to send as a file. Every
# zip extracts to <unit-name>/<NN>-<id>/ (MP4, thumbnail, captions, YouTube text), so extracting
# all of a unit's zips together gives one unit folder with a numbered sub-folder per video. It
# also makes video/out/<unit-name>.zip, the whole unit in one file.
# Example: video/tools/pack.sh math10-4-unit1 $(ls video/out | grep '^m104-1-' | sort -V)
set -euo pipefail
out="$(cd "$(dirname "$0")/.." && pwd)/out"
name=${1:?usage: pack.sh <unit-name> <ids...>}; shift
stage=$(mktemp -d "${TMPDIR:-/tmp}/pack.XXXXXX")
rm -rf "${out:?}/$name" "${out:?}/$name.zip"
mkdir -p "$out/$name" "$stage/$name"
i=0
for id in "$@"; do
  i=$((i + 1))
  n=$(printf '%02d' $i)
  for f in "$id.mp4" thumbnail.png captions.srt youtube.txt; do test -s "$out/$id/$f" || { echo "missing $id/$f"; exit 1; }; done
  mkdir "$stage/$name/$n-$id"
  for f in "$id.mp4" thumbnail.png captions.srt youtube.txt; do ln "$out/$id/$f" "$stage/$name/$n-$id/$f" 2>/dev/null || cp "$out/$id/$f" "$stage/$name/$n-$id/$f"; done
  (cd "$stage" && zip -q -r -n .mp4:.png "$out/$name/$name-$n-$id.zip" "$name/$n-$id")
done
(cd "$stage" && zip -q -r -n .mp4:.png "$out/$name.zip" "$name")
rm -rf "${stage:?}"
echo "$name: $(ls "$out/$name" | wc -l) zips, whole unit $(du -sh "$out/$name.zip" | cut -f1)"
