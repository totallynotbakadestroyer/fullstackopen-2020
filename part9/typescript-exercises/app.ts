import express from "express";
import { calculateBmi } from "./calculateBmi";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  try {
    const response = calculateBmi(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.json({
      ...req.query,
      response,
    });
  } catch (e) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.get("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((x) => isNaN(Number(x)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const response = exerciseCalculator(target, daily_exercises);
  return res.json(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
