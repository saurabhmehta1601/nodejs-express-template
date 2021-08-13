import { verify } from "jsonwebtoken";

export default (userToken: string) => {
  return verify(userToken, process.env.JWT_SECRET_KEY as string);
};
