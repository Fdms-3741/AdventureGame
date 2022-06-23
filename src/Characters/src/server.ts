import app from './app'
import mongoose from 'mongoose';
import * as defaults from './defaults'

defaults.InitializeDatabase(defaults.MONGODB_ADDRESS).then(()=>{console.log("Connected to the database"),() => {throw Error("Couldn't connect to the database")}})

app.listen(80,"characters")
