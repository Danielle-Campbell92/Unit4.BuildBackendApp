import express from "express";
import moviesRouter from "./api/movies.js";
import platformsRouter from "./api/platforms.js";

const app = express();

app.use(express.json());

// TODO: route /movies to movies router
app.use("/movies", moviesRouter)
app.use("/platforms", platformsRouter)


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;