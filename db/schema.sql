DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS movies;

CREATE TABLE platforms(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    release_date_year INTEGER NOT NULL
)