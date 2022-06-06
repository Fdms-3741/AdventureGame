import mongoose, {Schema, model, connect, connection} from 'mongoose';
import Character from './models/character';



class CharacterDatabase{

    private static instance : CharacterDatabase;
    private static connection : mongoose.Connection;
    private static model : typeof Character;

    private constructor(){    
        CharacterDatabase.model = Character
    }
    
    public static async Connect(databaseUrl: string): Promise<CharacterDatabase> {

        if (!CharacterDatabase.instance){
            CharacterDatabase.instance = new CharacterDatabase();
            await mongoose.connect(databaseUrl)
        }

        return CharacterDatabase.instance
    }
    
    public static async Clear(){
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