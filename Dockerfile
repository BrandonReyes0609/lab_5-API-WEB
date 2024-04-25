FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=blog_comida_uvg
ENV MYSQL_USER=mysql
ENV MYSQL_PASSWORD=116611
ENV MYSQL_ROOT_PASSWORD=116611

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]


