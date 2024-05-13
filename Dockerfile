# Utilizar la locationUn de mysql para crear una base de datos

FROM mysql:latest

# Variables iniciales

ENV MYSQL_ROOT_PASSWORD=toor
ENV MYSQL_DATABASE=post_db
ENV MYSQL_USER=brandon
ENV MYSQL_PASSWORD=123

# Copiar config, de schema para crear las tablas

EXPOSE 3306

COPY ./schema.sql /docker-entrypoint-initdb.d/
CMD ["mysqld"]
