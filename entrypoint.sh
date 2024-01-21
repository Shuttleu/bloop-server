#!/bin/bash

if [[ -n "${FIRST_RUN}" ]]; then
  echo "FIRST_RUN set, running migrations..."
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
fi

echo "Starting Bloop Server..."
node server.js
