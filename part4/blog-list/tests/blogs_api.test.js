const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/BlogSchema");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
afterAll(() => {
  mongoose.connection.close();
});

describe("when there is initially some blogs saved", () => {
  test("blogs should be returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("request should return all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("returned blogs should have 'id' property instead of '_id'", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.every((x) => "id" in x && !("_id" in x))).toBeTruthy();
  });
});

describe("addition of a new blog", () => {
  test("succeeds with correct data", async () => {
    await api
      .post("/api/blogs")
      .send(helper.singleBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("creating new blog should return this blog", async () => {
    const result = await api.post("/api/blogs").send(helper.singleBlog);
    expect(result.body.author).toBe(helper.singleBlog.author);
    expect(result.body.title).toBe(helper.singleBlog.title);
    expect(result.body.url).toBe(helper.singleBlog.url);
    expect(result.body.likes).toBe(helper.singleBlog.likes);
    expect(result.body.id).toBeDefined();
  });
  test("new blog should return with all previously added blogs", async () => {
    await api.post("/api/blogs").send(helper.singleBlog);
    const result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(result.body.map((blog) => blog.url)).toContain(
      helper.singleBlog.url
    );
  });
  test("should return error if title is missing", async () => {
    const blogWithoutTitle = {
      author: "TestBlog",
      url: "TestBlog",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(blogWithoutTitle)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("should return error if url is missing", async () => {
    const blogWithoutUrl = {
      title: "TestBlog",
      author: "TestBlog",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(blogWithoutUrl)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("returned object should have 'likes' property if blog saved without it", async () => {
    const blogWithoutLikes = {
      title: "TestBlog",
      author: "TestBlog",
      url: "TestBlog",
    };
    const result = await api.post("/api/blogs").send(blogWithoutLikes);
    expect(result.body.likes).toBeDefined();
    expect(result.body.likes).toBe(0);
  });
});
