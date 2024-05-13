# lab_5-API-WEB
## Comandos para la ejecución

**Nota: Si no funciona los comandos, es posible usar "sudo" **

** Recuerda tener la versión más resiente de node **

 - Usa la versión más actual:

nvm use 20.12.2

 - Ejecuta:

docker build -t blog-brandon-db .

 - Luego ejecuta el siguiente ejecuta:

docker run --name brandon-db -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_DATABASE=post_db -e MYSQL_USER=brandon -e MYSQL_PASSWORD=123 -p 3306:3306 -d blog-brandon-db

 - Luego, para iniciar el contenedor utiliza:

docker start brandon-db


 - Una vez hayas ejecutado sin errores la locationUn de docker, ejecuta:

npm start
 
 - Para probar el lint

npm run lint


## Agora para borrar el contenedor y locationUn de Dockerfile
 - Detener contendor

docker stop brandon-db
 
 - Eliminar contenedor

docker rm brandon-db

 - Eliminar locationUn del contendor 

docker rmi blog-brandon-db


## /POST

![POST](https://github.com/BrandonReyes0609/lab_5-API-WEB/assets/101024720/6f78350e-fa8c-4539-b14f-b6634c096dca)

## /GET

![GET1](https://github.com/BrandonReyes0609/lab_5-API-WEB/assets/101024720/4b7ae5fe-29d4-44c6-84c3-815a43c85cd7)

## /DELETE

![DELETE](https://github.com/BrandonReyes0609/lab_5-API-WEB/assets/101024720/061a9928-e868-4bd9-80fb-c28dfbecb431)

## /GET despues /DELETE

![GET despues DELETE](https://github.com/BrandonReyes0609/lab_5-API-WEB/assets/101024720/da3292e1-67d2-4eb1-8d29-b4789e6adc05)

