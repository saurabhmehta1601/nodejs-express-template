import { Server } from "http";
import supertest from "supertest";
import app from "../../app";
import * as dbHandler from "../../setupTests";

let listener: undefined | Server;

beforeAll(async () => {
  await dbHandler.connect();
  listener = app.listen(4000, () => {
    console.log(">Test running on express server");
  });
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
  listener?.close();
});

describe("POST /auth/register", () => {
  it("register user with username and password", async () => {
    const request = supertest(app);
    const reqBody = { username: "test@1234", password: "password" };
    const res = await request
      .post("/auth/register")
      .set("Content-Type", "application/json")
      .send(reqBody);
    expect(res.status).toBe(201);
    expect(res.body.data.accessToken).toBeDefined();
  });
});
