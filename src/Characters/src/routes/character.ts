import { Character } from "../models/Character";
import { Router } from "express";
import { HydratedDocument } from "mongoose";

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

characterRoute.get("/characters/:id",async (req,res,next) => {
    try{
        let results: any = await Character.find({user_id:req.params.id})
        res.status(200).send(results)
    }catch(err:any){
        res.status(400).send({message:err.message})
    }
    next()
})

characterRoute.get('/characters/:user_id/:char_id',async (req,res,next) => {
    try{
        let results: any = await Character.findById(req.params.char_id)
        res.status(200).send(results)
    }catch(err:any){
        res.status(400).send({message:err.message})
    }
    next()
})

characterRoute.post("/characters",async (req,res,next) => {
    let results :any
    try{
        results = new Character(req.body)
        await results.save()
        res.status(200).send(results)
    }catch(err:any){
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
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message()})
    }
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
    } catch (error:any) {
        res.status(400).send({message: "Invalid operation", details:error.message()})
    }
})

export default characterRoute