import {CHARACTERS_HOST} from '../defaults'


/* Exposes an interface for the mission class to handle */
interface CharacterInterface {
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

class Character implements CharacterInterface{
    charId: string;
    charInfo: any;
    level: number;
    requestedAttributeLevel: number;
    
    constructor(userIdchar_id: string, attribute: string) {
        this.charId = char_id;
        this.requestedAttribute = attribute;
        this.charInfo = null;
        this.level = -1;
        this.requestedAttributeLevel = -1;
    }
    requestedAttribute: string;
    
    async IncreaseLevel(): Promise<void> {
        let charInfo = fetch(`http://${CHARACTERS_HOST}/characters/bychar/${this.charId}`)
    }
    
    async TakeLife(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
