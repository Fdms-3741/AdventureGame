import dotenv from 'dotenv';
import mongoose from 'mongoose';

/* Get defined environment variables in the default folder */
dotenv.config()

const USERS_HOST = "users"
const MONGODB_ADDRESS = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" +process.env.MONGODB_CHARACTERS_HOST
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


export {MONGODB_ADDRESS,MONGODB_TEST_ADDRESS,USERS_HOST,InitializeDatabase,ClearDatabase,CloseDatabase}
