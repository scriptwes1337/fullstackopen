import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query["height"]);
  const weight: number = Number(req.query["weight"]);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: "malformed parameters",
    });
  }

  const bmi = calculateBmi(height, weight);

  return res
    .json({
      weight,
      height,
      bmi,
    })
    .status(200);
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
