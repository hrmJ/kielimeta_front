#!/usr/bin/env bash
# Set environment variables from .env and set NODE_ENV to test
source <(npx dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test
yarn run build
npx pushstate-server -d dist/ -p $FRONTEND_PORT 
