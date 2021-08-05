import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";

enum Gender {Male,Female,Other} 

export type UserDocument = mongoose.Document & {
  email: string,
  password: string,
  profile? : {
    name:string,
    gender:Gender,
    photoURL: string 
  },
  comparePassword:(password:string, cb: (err: any, isMatch:boolean) => void ) => boolean //eslint-disable-line @typescript-eslint/no-explicit-any
}
const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "User with account already exists."],
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      name: {
        type: String,
        required: false
      },
      gender: {
        type: String,
        required: false, 
        enum: Gender,
      },
    photoURL: {
        type: String,
        required: false
      }
  }}, { timestamps: true }
);

userSchema.pre("save", function save(next) {
  if (!this.isModified("password")) {
    return next();
  }
    bcrypt.hash(this.password, 10 , (err: Error | undefined, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });


export default model<UserDocument>("User", userSchema);
