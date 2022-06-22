import { MONGODB_TEST_ADDRESS } from "../defaults";
import { Character } from "../models/Character";
import mongoose, { mongo } from 'mongoose';



async function ConnectToDatabase(){
    await mongoose.connect(MONGODB_TEST_ADDRESS,{
        authSource:"admin"
    }).then(()=>{console.log("Connected to the database")})
}

beforeAll(async () => {
    await ConnectToDatabase()
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

const testChar = {
    'user_id':"123456789101213141516171",
    'name':"Wesley",
    "description":"Has its chronicles"
}

describe("Testing character creation",()=>{
    /* It should create a normal character */
    it("Should create and save the character",async ()=>{
        const character = new Character(testChar)
        await character.save()
       const SearchedCharacter =  await Character.findById(character._id)
       expect(SearchedCharacter?.user_id).toEqual(new mongoose.Types.ObjectId(testChar.user_id))
       expect(SearchedCharacter?.status.level).toEqual(1)
       expect(SearchedCharacter?.status.lives).toEqual(5)
       expect(SearchedCharacter?.attributes.strength).toEqual(0)
       expect(SearchedCharacter?.attributes.inteligence).toEqual(0)
       expect(SearchedCharacter?.attributes.dexterity).toEqual(0)
    }) 


})

describe("Testing life removal", ()=>{
    it("Should remove one life",async () => {
        let char = new Character(testChar)
        await char.save()
        await char.RemoveLife()
        let search = await Character.findOne({"_id":char._id})
        console.log(search)
        expect(search?.status.lives).toBe(4)
    })
})

describe("Testing leveling up", ()=> {
    it("Should level up strength", async() =>{
        let char = new Character(testChar);
        await char.save()
        await char.IncreaseLevel("strength")
        let search = await Character.findOne({_id:char._id})
        expect(search?.status.level).toBe(2)
        expect(search?.attributes.strength).toBe(1)
    })
    it("Should level up dexterity", async() =>{
        let char = new Character(testChar);
        await char.save()
        await char.IncreaseLevel("dexterity")
        let search = await Character.findOne({_id:char._id})
        expect(search?.status.level).toBe(2)
        expect(search?.attributes.dexterity).toBe(1)
    })
    it("Should level up inteligence", async() =>{
        let char = new Character(testChar);
        await char.save()
        await char.IncreaseLevel("inteligence")
        let search = await Character.findOne({_id:char._id})
        expect(search?.status.level).toBe(2)
        expect(search?.attributes.inteligence).toBe(1)
    })
    it("Should fail due to unkonwn value", async() =>{
        let char = new Character(testChar);
        await char.save()
        expect(char.IncreaseLevel("feeling")).rejects.toThrowError()
    })
})