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


## AHora para borrar el contenedor y locationUn de Dockerfile
 - Detener contendor

docker stop brandon-db
 
 - Eliminar contenedor

docker rm brandon-db

 - Eliminar locationUn del contendor 

docker rmi blog-brandon-db