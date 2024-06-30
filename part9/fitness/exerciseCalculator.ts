export {};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  dailyTargetExerciseHours: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;

  let totalExerciseHours: number = 0;
  dailyExerciseHours.forEach((day) => (totalExerciseHours += day));

  const average = totalExerciseHours / periodLength;
  const success = average >= dailyTargetExerciseHours;

  let rating: number;
  let ratingDescription: string;

  if (average >= dailyTargetExerciseHours) {
    rating = 3;
    ratingDescription = "Excellent!";
  } else if (average >= dailyTargetExerciseHours * 0.5) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You failed badly :(";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTargetExerciseHours,
    average,
  };
};

const parseArguments = (
  args: string[]
): { dailyExerciseHours: number[]; dailyTargetExerciseHours: number } => {
  if (args.length < 4) {
    throw new Error(
      "Not enough arguments. Please provide the target and daily exercise hours."
    );
  }

  const dailyTargetExerciseHours = Number(args[2]);
  if (isNaN(dailyTargetExerciseHours)) {
    throw new Error("Provided target is not a number.");
  }

  const dailyExerciseHours = [];
  for (let i = 3; i < args.length; i++) {
    const hours = Number(args[i]);
    if (isNaN(hours)) {
      throw new Error("Provided daily exercise hour is not a number.");
    }
    dailyExerciseHours.push(hours);
  }

  return {
    dailyExerciseHours,
    dailyTargetExerciseHours,
  };
};

try {
  const { dailyExerciseHours, dailyTargetExerciseHours } = parseArguments(
    process.argv
  );
  console.log(calculateExercises(dailyExerciseHours, dailyTargetExerciseHours));
} catch (error: unknown) {
 if (error instanceof Error) {
   console.error("Error:", error.message);
 } else {
   console.error("An unknown error occurred.");
 }
}