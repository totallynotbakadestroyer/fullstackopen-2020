const mongoose = require("mongoose");
const helper = require("./test_helper");
const User = require("../models/UserSchema");
const supertest = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});
afterAll(() => {
  mongoose.connection.close();
});

describe("logging in process", () => {
  test("should return 200 if user exists and password is right", async () => {
    await api
      .post("/api/login")
      .send({ username: "Test", password: "YesMan" })
      .expect(200);
  });
  test("should return JWT if user exists and password is right", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "Test", password: "YesMan" });

    expect(result.header).toHaveProperty("authorization");
    expect(
      jwt.verify(result.header.authorization.split(" ")[1], process.env.SECRET)
    ).toBeTruthy();
  });
  test("JWT should contain user id and username", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "Test", password: "YesMan" });

    const jwtPayload = jwt.decode(result.header.authorization.split(" ")[1]);
    expect(jwtPayload).toHaveProperty("username");
    expect(jwtPayload).toHaveProperty("id");
  });
});
