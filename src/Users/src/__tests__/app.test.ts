import database from '../utils/database'
import User from '../models/user'
import mongoose from 'mongoose'
import config from '../config'
import request from 'supertest'
import app from '../app'

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

describe("Database connection conditions", ()=>{
	/* Check if something isn't on fire */
	it("Should work",() => {
		expect(true).toBe(true)	
	})
	
	/* Evaluate database connection status, must be 1 for connected */
	it("Should be connected to the database", () => {
		expect(mongoose.connection.readyState).toBe(1)
	})
});

describe("POST /register", () => {
	it("Should return 201", async () =>{
		const response = await request(app)
								.post("/register")
								.send({"username":"player", "password":"1234"})
								.set('Accept', 'application/json')
		console.log(response.text);
		expect(response?.statusCode).toBe(201);
	});

    it("Should not recreate users that already exists", async () => {
		const response = await request(app).post("/register").send({"username":"player", "password":"1234"});
        console.log(response.text);
		expect(response?.statusCode).toBe(201);

        const response2 = await request(app).post("/register").send({"username":"player", "password":"123456"});
        console.log(response2.text);
        expect(response2?.statusCode).toBe(400);
	});

	it("Should fail due to not having username or password", async () => {
		const response = await request(app).post('/register').send({"username":"player"})
		console.log(response.body)
		expect(response?.statusCode).toBe(400)

		const response2 = await request(app).post('/register').send({"password":"1234"})
		console.log(response2.body)
		expect(response2?.statusCode).toBe(400)

		const response3 = await request(app).post('/register').send({"username": null, "password":"1234"})
		console.log(response3.body)
		expect(response3?.statusCode).toBe(400)

		const response4 = await request(app).post('/register').send({"username": "player", "password": null})
		console.log(response4.body)
		expect(response4?.statusCode).toBe(400)
	})
});

describe("POST /login", () => {
	it("Should login", async () => {
		const data = {"username":"player", "password":"1234"}
		const response = await request(app).post("/register").send(data);
        console.log(response.text);
		expect(response?.statusCode).toBe(201);

		const response2 = await request(app).post("/login").send(data);
        console.log(response2.text);
		expect(response2?.statusCode).toBe(200);
	})

	it("Should unauthorize if password is wrong", async () => {
		const response = await request(app).post("/register").send({"username":"player", "password":"1234"});
        console.log(response.text);
		expect(response?.statusCode).toBe(201);

		const response2 = await request(app).post("/login").send({"username":"player", "password":"12345"});
        console.log(response2.text);
		expect(response2?.statusCode).toBe(401);
	})
});