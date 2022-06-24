import { Character } from "../models/Character";
import { Router } from "express";
import * as mongoose from "mongoose";

const characterRoute = Router()

/**  */
characterRoute.get("/characters", async(req,res,next) => {

    try {
        let results: any = await Character.find({})
        res.status(200).send(results)
    } catch (error:any) {
        res.status(500).send({message:error.message})
    }
    next()
})

characterRoute.get("/characters/byuser/:id",async (req,res,next) => {
    try{
        let results: any = await Character.find({user_id:req.params.id})
        res.status(200).send(results)
    }catch(err:any){
        res.status(400).send({message:err.message})
    }
    next()
})

characterRoute.get('/characters/bycharacter/:char_id',async (req,res,next) => {
    try{
        let results: any = await Character.findById(req.params.char_id)
        res.status(200).send(results)
    }catch(err:any){
        console.log({message:"Data failed to match schema",details:err.message})
        res.status(400).send({message:err.message})
    }
    next()
})

characterRoute.post("/characters/:userId",async (req,res,next) => {
    let results :any
    try{
        let entry = req.body
        entry.user_id = req.params.userId
        console.log(entry)
        results = new Character(entry)
        await results.save()
        res.status(200).send(results)
    }catch(err:any){
        console.log({message:"Data failed to match schema",details:err.message})
        res.status(400).send({message:"Data failed to match schema",details:err.message})
    }
    next()
})

characterRoute.put("/characters/levelup/:charId", async (req,res,next) =>{
    let search: any
    try{
        search = await Character.findById(req.params.charId)
        if (!search){
            res.status(404).send({message: "No character with this id was found"})
            next()
        }
    }catch(err:any){
            res.status(404).send({message: "No character with this id was found"})
            next()
    }
    try {
        await search.IncreaseLevel(req.body.attribute)
        res.status(200).send(search)
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message()})
        next()
    }
    next()
})

characterRoute.put("/characters/takelife/:charId", async (req,res,next) =>{
    let search: any
    try{
        search = await Character.findById(req.params.charId)
        if (!search){
            res.status(404).send({message: "No character with this id was found"})
            next()
        }
    }catch(err:any){
            res.status(404).send({message: "No character with this id was found"})
            next()
    }
    try {
        await search.RemoveLife()
        res.status(200).send(search)
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message()})
        next()
    }
    next()
})

characterRoute.put("/characters/description/:charId", async (req,res,next) =>{
    let search: any
    try{
        search = await Character.findById(req.params.charId)
        if (!search){
            res.status(404).send({message: "No character with this id was found"})
            next()
        }
    }catch(err:any){
            res.status(404).send({message: "No character with this id was found"})
            next()
    }
    try {
        search.description = req.body.description
        await search.save()
        res.status(200).send(search)
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message()})
        next()
    }
    next()
})

characterRoute.put('/characters/achievements/:charId', async (req,res,next) =>{
    let search: any
    let objectIdRegex = new RegExp('^[0-9a-fA-F]{24}$')
    /* If request doesn't have mission_id, bad request */
    if(!('mission_id' in req.body)){
        res.status(400).send({message: "No field mission_id was sent"})
        return
    }
    /* If mission_if*/
    if (('mission_id' in req.body) && (req.body.mission_id.search(objectIdRegex) == -1)){
        res.status(400).send({message:"Mission ID sent is not a valid mission id object"})
        return
    }

    /* Searches for char by id */
    try{
        search = await Character.findById(req.params.charId)
        if (!search){
            res.status(404).send({message: "No character with this id was found"})
        return
        }
    }catch(err:any){
            res.status(404).send({message: "No character with this id was found"})
            return
    }

    try {
        //let achievement = new mongoose.Types.ObjectId(req.body.missionId)
        search.achievements.push(req.body.mission_id)
        console.log(`${req.body.missionId} ->  after adding: ${search.achievements}`)
        await search.save()
        res.status(200).send(search)
        return
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message})
        return
    }
})

characterRoute.delete("/characters/:char_id",async (req,res,next) => {
    try{
        await Character.findByIdAndDelete(req.params.char_id)
        res.status(200).send()
    }catch(err){
        res.status(400).send({message: "Id not found"})
    }
})

export default characterRoute