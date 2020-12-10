import * as process from "process";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseData => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (args.slice(2).every((x) => !isNaN(Number(x)))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map((x) => Number(x)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const exerciseCalculator = (target: number, hours: Array<number>): Result => {
  const setRating = () => {
    const success = average >= target;
    if (success) {
      return { success, rating: 3, ratingDescription: "nice job this week!" };
    } else if (!success && target - average < 1) {
      return {
        success,
        rating: 2,
        ratingDescription: "not too bad but could be better",
      };
    } else {
      return { success, rating: 1, ratingDescription: "try harder next week!" };
    }
  };
  const periodLength = hours.length;
  const trainingDays = hours.filter((x) => x !== 0).length;
  const average =
    hours.reduce((accumulator, number) => accumulator + number) / periodLength;
  const { rating, ratingDescription, success } = setRating();
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, hours));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something bad happened, message: ", e.message);
}
