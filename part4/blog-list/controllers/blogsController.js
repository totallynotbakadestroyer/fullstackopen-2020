const blogsController = require("express").Router();
const Blog = require("../models/BlogSchema");
const jwtExpress = require("../utils/jwtExpressSettings");

blogsController.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  response.json(blogs);
});

blogsController.post("/blogs", jwtExpress, async (request, response) => {
  const blog = new Blog({ ...request.body, creator: request.user.id });
  const result = await blog.save();

  response.status(201).json(await result.populate("creator").execPopulate());
});

blogsController.delete("/blogs/:id", jwtExpress, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  console.log(blog);
  if(!blog) {
    response.status(404).json({error: "not found"});
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

module.exports = blogsController;
