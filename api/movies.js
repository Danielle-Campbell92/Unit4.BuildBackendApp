import express from "express";
import { createMovie, getMovie, getMovies, deleteMovie, updateMovie} from "../db/queries/movies";

const router = express.Router();


router.route("/").get(async (req, res) =>{
    const movies = await getMovies();
    res.send(movies);
});

router.route("/:id").get(async (req, res) => {
    const id = req.params.id
    if(Number.isInteger(id) && id !=0){
        return res.status(400).send({error: "Please send a valid number"})
    }
    const movie = await getMovie(id)
    if(!movie){
        return res.status(404).send({error: "ID not found"})
    }
    res.send(movie)
})

router.route("/").post(async (req, res) => {
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"})
    }
    const {name, genre, release_date_year} = req.body
    if(!name || !genre || !release_date_year){
        return res.status(400).send({error: "Missing require params"})
    } 
    const movie = await createMovie({name, genre, release_date_year})
    res.status(201).send(movie)
})

router.route("/:id").delete(async (req, res) => {
    const id = req.params.id
    if(Number.isInteger(id) && id !=0){
        return res.status(400).sendDate({error: "Please send a valid number"})
    }
    const deletes = await deleteMovie(id)
    if(!deletes){
        res.status(404).send({error: "Platform not found"})
    }
    res.status(204)
})

router.route("/:id").put(async (req, res) => {
    const id = req.params.id
    if(!req.body){
        return res.status(400).send({error: "Please send details"})
    }
    const {name, genre, release_date_year} = req.body

    if(!name){
        return res.status(400).send({error: "Missing rquired fields"})
    }
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "fix your id"})
    }
    const movie = await getMovie(id)
    if(!movie){
        return res.status(404).send({error: "Platform not found"})
    }
    const updated = await updateMovie({id, name, genre, release_date_year})
    res.send(updated)

})
export default router