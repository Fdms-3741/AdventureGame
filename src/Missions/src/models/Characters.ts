import {CHARACTERS_HOST} from '../defaults'


/* Exposes an interface for the mission class to handle */
abstract class CharacterInterface {
    /* Character identifier */
    charId:string;

    /* Character information */
    charInfo: any;

    /* Required information for the character */
    level: number;
    requestedAttribute: string;
    requestedAttributeLevel: number;

    /* Functions to control the outcome of the mission attempt */
    abstract IncreaseLevel(): Promise<void>;
    abstract TakeLife(): Promise<void>;

}

class Character extends CharacterInterface{
    charId: string;
    charInfo: any;
    level: number;
    requestedAttributeLevel: number;
    
    constructor(char_id: string, attribute: string) {
        super();
        this.charId = char_id;
        this.requestedAttribute = attribute;
        this.charInfo = null;
    }
    
    async IncreaseLevel(): Promise<void> {
        let charInfo = fetch(`http://${CHARACTERS_HOST}/characters/${}`)
    }
    
    async TakeLife(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}