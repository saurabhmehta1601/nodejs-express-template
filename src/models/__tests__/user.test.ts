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
    username: "test@1234",
    password: "test1234",
    profile: {
      gender: "Male",
      name: "test@1234",
    },
  };

  it("hashes the password field on user ", async () => {
    const newUser = await createOne(User, testUser);
    expect(newUser.password).not.toBe(testUser.password);
  });

  it(" does not create user with duplicate usernameame", async () => {
    let err;
    try {
      await createOne(User, testUser);
      await createOne(User, {
        username: "test@1234",
        password: "password",
      });
    } catch (error) {
      err = error;
    }
    expect(err).not.toBeUndefined();
  });

  it("successfully creates and fetches user ", async () => {
    const newUser = await createOne(User, testUser);
    const foundUser = await findOne(User, newUser._id);
    expect(foundUser.username).toBe("test@1234");
  });

  it("do not create user  with username length less than 8", async () => {
    let err = undefined;
    try {
      await createOne(User, { username: "test", password: "test1234" });
    } catch (e) {
      err = e;
    }

    expect(err).not.toBeUndefined();
  });

  it("do not create user  with password length less than 8", async () => {
    let err = undefined;
    try {
      await createOne(User, { username: "test@1234", password: "test" });
    } catch (e) {
      err = e;
    }

    expect(err).not.toBeUndefined();
  });
});
