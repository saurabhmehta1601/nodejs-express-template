import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";


export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
  profile?: {
    name: string;
    gender: ["Male","Female","Other"];
  };
  comparePassword: (
    password: string,
    cb: (err: any, isMatch: boolean) => void
  ) => boolean; //eslint-disable-line @typescript-eslint/no-explicit-any
};

export const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      trim: true, 
      minLength: [8 , "Username should be at least 8 characters long."], 
      required: true,
      unique: [true, "User with account already exists."],
    },
    password: {
      type: String,
      trim: true, 
      minLength: [8 , "Password should be at least 8 characters long."], 
      required: true,
    },
    profile: {
      name: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
        enum: ["Male","Female","Other"],
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function save(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err: Error | undefined, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error | undefined, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

export default model<UserDocument>("User", userSchema);
