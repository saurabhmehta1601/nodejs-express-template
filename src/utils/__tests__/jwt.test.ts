import  { IUser, accessToken , refreshToken } from "../genJWT";
import verifyJWT from "../verifyJWT";

describe("genJWT and verifyJWT", () => {
  it("encodes and decodes refreshToken", () => {
    const demoUser = { username: "test" };
    const encryptedJWTUser = refreshToken(demoUser);

    const decryptedUser = verifyJWT(encryptedJWTUser, process.env.JWT_REFRESH_TOKEN_SECRET as string  ) as IUser;
    expect(decryptedUser.username).toBe("test");
  });
  
  it("encodes and decodes accessToken", () => {
    const demoUser = { username: "test" };
    const encryptedJWTUser = accessToken(demoUser);

    const decryptedUser = verifyJWT(encryptedJWTUser,process.env.JWT_REFRESH_TOKEN_SECRET as string) as IUser;
    expect(decryptedUser.username).toBe("test");
  });
});
