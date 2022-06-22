import { MONGODB_TEST_ADDRESS, InitializeDatabase, ClearDatabase, CloseDatabase } from '../defaults'
import {Character} from '../models/Mission'
import mongoose from 'mongoose'

beforeAll(async () => {
	await InitializeDatabase(MONGODB_TEST_ADDRESS)
})

afterAll(async () => {
	await ClearDatabase()
	await CloseDatabase()
	
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
			'user_id':"aabaaaaaaaaaaaaaaaaaaaaa", /* Ids are ^[0-9a-fA-F]{24}$ */
			'name': searchname,
			'description':'Meanders through dark alleyways carriyng nothing but a big sack full of potatoes, nobody knows why.'
		})
		await player.save()
		let results = await Character.findOne({'name':searchname})
		expect(results).toBeDefined()
		expect(results?.name).toStrictEqual(searchname)
	})	
})


