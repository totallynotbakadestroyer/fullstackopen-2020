const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  born: {
    type: Number,
  },
});

schema.virtual("bookCount").get(function () {
  return this.books.length;
});

// Ensure virtual fields are serialised.
schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Author", schema);
