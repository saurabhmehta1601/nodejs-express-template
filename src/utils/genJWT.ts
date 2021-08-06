import { sign } from "jsonwebtoken";

export interface IUser {
  email: string;
}

export default (user: IUser) => {
  return sign(user, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
