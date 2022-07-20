import mongoose from 'mongoose';

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


export default {InitializeDatabase,ClearDatabase,CloseDatabase}
