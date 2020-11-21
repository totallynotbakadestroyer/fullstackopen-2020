const blogsController = require("express").Router();
const Blog = require("../models/BlogSchema");
const jwtExpress = require("../utils/jwtExpressSettings");
const User = require("../models/UserSchema");
const textParser = require("body-parser").text();

blogsController.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  response.json(blogs);
});

blogsController.post("/blogs", jwtExpress, async (request, response) => {
  const blog = new Blog({ ...request.body, creator: request.user.id });
  const result = await blog.save();
  const user = await User.findById(request.user.id).populate("blogs");
  user.blogs = [...user.blogs, blog];
  await user.save();

  response.status(201).json(await result.populate("creator").execPopulate());
});

blogsController.delete("/blogs/:id", jwtExpress, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  console.log(blog);
  if (!blog) {
    response.status(404).json({ error: "not found" });
  }
  if (blog.creator.toString() === request.user.id) {
    await blog.delete();
  } else {
    return response.status(403).json({ error: "access is denied" });
  }
  response.status(204).end();
});

blogsController.put(
  "/blogs/:id",
  jwtExpress,
  async (request, response, next) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    }).populate("creator");
    if (blog) {
      response.json(blog);
    } else {
      next({ name: "NotFound" });
    }
  }
);

blogsController.post(
  "/blogs/:id/comments",
  jwtExpress,
  textParser,
  async (request, response) => {
    if (!request.body) {
      return response.status(400).json({ error: "comment cannot be empty" });
    }
    const blog = await Blog.findById(request.params.id);
    blog.comments = blog.comments.concat(request.body);
    await blog.save();
    response.json(blog);
  }
);

module.exports = blogsController;
