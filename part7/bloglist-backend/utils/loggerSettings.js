const morgan = require("morgan");
morgan.token("req-body", function (req) {
  return JSON.stringify(req.body);
});

module.exports = morgan;
