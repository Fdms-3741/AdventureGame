import mongoose, {Schema, model, connect, connection} from 'mongoose';
import CharacterSchema from './models/character';



class CharacterDatabase{

    private static instance : CharacterDatabase;
    private static connection : mongoose.Connection;
    private model : any;

    private constructor(databaseUrl: string){    
        CharacterDatabase.connection = mongoose.createConnection(databaseUrl)
        this.model = CharacterDatabase.connection.model('Characters',CharacterSchema)
    }
    
    public static async Connect(databaseUrl: string): Promise<CharacterDatabase> {

        if (!CharacterDatabase.instance){
            CharacterDatabase.instance = new CharacterDatabase(databaseUrl);
        }
       
        if (CharacterDatabase.connection.readyState != 1){/* 1 -> Connected*/
            CharacterDatabase.connection.startSession()
        } 
        
        /* Whenever connecting, get's stuck untill connection is successfull */
        await CharacterDatabase.connection.asPromise()

        return CharacterDatabase.instance
    }
    
    public static async ClearDatabase(){
        for (const key in mongoose.connection.collections){
            const collection = mongoose.connection.collections[key]
            await collection.deleteMany({})
        }
    }

    public static async Close(){
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    }
}

export default CharacterDatabase