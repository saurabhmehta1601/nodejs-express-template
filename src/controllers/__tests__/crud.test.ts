import User from "../../models/User"
import * as dbHandler from "../../setupTests"
import { createOne, deleteOne, findOne, updateOne } from "../crud"

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
        expect(doc.email).toBe("test@gmail.com")
    })
    it('deletes doc with given id',async ()=>{

        const doc = await createOne(User,{
            email:"test@gmail.com",
            password:"test1234"
        })

        await deleteOne(User,doc._id)
        const fetchedDoc = await findOne(User,doc._id)
        expect(fetchedDoc).toBeNull()
    })

    it('update doc with given id to given payload',async ()=>{

        const doc = await createOne(User,{
            email:"test@gmail.com",
            password:"test1234"
        })

        const updatedDoc = await updateOne(User,doc._id,{email:"changed@gmail.com"})

        expect(updatedDoc.email).toBe('changed@gmail.com')
    })
})