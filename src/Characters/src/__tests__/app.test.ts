import app from '../app'
import request from 'supertest'


describe("GET /", () =>{
    it("should", async () => {
        let response = request(app)
        expect(response.get('/').expect(200).then(response => {
            console.log(response.body)
            expect(response.body.message).toEqual("Hello World")
        })).not.toThrow()
    })

})