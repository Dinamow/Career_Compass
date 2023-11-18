apt update
apt upgrade -y

# Check if Python is installed
if ! command -v python &>/dev/null; then
    apt install -y python3-pip
fi

# Check if MySQL is installed
if ! command -v mysql &>/dev/null; then
    apt install -y mysql-server
fi

pip install Faker
pip install mysql-connector-python
pip install Flask

cat db.sql | sudo mysql
