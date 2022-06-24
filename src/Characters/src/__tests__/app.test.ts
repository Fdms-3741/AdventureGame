import { MONGODB_TEST_ADDRESS, ClearDatabase,CloseDatabase,InitializeDatabase } from '../defaults'
import request from 'supertest'
import app from '../app'
import  mongoose from 'mongoose'
import { Character } from '../models/Character'

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
		let response = await request(app).post("/characters/aaaaaaaaaaaaaaaaaaaaaaaa").send({"name":"francis","description":"the hero's mission"})
		console.log(response.text)
		expect(response?.statusCode).toBe(200)
	})

	it("Should fail due to not having name", async () => {
		let response = await request(app).post("/characters/aaaaaaaaaaaaaaaaaaaaaaaa").send({'description':"123"})
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

describe("GET /character/by----/:ids",()=>{
	let userId = "aaaaaaaaaaaaaaaaaaaaaaaa";
	let charName = "Will them";

	it("should place a char in the database",async () => {
	})

	it("Should return lists for an specific Id",async () => {
		let placement = await request(app).post(`/characters/${userId}`).send({
			user_id:userId,
			name:charName,
			description:"Valorous sup"
		})
		let charId = placement.body._id
		let response = await request(app).get(`/characters/byuser/${userId}`)
		console.log(response.body)
		expect(response?.statusCode).toBe(200)
		expect(response.body).toBeInstanceOf(Array)
	})

	it("Should return only one character", async ()=>{
		let placement = await request(app).post(`/characters/${userId}`).send({
			name:charName,
			description:"Valorous sup"
		})
		let charId = placement.body._id
		let response = await request(app).get(`/characters/bycharacter/${charId}`)
		expect(response?.statusCode).toBe(200)
		expect(response.body._id).toStrictEqual(charId)
		expect(response.body.name).toStrictEqual(charName)
	})

})

describe("PUT /characters",()=>{
	let userId = "AAaaAaAaaaaaaaaaaaaaaaaa"
	let charName = "Jhonson"
	let description = "A long one"
	let newDescription = "A small one"
	let charId: string

	it("Should add a character",async () => {
		let response = await request(app).post(`/characters/${userId}`).send({
			user_id: userId,
			name: charName,
			description: description 
		})
		charId = response.body._id
	})

	it("Should modify the characters description",async () => {
		let response = await request(app).put(`/characters/description/${charId}`).send({
			description: newDescription
		})
		expect(response.statusCode).toBe(200)
		expect(response.body.description).toStrictEqual(newDescription)
	})

	it("Should increase the chars strength",async () => {
		let charSearch = await request(app).get(`/characters/bycharacter/${charId}`)
		let currentLevel = charSearch.body.status.level
		let currentStrength = charSearch.body.attributes.strength
		let response = await request(app).put(`/characters/levelup/${charId}`).send({attribute:"strength"})
		expect(response.statusCode).toBe(200)
		expect(response.body.status.level).toEqual(currentLevel + 1)
		expect(response.body.attributes.strength).toEqual(currentStrength + 1)
	})
	
	it("Should take one of the character's life",async () => {
		let charSearch = await request(app).get(`/characters/bycharacter/${charId}`)
		let currentLives = charSearch.body.status.lives
		let response = await request(app).put(`/characters/takelife/${charId}`).send()
		expect(response.statusCode).toBe(200)
		expect(response.body.status.lives).toEqual(currentLives - 1  )
	})
	
	it("Should fail to add mission due to missing mission_id field", async()=>{
		let missionId = "333333333338333333333338"
		let response = await request(app).put(`/characters/achievements/${charId}`).send({missiones_id:missionId})
		expect(response.statusCode).toBe(400)
		expect(response.body.message).toStrictEqual("No field mission_id was sent")
	})
	it("Should add mission id", async() => {
		let missionId = "333333333333333333333333"
		let charSearch = await request(app).get(`/characters/bycharacter/${charId}`)
		let achievements = charSearch.body.achievements 
		expect(achievements).toBeInstanceOf(Array)
		expect(achievements).toHaveLength(0)
		console.log(charSearch.body)
		let response = await request(app).put(`/characters/achievements/${charId}`).send({mission_id:missionId})
		if (response.statusCode != 200){
			console.log(response.body)
		}
		expect(response.statusCode).toBe(200)
		expect(response.body.achievements).toHaveLength(1)
		console.log(response.body.achievements)
		expect(response.body.achievements[0]).toEqual(missionId)
	})

})



describe("DELETE /characters",()=>{
	let userId = "123456789123456789123456"
	let charName = "Milton"
	it("Should delete a newly added character",async () => {
		let placement = await request(app).post(`/characters/${userId}`).send({
			user_id:userId,
			name:charName,
			description:"Valorous sup"
		})
		let charId = placement.body._id
		let attempt = await request(app).delete(`/characters/${charId}`).send()
		expect(attempt.statusCode).toBe(200)
		
	
	})
})