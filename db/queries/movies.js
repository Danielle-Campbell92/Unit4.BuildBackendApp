import client from "../client.js";



//create movie
export async function createMovie({ name, genre, release_date_year, platform_id}) {
    const sql = 
    `INSERT INTO movies (name, genre, release_date_year, platform_id) VALUES ($1, $2, $3, $4) RETURNING *;`
    const {rows: movie} = await client.query(sql, [name, genre, release_date_year, platform_id]);
    return movie[0];
  }

  //all movies
  export async function getMovies(){
    const sql = `
    SELECT 
    movies.*, 
    platforms.name AS platform_name
    FROM movies
    JOIN platforms ON movies.platform_id = platforms.id;
  `
  const { rows } = await client.query(sql);
  const movies = rows.map(movie => ({
    id: movie.id,
    name: movie.name,
    genre: movie.genre,
    release_date_year: movie.release_date_year,
    platform: {
      id: movie.platform_id,
      name: movie.platform_name
    }
  }))
  return movies;
  }

  //movies with id
  export async function getMovie(id){
    const sql = `
    SELECT 
    movies.*, 
    platforms.name AS platform_name
    FROM movies
    JOIN platforms ON movies.platform_id = platforms.id
    WHERE movies.id = $1;
  `
  const { rows } = await client.query(sql, [id]);
  if (rows.length === 0) return null;
  const movie = rows[0];
  return {
    id: movie.id,
    name: movie.name,
    genre: movie.genre,
    release_date_year: movie.release_date_year,
    platform: {
      id: movie.platform_id,
      name: movie.platform_name
    }
  }
  }

  //update movie with id
  export async function updateMovie({id, name, genre, release_date_year, platform_id}){
    const sql = `
    UPDATE movies
    SET name = $1, genre = $2, release_date_year = $3, platform_id = $4
    WHERE id = $5
    RETURNING *;`
    const {rows: movie} = await client.query(sql, [name, genre, release_date_year, platform_id, id]);
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