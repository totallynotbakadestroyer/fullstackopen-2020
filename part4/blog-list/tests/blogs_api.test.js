const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/BlogSchema");
const helper = require("./test_helper.js");

const api = supertest(app);

describe("/api/blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  test("GET, blogs should be returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("GET, request should return all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("GET, returned blog should have 'id' property instead of '_id'", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
  });
  test("POST, new blog is successfully added", async () => {
    await api
      .post("/api/blogs")
      .send(helper.singleBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("POST, new blog is returned with json after creating", async () => {
    const result = await api.post("/api/blogs").send(helper.singleBlog);
    expect(result.body.author).toBe(helper.singleBlog.author);
    expect(result.body.title).toBe(helper.singleBlog.title);
    expect(result.body.url).toBe(helper.singleBlog.url);
    expect(result.body.likes).toBe(helper.singleBlog.likes);
    expect(result.body.id).toBeDefined();
  });
  test("POST, GET should return all blogs including new one", async () => {
    await api.post("/api/blogs").send(helper.singleBlog);
    const result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length + 1);
  });
  test("POST, returned object should have 'likes' property if blog saved without it", async () => {
    const blogWithoutLikes = {
      title: "TestBlog",
      author: "TestBlog",
      url: "TestBlog",
    };
    const result = await api.post("/api/blogs").send(blogWithoutLikes);
    expect(result.body.likes).toBeDefined();
    expect(result.body.likes).toBe(0);
  });
  test("POST, return error if title is missing", async () => {
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
  test("POST, return error if url is missing", async () => {
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
});
