const usersController = require("express").Router();
const User = require("../models/UserSchema.js");
const jwtExpress = require("../utils/jwtExpressSettings");

usersController.get("/users", async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

usersController.post("/users", jwtExpress, async (req, res) => {
  if (!req.body.password || req.body.password.length < 3) {
    return res.status(400).json({ error: "password should be at least 3 letters longs" });
  }
  const user = await User(req.body).save();
  res.status(201).json(user);
});

module.exports = usersController;
