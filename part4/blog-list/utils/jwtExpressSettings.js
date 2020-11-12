const jwtExpress = require("express-jwt");

const jwt = jwtExpress({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

module.exports = jwt;
