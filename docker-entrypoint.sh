#!/bin/sh

set -e
cd ./libs/database
npx prisma generate
cd ../../apps/graphql
# Evaluate passed command:
exec "$@"