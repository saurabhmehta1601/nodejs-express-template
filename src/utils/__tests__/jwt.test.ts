import genJWT, { IUser } from "../genJWT";
import verifyJWT from "../verifyJWT";

describe("genJWT", () => {
  it("generates jsonwebtoken", () => {
    const demoUser = { email: "test@gmail.com" };
    const encryptedJWTUser = genJWT(demoUser);

    const decryptedUser = verifyJWT(encryptedJWTUser) as IUser;
    expect(decryptedUser.email).toBe("test@gmail.com"); //  @ts-ignore
  });
});
