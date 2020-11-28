const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  username: { type: String, unique: true, minLength: 4, required: true },
  password: { type: String, required: true },
  favoriteGenre: { type: String, required: true },
});

schema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", schema);
