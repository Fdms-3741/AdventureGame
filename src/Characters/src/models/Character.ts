import mongoose, { mongo } from "mongoose";

/** 
 * 
 * Defining the character, attributes and status interfaces
 * 
 */
interface StatusInterface{
	lives: number,
	level: number
}

interface AttributesInterface{
	strength: number,
	dexterity: number,
	inteligence: number
}

interface CharacterInterface{
	_id: Number,

	name: {type:string, required:true},
	description?: string,
	image?: string, 
	
	status: StatusInterface,

	attributes: AttributesInterface

}

const CharacterSchema = new mongoose.Schema({

	user_id: { type: mongoose.SchemaTypes.ObjectId, required:true },

	name: {type: String, required: true},
	description: {type: String, required: true}, 
	image: String,

	status: { 
		lives:{ type: Number ,min:0, max:4,default:4},
		level: { type: Number, min:1, max:15,default:1} 
	},

	attributes: {
		strength: {type: Number, min: 0, max: 5,default:0},
		dexterity: {type: Number, min: 0, max: 5,default:0},
		inteligence: {type: Number,min: 0, max: 5, default: 0}
	},
	achievements: Array<Number>
})

 /*
 From mongoose docs: 
 Do not declare methods using ES6 arrow functions (=>). 
 Arrow functions explicitly prevent binding this, so your method
  will not have access to the document and the above examples will not work.
 */

export const Character: mongoose.Model<CharacterInterface> = mongoose.model<CharacterInterface>("Characters",CharacterSchema)
