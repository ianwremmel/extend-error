#!/bin/bash

mocha --reporter spec
if [ "$TRAVIS_NODE_VERSION" == "iojs" ]; then
  karma start karma-ci.conf.js
fi
