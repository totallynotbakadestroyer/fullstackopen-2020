import express from "express";
const app = express();
const cors = require("cors");
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
