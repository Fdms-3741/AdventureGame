import { MONGODB_TEST_ADDRESS } from '../defaults'
import request from 'supertest'
import app from '../app'
import  mongoose from 'mongoose'

async function Connect(){
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

describe("GET /", () => {
	
	it("Should connect", async () => {
		let response = await request(app).get("/")
		expect(response?.statusCode).toBe(200)
		expect(response?.text).toStrictEqual("Hello there")
	})

})


describe("GET /character", ()=>{
	it("Should return 200",async () => {
		let response = await request(app).get("/character").send({"user_id":3,"name":"fidget"})
		console.log(response.text)
		expect(response?.statusCode).toBe(200)
	})
})

describe("POST /character", () => {
	it("Should return 200", async () =>{
		let response = await request(app).post("/character").send({"user_id":3,"name":"fidget"})
		console.log(response.text)
		expect(response?.statusCode).toBe(200)
	})

	it("Should fail due to not having name", async () => {
		let response = await request(app).post('/character').send({"user_id":12})
		console.log(response.body)
		expect(response?.statusCode).toBe(400)
		expect(response?.body.message).toStrictEqual("Data failed to match schema.")
	})
})
