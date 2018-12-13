CREATE DATABASE Sales;

USE Sales;

CREATE TABLE sales (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(64),
  password VARCHAR(32),
  email VARCHAR(32),
  line1 VARCHAR(32),
  line2 VARCHAR(32),
  city VARCHAR(32),
  state VARCHAR(32),
  zip_code INT,
  phone INT,
  card INT,
  expiry_date DATE,
  cvv INT,
  billing_zip INT
)