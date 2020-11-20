const loginController = require("express").Router();
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginController.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).select("+password");
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.password);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }
  const tokenPayload = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(tokenPayload, process.env.SECRET);

  res.status(200).header("Authorization", `Bearer ${token}`).json({ token, username: user.username, name: user.name });
});

module.exports = loginController;
