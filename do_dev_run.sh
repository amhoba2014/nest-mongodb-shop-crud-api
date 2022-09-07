#!/bin/bash -li

alias docker_compose='docker compose -f docker-compose.yml -f docker-compose.dev.yml' ;

docker_compose build ;
docker_compose up -d ;
docker_compose exec backend bash -c "yarn ts-node test/dummy-populate-database.ts" ;
docker_compose exec backend bash -c "yarn start:dev" ;
docker_compose down ;
