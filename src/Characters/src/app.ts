import express, {Application} from "express";
import {Character} from './models/Character'


const app:Application = express()


/* Defining middleware to be used globally */
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,resp,next)=>{
	resp.send("Hello there")
	next()	
})

app.get("/character", async (req,resp,next)=>{
	resp.send(await Character.find({}))
	next()
})

app.post("/character", async (req,resp,next) =>{
	try{
		let admission = new Character(req.body)
		await admission.save()
		resp.send({message: "Success"})
	}catch(err){
		resp.status(400).send({message: "Data failed to match schema.",details:err})
	}
	next()
})
export default app
