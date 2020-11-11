const blogsController = require("express").Router();
const Blog = require("../models/BlogSchema");

blogsController.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  response.json(blogs);
});

blogsController.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();

  response.status(201).json(result);
});

blogsController.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsController.put("/blogs/:id", async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (blog) {
    response.json(blog);
  } else {
    next({ name: "NotFound" });
  }
});

module.exports = blogsController;
