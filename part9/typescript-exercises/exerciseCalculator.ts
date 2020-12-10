interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (hours: Array<number>, target: number): Result => {
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
