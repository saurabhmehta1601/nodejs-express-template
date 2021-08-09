import { sign } from "jsonwebtoken";

export interface IUser {
  email: string;
}
/**
 * @param email 
 * @returns jsonwentoken
 */
export default (payload : {}) => { // eslint-disable-line
  return sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '6h',
  });
};
