import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from './db/client.js';

const router = express.Router();
const client = process.env.DATABASE_URL || 'database credentials';

const verifyToken = () => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
}

app.get('/', async(req, res, next) => {
  try{
    const allUsers = await client.query(`SELECT * FROM user`);
    if(!allUsers) return res.status(404).send('cant find users');
  }catch(err){
    console.log(err)
    res.status(400).send('cant find the info')
  }
})

app.post('/register', async (req, res, next) => {
  const {email, password, first_name, last_name} = req.body;
  try{
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = await client.query(`INSERT INTO user (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`, [email, first_name, last_name, hashedPassword]);
      if(!newUser) return res.status(401).send(`Couldnt make new user`);
      const tooken = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
      res.status(201).json(token)
  }catch(error){
    console.log(error)
    res.send('Error registering')
  }
})

app.post('/login', async(req,res,next) => {
  const {email, password} = req.body;
  try {
    const realUserInfo = await client.query(`SELECT * FROM user WHERE email = $1;`, [email]);
    const isPWMatch = await bcrypt.compare(password, realUserInfo.password);
    if(!isPWMatch) return res.status(401).send('Not authorized');
    const token = jwt.sign({id: realUserInfo.id, email: realUserInfo.email});
    res.status(201).json(token);
  }catch(error){
    console.log('Could not log in')
  }
})

app.get('/favorite', verifyToken, async(req,res,next) => {
  try {
    const favMovies = await client.query(`SELECT * FROM user WHERE favorite = true`);
    if(!favMovies) return res.status(404).send('Couldnt find favorite movies');
    res.status(201).json(favMovies);
  }catch(error){
    console.log(error);
    res.send('Error getting favorites')
  }
})

export default router;
