import { verify } from "jsonwebtoken";

export default (userToken: string, SECRET: string) => {
  return verify(userToken, SECRET);
};
