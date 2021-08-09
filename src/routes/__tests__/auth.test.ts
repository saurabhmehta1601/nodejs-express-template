import supertest from "supertest";
import app, { serverListener } from "../../server";
import * as dbHandler from "../../setupTests";

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
  serverListener.close();
});

describe("POST /auth/register", () => {
  it("register user with email and password", async () => {
    const request = supertest(app);
    const reqBody = { email: "test@gmail.com", password: "password" };
    const res = await request
      .post("/auth/register")
      .set("Content-Type", "application/json")
      .send(reqBody);
    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeDefined();
  });
});
