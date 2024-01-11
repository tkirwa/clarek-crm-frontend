#!/bin/bash

npm run build

docker build -t clarek-crm-frontend-image-v1 .
