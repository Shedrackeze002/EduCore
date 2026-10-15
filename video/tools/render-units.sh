#!/bin/bash
# Usage: video/tools/render-units.sh <course dir> <unit id>...
# Example: video/tools/render-units.sh math20-1 m201-u4 m201-u5 m201-u6
#
# Renders every video of each unit that is not finished yet, one video at a time, and uploads a
# unit to Google Drive once all of its videos are finished. A video counts as finished when its
# build succeeds (it leaves video/out/<id>/.rendered). A session restart stops background jobs,
# so the same command run again picks up at the first unfinished video. Delete a video's
# .rendered file to render it again. The upload skips files Drive already has.
set -u
cd "$(dirname "$0")/../.."
export CHROMIUM_PATH=${CHROMIUM_PATH:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}
export NODE_USE_ENV_PROXY=1
dir=${1:?usage: render-units.sh <course dir> <unit id>...}; shift
for unit in "$@"; do
  prefix=${unit%-u*} n=${unit##*-u}
  ids=$(ls "src/content/$dir/videos" | sed 's/\.ts$//' | grep "^$prefix-$n-" | sort -V)
  test -n "$ids" || { echo "=== $unit: no scripts in src/content/$dir/videos"; continue; }
  for id in $ids; do
    test -e "video/out/$id/.rendered" && continue
    if npx tsx video/build.ts "$id"; then touch "video/out/$id/.rendered"; else echo "=== $id: render FAILED"; fi
  done
  missing=$(for id in $ids; do test -e "video/out/$id/.rendered" || echo "$id"; done)
  if [ -n "$missing" ]; then echo "=== $unit: not uploaded, unfinished:" $missing; continue; fi
  echo "=== $unit rendered"
  if npx tsx video/tools/drive-upload.ts "$unit"; then echo "=== $unit uploaded"; else echo "=== $unit upload FAILED"; fi
done
echo "=== done"
