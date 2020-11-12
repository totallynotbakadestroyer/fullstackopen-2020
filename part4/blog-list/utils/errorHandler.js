const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "wrong type of id" });
  }
  if (error.name === "ContentMissing") {
    return res.status(400).json({ error: "content missing" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "NotFound") {
    return res.status(404).send({ error: "not found" });
  }
  if (error.name === "UnauthorizedError") {
    return res.status(401).send({ error: "authorization is required" });
  }

  next(error);
};

module.exports = { errorHandler };
