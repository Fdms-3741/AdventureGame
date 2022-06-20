import mongoose from "mongoose";

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

/** 
 * The character data model
*/
interface CharacterInterface extends mongoose.Document{
	
	_id: {type: mongoose.Schema.Types.ObjectId};/** Id from mongoose */

	/** Basic data associated to the character */
	user_id : {type: mongoose.Schema.Types.ObjectId};
	name: {type:string, required:true};
	description?: string;
	image?: string;
	
	/** Status object that defines life and level for the character */
	status: StatusInterface;

	/** Attributes that hold the level for each attribute of the character */
	attributes: AttributesInterface

	/** IncreaseLevel (attributes: string)
	 * 
	 * From an User object, it increases the current player level 
	*/
	IncreaseLevel: (attribute:string) => Promise<void>;

	/** RemoveLife 
	 * Removes a player's life from its life count. Raises an Error if it reaches zero.
	*/
	RemoveLife: () => Promise<void>;

	
}

const CharacterSchema = new mongoose.Schema({

	user_id: { type: mongoose.SchemaTypes.ObjectId, required:true },

	name: {type: String, required: true},
	description: {type: String, required: true}, 
	image: String,

	status: { 
		lives:{ type: Number ,min:0, max:5,default:5},
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


CharacterSchema.methods.IncreaseLevel = async function (attribute:string){
	/* Exits if attibute selected does not exist */
	if (!(attribute in this.attributes)){
		throw Error("Attribute does not exist")
	}
	
	/* Increases the player level and the level of the desired output */
	this.status.level += 1
	this.attributes[attribute] += 1

	/* Raises an Error if it violates the schema */
	await this.save()
}

CharacterSchema.method('RemoveLife',async function (){
	/* Removes a life from the character */
	this.status.lives -= 1
	/*Raises an Error if violates the Schema */
	await this.save()
})



export const Character: mongoose.Model<CharacterInterface> = mongoose.model<CharacterInterface>("Characters",CharacterSchema)
