import genJWT, { IUser } from "../genJWT";
import verifyJWT from "../verifyJWT";

describe("genJWT and verifyJWT", () => {
  it("encodes and decodes jsonwebtoken", () => {
    const demoUser = { email: "test@gmail.com" };
    const encryptedJWTUser = genJWT(demoUser);

    const decryptedUser = verifyJWT(encryptedJWTUser) as IUser;
    expect(decryptedUser.email).toBe("test@gmail.com");
  });
});
