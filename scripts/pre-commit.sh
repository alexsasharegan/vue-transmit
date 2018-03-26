#!/usr/bin/env bash

PRETTIER=$PWD/node_modules/.bin/prettier

$PRETTIER --config $PWD/.prettierrc --ignore $PWD/.prettierignore --write $PWD/**/*.{js,ts,md}
