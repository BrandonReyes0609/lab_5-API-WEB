#!/bin/bash

service mysql start

# Wait for MySQL to start up

sleep 10

#Apply the database schema

mysql -u root -p" $MYSQL_ROOT_PASSWORD" </schema.sql

mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL

CREATE USER IF NOT EXISTS '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON $MYSQL_DATABASE. TO '$MYSQL_USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOSQL
# Keep the container running
tail -f /dev/null
