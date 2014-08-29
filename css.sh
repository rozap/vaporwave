#!/bin/sh
OUT="examples/build.css"


lessc less/style.less > $OUT
echo "Compiled less to > " $OUT
while inotifywait -e modify "less/"; do
  lessc less/style.less > $OUT
done

