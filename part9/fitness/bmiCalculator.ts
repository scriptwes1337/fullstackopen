export {};

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const heightInM = heightInCm / 100;
  const bmi = weightInKg / (heightInM * heightInM);

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  }
  if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  }
  if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range (Healthy)";
  }
  if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  }
  if (bmi >= 30 && bmi <= 34.9) {
    return "Obese (Class 1)";
  }
  if (bmi >= 35 && bmi <= 39.9) {
    return "Obese (Class 2)";
  }
  if (bmi >= 40) {
    return "Obese (Class 3)";
  }
};

const parseArguments = (
  args: string[]
): { heightInCm: number; weightInKg: number } => {
  if (args.length < 4) {
    throw new Error(
      "Not enough arguments. Please provide height in CM and weight in KG."
    );
  }

  const heightInCm = Number(args[2]);
  if (isNaN(heightInCm)) {
    throw new Error("Provided height in CM is not a number.");
  }

  const weightInKg = Number(args[3]);
  if (isNaN(weightInKg)) {
    throw new Error("Provided weight in KG is not a number.");
  }

  return {
    heightInCm,
    weightInKg,
  };
};

try {
  const { heightInCm, weightInKg } = parseArguments(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (error) {
  console.error("Error:", error.message);
}
