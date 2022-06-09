import { MONGODB_TEST_ADDRESS } from '../defaults'
import {Character} from '../models/Character'
import mongoose from 'mongoose'

async function Connect(){
	console.log("Connecting to " + MONGODB_TEST_ADDRESS);
	await mongoose.connect(MONGODB_TEST_ADDRESS,{
		authSource:"admin"
	}).then(()=>{console.log("connected to the database")})
}

beforeAll(async () => {
	await Connect()
}) 

afterAll(async () => {
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
})


describe("Database connection conditions",()=>{
	/* Check if something isn't on fire */
	it("Should work",() => {
		expect(true).toBe(true)	
	})
	
	/* Evaluate database connection status, must be 1 for connected */
	it("Should be connected to the database", () => {
		expect(mongoose.connection.readyState).toBe(1)
	})
	
	

})

describe("Database interaction", () => {
	it("Should insert item in database", async ()=>{
		/* Search name  */
		let searchname = 'John of The Johns John'
		let player = new Character({
			'user_id':2,
			'name': searchname,
			'description':'Meanders through dark alleyways carriyng nothing but a big sack full of potatoes, nobody knows why.'
		})
		await player.save()
		let results = await Character.findOne({'name':searchname})
		expect(results).toBeDefined()
		expect(results?.name).toStrictEqual(searchname)
	})	
})
