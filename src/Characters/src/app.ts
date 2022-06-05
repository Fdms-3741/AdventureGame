/** 
 * This file implements the CRUD application that manages information about Characters in the system 
 * 
 *
 * */


/* Used libraries*/
import express from 'express'; /* HTTP Handler */
import * as dotenv from 'dotenv';
import CharacterDatabase from './database';

/* User model for  */

/* Reads from dotenv file in project's root folder. Overwrites already defined ones */
dotenv.config({path:__dirname + "/.env"})

/* Constants */
// const GatewayAddress  = "http://gateway/"
const MongoDBAddress  = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD +"@"+process.env.MONGODB_SERVER+"/character" /* Gets username and password from environment variables set in the container */
//const RabbitMQAddress = "http://broker/"

/* Create application */
const app = express()

/* Connect to MongoDB database */
let database = CharacterDatabase.Connect(MongoDBAddress)

/* Defining REST application */
app.get("/",(req,res)=> {
    res.write({message: "Hello world"});
})

export default app