#!/bin/bash -li

alias docker_compose='docker compose -f docker-compose.yml' ;

docker_compose build ;
docker_compose up -d ;
docker_compose exec backend bash ;
docker_compose down ;
