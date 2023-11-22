CREATE DATABASE IF NOT EXISTS Career_Compass;
USE Career_Compass;

CREATE TABLE IF NOT EXISTS usr(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(50),
    name VARCHAR(100),
    email VARCHAR(100),
    quize_type ENUM('High school', 'graduate'),
    linguistic INT DEFAULT 0,
    logical_mathematical INT DEFAULT 0,
    bodily_kinesthetic INT DEFAULT 0,
    spatial_visual INT DEFAULT 0,
    interpersonal INT DEFAULT 0,
    intrapersonal INT DEFAULT 0,
    naturalist INT DEFAULT 0,
    musical INT DEFAULT 0
);

CREATE USER IF NOT EXISTS 'compass'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON Career_Compass.* TO 'compass'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;