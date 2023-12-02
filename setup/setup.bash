#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

INSERT_SCRIPT="$SCRIPT_DIR/insert.py"
db_sql="$SCRIPT_DIR/db.sql"
sudo apt update
sudo apt upgrade -y

# Check if Python is installed
if ! command -v python3 &>/dev/null; then
    sudo apt install -y python3-pip
fi

if ! command -v gunicorn &>/dev/null; then
        sudo apt install -y gunicorn
fi

if ! command -v nginx &>/dev/null; then
        sudo apt install -y nginx
fi

if ! command -v npm &>/dev/null; then
    sudo apt install -y npm
fi

if ! command -v mysql &>/dev/null; then
    sudo apt install -y mysql-server
    sudo systemctl start mysqld
fi

if ! pip show Faker &>/dev/null; then
    pip install Faker
fi

if ! pip show mysql-connector-python &>/dev/null; then
    pip install mysql-connector-python
fi

if ! pip show Flask &>/dev/null; then
    pip install Flask
fi

if ! pip show pytest &>/dev/null; then
    pip install pytest
fi

if ! pip show Flask-Mail &>/dev/null; then
    pip install Flask-Mail
fi

if ! pip show flask-cors &>/dev/null; then
    pip install flask-cors
fi

cat $db_sql | sudo mysql

echo $INSERT_SCRIPT | bash
