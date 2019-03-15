#!/bin/bash

for browser in "$@"; do
  export TEST_BROWSER="$browser"
  echo -e "\n---------- $TEST_BROWSER test start ----------"
  npx dotenv cucumber-js features -- --require-module @babel/register  --require features/steps
  echo -e "----------- $TEST_BROWSER test end -----------\n"
done
