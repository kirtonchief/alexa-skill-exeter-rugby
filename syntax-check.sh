#!/bin/bash -xe

cd src/

node -c index.js
find lib -type f -name '*.js' | xargs -n1 node -c
