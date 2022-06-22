import { MONGODB_TEST_ADDRESS, ClearDatabase,CloseDatabase,InitializeDatabase } from '../defaults'
import request from 'supertest'
import app from '../app'
import  mongoose from 'mongoose'

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

describe("POST /character", () => {
	it("Should return 200", async () =>{
		let response = await request(app).post("/characters").send({"user_id":"aaaaaaaaaaaaaaaaaaaaaaaa","name":"francis","description":"the hero's mission"})
		console.log(response.text)
		expect(response?.statusCode).toBe(200)
	})

	it("Should fail due to not having name", async () => {
		let response = await request(app).post('/characters').send({"user_id":"aaaaaaaaaaaaaaaaaaaaaaaa",'description':"123"})
		console.log(response.body)
		expect(response?.statusCode).toBe(400)
		expect(response?.body.message).toStrictEqual("Data failed to match schema")
	})
})

describe("GET /character", ()=>{
	it("Should return list of characters",async () => {
		let response = await request(app).get("/characters").send()
		console.log(response.text)
		expect(response?.statusCode).toBe(200)
		expect(response?.body).toBeInstanceOf(Array)
	})
})

describe("GET /character/:id",()=>{
	let userId = "aaaaaaaaaaaaaaaaaaaaaaaa";
	let charName = "Will them";

	it("should place a char in the database",async () => {
	})

	it("Should return lists for an specific Id",async () => {
		let placement = await request(app).post('/characters').send({
			user_id:userId,
			name:charName,
			description:"Valorous sup"
		})
		let charId = placement.body._id
		let response = await request(app).get(`/characters/${userId}`)
		console.log(response.body)
		expect(response?.statusCode).toBe(200)
		expect(response.body).toBeInstanceOf(Array)
	})

	it("Should return only one character", async ()=>{
		let placement = await request(app).post('/characters').send({
			user_id:userId,
			name:charName,
			description:"Valorous sup"
		})
		let charId = placement.body._id
		let response = await request(app).get(`/characters/${userId}/${charId}`)
		expect(response?.statusCode).toBe(200)
		expect(response.body._id).toStrictEqual(charId)
		expect(response.body.name).toStrictEqual(charName)
	})
})

describe("PUT /characters",()=>{
	let userId = "AAaaAaAa"
	let charName = 
})