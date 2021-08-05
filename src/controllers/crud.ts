import mongoose from "mongoose"

/**
 * @param model - Mongoose model
 * @param payload - payload
 * */
export const createOne = async (model: mongoose.Model<any> , payload: any ) : Promise<any> =>{
    return model.create(payload)
}

/**
 * @param model - Mongoose model
 * @param id - document ObjectId
 * */
export const findOne = async (model: mongoose.Model<any> , id: mongoose.Schema.Types.ObjectId   ) : Promise<any> =>{
    return model.findById(id).lean().exec()
}

/**
 * @param model - Mongoose model
 * @param id - Document ObjectId 
 * @param payload - payload
 * */
export const updateOne= async (model: mongoose.Model<any> , id: mongoose.Schema.Types.ObjectId, payload: any   ) : Promise<any> =>{
    return model.findByIdAndUpdate(id,payload,{ new: true})
}


/**
 * @param model - Mongoose model
 * @param id - Document ObjectId 
 * */
export const deleteOne= async (model: mongoose.Model<any> , id: mongoose.Schema.Types.ObjectId   ) : Promise<any> =>{
    return model.findByIdAndDelete(id).lean().exec()
}