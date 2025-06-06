DROP TABLE IF EXISTS moviese CASCADE;
DROP TABLE IF EXISTS platforms CASCADE;

CREATE TABLE platforms(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    release_date_year INTEGER NOT NULL,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE SET NULL
)

CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)