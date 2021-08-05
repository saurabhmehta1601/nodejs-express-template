import mongoose from "mongoose"

const MONGO_URI= process.env.MONGO_URI || 'mongodb://localhost:27017/'

const connectDb = () : Promise<typeof mongoose> => {
    return mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

export default connectDb