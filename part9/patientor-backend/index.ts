import express from "express";
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
