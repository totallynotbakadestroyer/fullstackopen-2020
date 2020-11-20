const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/UserSchema");
const helper = require("./test_helper.js");
const bcrypt = require("bcrypt");

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
describe("when there is initially created users", () => {
  test("users should be returned as json with 200 status code", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all users should be returned", async () => {
    const result = await api.get("/api/users");
    expect(result.body).toHaveLength(helper.initialUsers.length);
  });
  test("users should have 'id' key instead of '_id'", async () => {
    const result = await api.get("/api/users");
    expect(result.body.every((x) => "id" in x && !("_id" in x))).toBeTruthy();
  });
  test("all users should not have password property by default", async () => {
    const result = await api.get("/api/users");
    expect(result.body.every((x) => !("password" in x)));
  });
});
describe("when user is created", () => {
  test("user should be created successfully with fresh credentials and should be returned as json with 201", async () => {
    await api
      .post("/api/users")
      .send(helper.newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("user's password should be hidden by default", async () => {
    const result = await api.post("/api/users").send(helper.newUser);
    expect(result.body).not.toHaveProperty("password");
  });
  test("user's password should be encrypted", async () => {
    const result = await api.post("/api/users").send(helper.newUser);
    const createdUser = await User.findById(result.body.id).select("+password");
    const passwordsSame = await bcrypt.compare(
      helper.newUser.password,
      createdUser.password
    );
    expect(passwordsSame).toBeTruthy();
  });
  test("should return 400 if password is less than 3 letters long", async () => {
    const wrongPasswordUser = {
      name: "wrong",
      username: "wrong",
      password: "wr",
    };
    await api.post("/api/users").send(wrongPasswordUser).expect(400);
  });
  test("should return 400 if username doesn't fit requirements", async () => {
    const wrongUsernameUser = {
      name: "wrong",
      username: "wr",
      password: "wrong",
    };
    await api.post("/api/users").send(wrongUsernameUser).expect(400);
  });
  test("should return 400 if user with that username already exists", async () => {
    await api.post("/api/users").send(helper.initialUsers[0]).expect(400);
  });
});
