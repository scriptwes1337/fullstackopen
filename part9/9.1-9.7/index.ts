import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

  const bmi = calculateBmi(height, weight)

  return res
    .json({
      weight,
      height,
      bmi
    })
    .status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
