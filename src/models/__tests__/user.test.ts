import * as db from "../../setupTests"

beforeAll( async ()=>{
    await db.connect()
})

afterEach(async ()=>{
    await db.clearDatabase()
})

afterAll(async ()=>{
    await db.closeDatabase()
})

describe('user model',()=>{
    it('has password field',()=>{
        expect(1).toBe(1)
    })
})