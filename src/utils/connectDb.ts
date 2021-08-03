import mongoose from "mongoose"

const connectDb = () : Promise<typeof mongoose> => {
    return mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

export default connectDb