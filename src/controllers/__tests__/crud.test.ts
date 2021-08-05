import User from "../../models/User"
import * as dbHandler from "../../setupTests"
import { createOne, findOne } from "../crud"

beforeAll( async ()=>{
    await dbHandler.connect()
})

afterEach(async ()=>{
    await dbHandler.clearDatabase()
})

afterAll(async ()=>{
    await dbHandler.closeDatabase()
})

describe('crud controller',()=>{
    it('creates single document having required fields on schema', async()=>{
        const doc = await createOne(User,{
            email:"test@gmail.com",
            password:"test1234"
        })
        const fetchedDoc = await findOne(User,doc._id)
        expect(fetchedDoc.email).toBe("test@gmail.com")

    })
})