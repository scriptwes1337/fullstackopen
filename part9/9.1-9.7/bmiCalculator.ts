interface HeightWeightValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): HeightWeightValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (((height / 100) * height) / 100);

  let category: string;

  if (bmi < 16.0) {
    category = "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi < 17.0) {
    category = "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi < 18.5) {
    category = "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    category = "Normal (Healthy weight)";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    category = "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi < 35.0) {
    category = "Obese (Class I)";
  } else if (bmi >= 35.0 && bmi < 40.0) {
    category = "Obese (Class II)";
  } else {
    category = "Obese (Class III)";
  }

  let message: string = `Your BMI is ${bmi} - ${category}`;

  return message;
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
