#!/bin/bash
set -e

# Check if the build directory exists
# if [ ! -d "build" ]; then
#   # If not, run the build
#   npm run build --production
# fi

# Start the React App application -- production
exec "$@"
