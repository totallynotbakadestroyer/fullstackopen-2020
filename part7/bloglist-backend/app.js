const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/loggerSettings");
const blogsController = require("./controllers/blogsController");
const usersController = require("./controllers/usersController");
const loginController = require("./controllers/loginController");
const { errorHandler } = require("./utils/errorHandler");
const bodyParser = require("body-parser");

const mongoUri = config.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  logger(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.use("/api", blogsController);
app.use("/api", usersController);
app.use("/api", loginController);

if (process.env.NODE_ENV === "test") {
  const testingController = require("./controllers/testController");
  app.use("/api/testing", testingController);
}

app.use(errorHandler);

module.exports = app;
