const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/loggerSettings");
const blogsController = require("./controllers/blogsController");
const usersController = require("./controllers/usersController");
const { errorHandler } = require("./utils/errorHandler");

const mongoUri = config.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(
  logger(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use("/api", blogsController);
app.use("/api", usersController);
app.use(errorHandler);

module.exports = app;
