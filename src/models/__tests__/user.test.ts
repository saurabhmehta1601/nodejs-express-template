import { createOne, findOne } from "../../controllers/crud";
import * as dbHandler from "../../setupTests";
import User from "../User";

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe("user model", () => {
  const testUser = {
    email: "test@gmail.com",
    password: "test1234",
    profile: {
      gender: "Male",
      name: "test",
    },
  };

  it("hashes the password field on user ", async () => {
    const newUser = await createOne(User, testUser);
    expect(newUser.password).not.toBe(testUser.password);
  });

  it(" does not create user with duplicate email", async () => {
    let err;
    try {
      await createOne(User, testUser);
      await createOne(User, { email: "test@gmail.com", password: "password" });
    } catch (error) {
      err = error;
    }
    expect(err).not.toBeUndefined();
  });

  it("successfully creates and fetches user ", async () => {
    const newUser = await createOne(User, testUser);
    const foundUser = await findOne(User, newUser._id);
    expect(foundUser.email).toBe("test@gmail.com");
  });
});
