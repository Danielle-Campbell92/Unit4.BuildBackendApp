import client from "../client.js";



//create platform
export async function createPlatform({ name }) {
    const sql = 
    `INSERT INTO platforms (name) VALUES ($1) RETURNING *;`
    const {rows: platform} = await client.query(sql, [name]);
    return platform[0];
  }

  //all platforms
  export async function getPlatforms(){
    const sql = `
    SELECT * 
    FROM platforms;
    `
    const {rows: platform} = await client.query(sql);
    return platform;
  }

  //platforms with id
  export async function getPlatform(id){
    const sql = `
    SELECT * FROM platforms WHERE id = $1;`
    const {rows: platform} = await client.query(sql, [id]);
    return platform[0];
  }

  //update platform with id
  export async function updatePlatform({id, name}){
    const sql = `
    UPDATE platforms
    SET name = $1
    WHERE id = $2
    RETURNING *;`
    const {rows: platform} = await client.query(sql, [id, name]);
    console.log(platform);
    return platform[0];
  }

  //delete with id
  export async function deletePlatform(id){
    const sql = `
    DELETE FROM platforms WHERE id = $1 RETURNING *;`
    const {rows: platform} = await client.query(sql, [id]);
    return platform;
  }


  