import { sign } from "jsonwebtoken";

export interface IUser {
  email: string;
}
/**
 * @param email
 * @returns jsonwentoken
 */
// eslint-disable-next-line
export default (payload: {}) => {
  return sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "6h",
  });
};
