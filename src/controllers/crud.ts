import mongoose from "mongoose"

export const createOne = async (model: mongoose.Model<any> , payload: any ) : Promise<any> =>{
    return model.create(payload)
}

export const findOne = async (model: mongoose.Model<any> , id: mongoose.Schema.Types.ObjectId   ) : Promise<any> =>{
    return model.findById(id)
}