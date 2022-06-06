import {app, MongoDBAddress} from '../app'
import request from 'supertest'
import CharacterDatabase from '../database'

/* Preparation functions that have to appear with every test made */
/* Those functions wait for the connection to be made before actually starting the tests */
/* ensures database connection was made and is working */
beforeAll( async () => CharacterDatabase.Connect(MongoDBAddress) )

/* Deletes contents from database each time a test is made */
afterEach( async () => CharacterDatabase.ClearDatabase() )

/* Closes connection after testing is done */
afterAll( async () => CharacterDatabase.Close() )

describe("GET /", () =>{

    it("should return 200", async () => {
        let response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })

    it("Should send JSON object with message object", async ()=>{
        let response = await request(app).get('/')
        expect(response.text)
    })

})