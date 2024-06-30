import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res
      .status(400)
      .json({ error: "Height and weight parameters required" });
  }

  const heightInCm = Number(height);
  const weightInKg = Number(weight);

  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    return res.status(400).json({ error: "Malformed parameters" });
  }

  const bmi = calculateBmi(heightInCm, weightInKg);
  return res.status(200).json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN) ||
    isNaN(target)
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
