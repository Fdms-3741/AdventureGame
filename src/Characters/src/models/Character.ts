import mongoose, { mongo } from "mongoose";

/** 
 * 
 * Character model definition 
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

	user_id: { type: Number, required:true },

	name: {type: String, required: true},
	description: {type: String, required: true}, 
	image: String,

	status: { 
		lives:{ type: Number },
		level: { type: Number} 
	},

	attributes: {
		strength: Number,
		dexterity: Number,
		inteligence: Number
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
