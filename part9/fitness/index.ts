import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
