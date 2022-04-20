#!/bin/bash

data=$(find "$1" -maxdepth 1 -exec stat -c '%F : %n : %U : %G : %s : %w : %y' {} + | sed -e 's|^\.\/||' | sort)
echo "$data"

exit