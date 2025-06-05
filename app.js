import express from "express";
import moviesRouter from "./api/movies.js";
import platformsRouter from "./api/platforms.js";
import { verifyToken } from "./auth/auth.js";
import authRouter from  "./auth/auth.js";

const app = express();

app.use(express.json());

// TODO: route /movies to movies router
app.use("/movies", moviesRouter)
app.use("/platforms", platformsRouter)
app.use("/auth", authRouter)


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

app.get('/me', verifyToken, (req,res) => {
  res.json({message: `Hello user ${req.user.userId}`})
})

export default app;