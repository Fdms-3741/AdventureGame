import mongoose, {Schema, model, connect, connection} from 'mongoose';
import CharacterInterface from './models/character';
import * as fs from 'fs';


const CharacterSchema= new Schema<CharacterInterface>({
    name: { type: String, required : true },
    description: { type: String, required: true },
    image: { type: String, required:true },

    status:{
        level: { type: Number, required: true},
        lives: { type: Number, required: true}
    },

    attributes: {
        strength: {type: String, required: true},
        inteligence: { type: String, required: true},
        dexterity: {type: String, required: true}
    }
})


class CharacterDatabase{
    
    private static instance : CharacterDatabase;
    private databaseSchema : any;
    schema : Schema<CharacterInterface>;
    model : any

    private async ConnectToDatabase(connectionUrl:string){
        await mongoose.connect(connectionUrl)
    }
    private constructor(connectionUrl: string){
        
        this.ConnectToDatabase(connectionUrl)
        /* Creates the Characters schema */
        //his.databaseSchema = JSON.parse(fs.readFileSync(__dirname+"/models/CharacterSchema.json",'utf-8'))
        // this.schema = new Schema<CharacterInterface>(CharacterSchema)

        /* Creates model object */
        this.model = mongoose.model<CharacterInterface>('Character',CharacterSchema);
    }
    
    public static Connect(databaseUrl: string): CharacterDatabase {

        if (!CharacterDatabase.instance){
            CharacterDatabase.instance = new CharacterDatabase(databaseUrl)
        }
        
        return CharacterDatabase.instance
    }
    
}

export default CharacterDatabase