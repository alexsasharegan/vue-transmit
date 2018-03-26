#!/usr/bin/env bash

PRETTIER=$PWD/node_modules/.bin/prettier

$PRETTIER --config $PWD/.prettierrc --write $PWD/**/*.{js,ts,md}
