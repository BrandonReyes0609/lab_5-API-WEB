FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

# Configure MySQL to listen on all interfaces
RUN sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

ENV MYSQL_DATABASE=blog_db

ENV MYSQL_USER=blog_user

ENV MYSQL_PASSWORD=blog_password

ENV MYSQL_ROOT_PASSWORD=root_password

COPY schema.sql /schema.sql
COPY init-db.sh /init-db.sh
RUN chmod +x /init-db.sh

EXPOSE 3306
CMD ["mysqld"]
