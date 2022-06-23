import express, {Application} from "express";
import characterRoute from "./routes/character";
const app:Application = express()

/* Defining middleware to be used globally */
app.use(express.json())
app.use(express.urlencoded({extended:false}))

/* Custom logging middleware */
app.use((req,resp,next) => {
      console.log(`Request ${req.method} for ${req.path} from ${req.ip} with body ${req.body}`)
      next()
})

/* Defining routes used */
app.use(characterRoute)


export default app
