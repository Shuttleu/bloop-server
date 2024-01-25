#!/bin/bash

if [[ -n "${RUN_MIGRATIONS}" ]]; then
  echo "RUN_MIGRATIONS set, running migrations..."
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
fi

echo "Starting Bloop Server..."
node server.js
