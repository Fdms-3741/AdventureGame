import { Express } from "express";
import { Request } from "supertest";
import mongoose from "mongoose";
import * as CONFIG from '../defaults'


/** Database initialization steps */
beforeAll(async () => {
    await CONFIG.InitializeDatabase(CONFIG.MONGODB_TEST_ADDRESS);
})

afterAll(async() => {
    await CONFIG.ClearDatabase()
    await CONFIG.CloseDatabase()
})

describe("Basic character manipulation", () =>{
    it("Should work",()=>{expect(true).toBe(true)})
})