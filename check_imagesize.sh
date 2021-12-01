#!/bin/bash

# install ImageMagick to use this script

IFS=$'\n'
files=$(find . -name '*.png' -or -name '*.jpg')
for file in $files; do
    width=$(identify -format '%w' "$file")
    height=$(identify -format '%h' "$file")

    width_remainder=$((width % 8))
    height_remainder=$((height % 8))

    if [[ "$width_remainder" != "0" && "$height_remainder" != "0" ]]; then
        echo "$file: ($width x $height; remainder: $width_remainder x $height_remainder)"
    fi
done

