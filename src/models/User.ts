import  { model, Schema } from "mongoose"

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"User with account already exists."]
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        name:{
            type:String
        },
        gender:{
            type:String,
            enum:['Male','Female','Other']
        }
    }
},{timestamps: true})

export default model('User',userSchema)