import { Character } from "../models/Character";
import { Router } from "express";

const character = Router()

character.use((request,response,next) =>{
    /** Checks if a user_id field was given */
    if (!("user_id" in request.body)){
        response.status(400).send({"message":"Request must come with appropriate user_id in body"})
    }
    /** Check in the users MS if this user still exists */
})

/**  */
character.get("/characters", async(req,res,next) => {

    next()
})