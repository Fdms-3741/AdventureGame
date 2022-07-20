import database from '../utils/database'
import User from '../models/user'
import mongoose from 'mongoose'
import config from '../config'

beforeAll(async () => {
	await database.InitializeDatabase(config.mongo.test);
});

afterAll(async () => {
	await database.ClearDatabase();
	await database.CloseDatabase();
});

beforeEach(async () => {
	await User.deleteMany({});
});

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
		let searchusername = 'John of The Johns John'
		let player = new User({
			'username': searchusername,
			'password':'1234'
		})
		await player.save()
		let results = await User.findOne({'name':searchusername})
		expect(results).toBeDefined()
		expect(results?.username).toStrictEqual(searchusername)
	});
})


