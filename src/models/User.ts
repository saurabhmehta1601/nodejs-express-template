import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  profile?: {
    name: string;
    gender: Gender;
  };
  comparePassword: (
    password: string,
    cb: (err: any, isMatch: boolean) => void
  ) => boolean; //eslint-disable-line @typescript-eslint/no-explicit-any
};

export const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      test: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: [true, "User with account already exists."],
    },
    password: {
      type: String,
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
        enum: Gender,
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
