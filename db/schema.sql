DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

USE movies_db;

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    id INT AUTO_INCREMENT,
    movie_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id INT AUTO_INCREMENT,
    movie_id INT,
    review TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
    ON DELETE SET NULL
);