import mongoose from 'mongoose'

/**
 * The status indicates its current level and how many lives it still has
 */
interface Status{
    level:number,
    lives:number
}

/**
 * The attributes are the characteristics of a character used to numericaly describe it and to use in missions.
 */
interface Attributes{
    strength:number,
    inteligence:number,
    dexterity:number
}

/**
 * This interface describe all the information contained in a character object
 */
interface CharacterInterface{
    _id?:number,

    name:string,
    description:string,
    image:string,

    status:Status,    

    attributes: Attributes
}

const CharacterSchema= new mongoose.Schema<CharacterInterface>({
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

let Character = mongoose.model<CharacterInterface>("characters",CharacterSchema)


export default Character