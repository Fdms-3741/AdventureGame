import mongoose from "mongoose";

/** 
 * The missions data model
 *  
 */
interface MissionInterface extends mongoose.Document{
	
	_id: {type: mongoose.Schema.Types.ObjectId};/** Id from mongoose */

	/** Basic data associated to the mission */
	name: {type:string, required:true};
	description?: string;
	image?: string;
	
	/* texts for sucess and failure */
	successText: string;
	failureText: string;

	/* Name of the attribute that's used to increase chances of success on this mission */
	modifier: string;
	
	/** Dificulty class that represents the missions dificulty */
	dificulty_value: number;

	/** AttemptMission 
	 * 
	 * Will take the value from the character Id and apply its attributes in the mission attempt.
	 * If it succeds, sends the char-id and the mission-id in the MISSION_COMPLETED channel, if it fails,
	 * sends the char and mission ids in the MISSION_FAILED channel.
	 * 
	 * Returns the status of the mission.
	 * 
	 * @param char_id [in] Id of the character that is going to attempt to complete
	 * 
	*/
	AttemptMission: () => Promise<void>;

}

const MissionSchema = new mongoose.Schema({

	user_id: { type: mongoose.SchemaTypes.ObjectId, required:true },

	name: {type: String, required: true},
	description: {type: String, required: true}, 
	image: String,

	successText: String,
	failureText: String,

	modifier: String,

	dificulty_value: {type: Number, default:10, min: 1, max: 41} /* One number above the maximum number that can be taken */
})

MissionSchema.methods.AttemptMission = async function (charId: string){
	/* Create a Character class and import characters data */
	new Character
	/* Calculate outcome of mission */
	/* Apply outcome to the character */

}

export const Mission: mongoose.Model<MissionInterface> = mongoose.model<MissionInterface>("Missions",MissionSchema)
