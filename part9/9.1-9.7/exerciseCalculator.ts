interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  targetDailyHours: number;
  averageDailyHours: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  actualDailyHours: number[],
  targetDailyHours: number
): ExerciseResult => {
  const periodLength = actualDailyHours.length;
  const trainingDays = actualDailyHours.filter((day) => day > 0).length;
  const averageDailyHours =
    actualDailyHours.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / actualDailyHours.length;

  const success = averageDailyHours >= targetDailyHours ? true : false;
  const rating =
    averageDailyHours / targetDailyHours === 1
      ? 3
      : averageDailyHours / targetDailyHours > 0.8
      ? 2
      : 1;

  const ratingDescription =
    rating === 3
      ? "You met your target!"
      : rating === 2
      ? "You're at least 80% of your target!"
      : "You're at least 60% of your target!";

  return {
    periodLength,
    trainingDays,
    averageDailyHours,
    targetDailyHours,
    success,
    rating,
    ratingDescription,
  };
};

interface ExerciseArguments {
  dailyHoursArg: number[];
  targetHoursArg: number;
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (isNaN(Number(process.argv[2])))
    throw new Error(
      "The first number (the target daily hours) is not a number!"
    );

  const targetHoursArg = Number(process.argv[2]);
  const dailyHoursArg = [];

  for (let i = 3; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i]))) {
      throw new Error("One of the daily hours given is not a number!");
    }
    dailyHoursArg.push(Number(process.argv[i]));
  }

  return {
    dailyHoursArg,
    targetHoursArg,
  };
};

try {
  const { dailyHoursArg, targetHoursArg } = parseExerciseArguments(
    process.argv
  );

  console.log(calculateExercises(dailyHoursArg, targetHoursArg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}