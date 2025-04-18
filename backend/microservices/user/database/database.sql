CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    bio_id INTEGER
)