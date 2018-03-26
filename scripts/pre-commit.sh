#!/usr/bin/env bash

PRETTIER=$PWD/node_modules/.bin/prettier

$PRETTIER --config $PWD/.prettierrc --ignore-path $PWD/.prettierignore --write $PWD/src/**/*.{js,ts} $PWD/*.{md,ts,js}
