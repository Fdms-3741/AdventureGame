import dotenv from 'dotenv';
import mongoose from 'mongoose';

/* Get defined environment variables in the default folder */
dotenv.config()


/** addresses for other MS */
const USERS_HOST = process.env.MICROSERVICE_USERS
const CHARACTERS_HOST = process.env.MICROSERVICE_CHARACTERS

const MONGODB_ADDRESS = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" +process.env.MONGODB_MISSIONS_HOST
const MONGODB_TEST_ADDRESS = MONGODB_ADDRESS + "/tests?authSource=admin&w=1"

/* Useful functions used throughout the project */
async function InitializeDatabase(address:string) {
    await mongoose.connect(address,{authSource:'admin'});

}

async function CloseDatabase(){
    await mongoose.connection.close()
}

async function ClearDatabase(){
    await mongoose.connection.dropDatabase()
}

export {MONGODB_ADDRESS,CHARACTERS_HOST,MONGODB_TEST_ADDRESS,USERS_HOST,InitializeDatabase,ClearDatabase,CloseDatabase}
