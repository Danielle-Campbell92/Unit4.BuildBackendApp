import client from "../client.js";



//create movie
export async function createMovie({ name, genre, release_date_year}) {
    const sql = 
    `INSERT INTO movies (name, genre, release_date_year) VALUES ($1, $2, $3) RETURNING *;`
    const {rows: movie} = await client.query(sql, [name, genre, release_date_year]);
    return movie[0];
  }

  //all movies
  export async function getMovies(){
    const sql = `
    SELECT * 
    FROM movies;
    `
    const {rows: movie} = await client.query(sql);
    return movie;
  }

  //movies with id
  export async function getMovie(id){
    const sql = `
    SELECT * FROM movies WHERE id = $1;`
    const {rows: movie} = await client.query(sql, [id]);
    return movie[0];
  }

  //update movie with id
  export async function updateMovie({id, name, genre, release_date_year}){
    const sql = `
    UPDATE movies
    SET name = $1, genre = $2, release_date_year = $3
    WHERE id = $4
    RETURNING *;`
    const {rows: movie} = await client.query(sql, [name, genre, release_date_year, id]);
    console.log(movie);
    return movie[0];
  }

  //delete with id
  export async function deleteMovie(id){
    const sql = `
    DELETE FROM movies WHERE id = $1 RETURNING *;`
    const {rows: movie} = await client.query(sql, [id]);
    return movie[0];
  }