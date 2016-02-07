#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# export phantomjs and casperjs bin to PATH
export PATH=$PATH:$DIR/node_modules/phantomjs/bin
export PATH=$PATH:$DIR/node_modules/casperjs/bin

# no we can run tests
casperjs test testfiles/*.js 
