import { sign } from "jsonwebtoken";

export interface IUser {
  username: string;
}
/**
 * @param username
 * @returns jsonwentoken
 */
export const getRefreshToken = (payload: IUser) => {
  return sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: "90d",
  });
};

export const getAccessToken= (payload: IUser) => {
  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: 60*15,
  });
};
