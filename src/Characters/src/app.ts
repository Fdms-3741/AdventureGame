import express, {Application} from "express";
import {Character} from './models/Character'
const app:Application = express()

app.get("/",(req,resp,next)=>{
	resp.send("Hello there")
	next()	
})

app.post("/add/",(req,resp,next)=>{
	let addition = new Character(JSON.parse(req.read()))
	addition.save()
	next()
})

export default app