import { sign } from "jsonwebtoken";

export interface IUser {
  username: string;
}
/**
 * @param username
 * @returns jsonwentoken
 */
// eslint-disable-next-line
export const refreshToken = (payload: {}) => {
  return sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: "90d",
  });
};

export const accessToken= (payload: {}) => {
  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: 60*15,
  });
};
