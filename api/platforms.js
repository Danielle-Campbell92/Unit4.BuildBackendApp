import express from "express";
import { getPlatforms, getPlatform, createPlatform, deletePlatform, updatePlatform } from "../db/queries/platforms.js";
const router = express.Router();


router.route("/").get(async (req, res) =>{
    const platforms = await getPlatforms();
    res.send(platforms);
});

router.route("/:id").get(async (req, res) => {
    const id = req.params.id
    if(Number.isInteger(id) && id !=0){
        return res.status(400).send({error: "Please send a valid number"})
    }
    const platform = await getPlatform(id)
    if(!platform){
        return res.status(404).send({error: "ID not found"})
    }
    res.send(platform)
})

router.route("/").post(async (req, res) => {
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"})
    }
    const {name} = req.body
    if(!name){
        return res.status(400).send({error: "Missing require params"})
    } 
    const platform = await createPlatform({name})
    res.status(201).send(platform)
})

router.route("/:id").delete(async (req, res) => {
    const id = req.params.id
    if(Number.isInteger(id) && id !=0){
        return res.status(400).send({error: "Please send a valid number"})
    }
    const deletes = await deletePlatform(id)
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
    const {name} = req.body

    if(!name){
        return res.status(400).send({error: "Missing rquired fields"})
    }
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "fix your id"})
    }
    const platform = await getPlatform(id)
    if(!platform){
        return res.status(404).send({error: "Platform not found"})
    }
    const updated = await updatePlatform({id, name})
    res.send(updated)

})
export default router