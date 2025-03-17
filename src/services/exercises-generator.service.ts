import { AppDataModel } from './../models/app-data.model';
import { ExerciseModel } from "../models/app-data.model";

export const generateExercises = (data: AppDataModel): ExerciseModel[] => {
    const exercises: ExerciseModel[] = [];

    // Helper function to generate random numbers in a range
    const getRandomNumber = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Pick a random operation based on available flags
    const operations: string[] = [];
    if (data.smallAddSub) operations.push("smallAdd", "smallSub");
    if (data.smallMulDiv) operations.push("smallMul", "smallDiv");
    if (data.largeAddSub) operations.push("largeAdd", "largeSub");
    if (data.largeMulDiv) operations.push("largeMul", "largeDiv");
    if (data.square) operations.push("square");

    // Generate the required number of exercises
    for (let i = 0; i < data.numExer; i++) {
        let exercise: ExerciseModel;
        let num1: number, num2: number, result: number, operation: string;

        if (operations.length === 0) break; // No operations enabled, exit loop

        operation = operations[Math.floor(Math.random() * operations.length)];

        // Generate numbers based on the operation
        switch (operation) {
            case "smallAdd":
                num1 = getRandomNumber(1, 10);
                num2 = getRandomNumber(1, 10);
                result = num1 + num2;
                exercise = {
                    display: `${num1} + ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "smallSub":
                num1 = getRandomNumber(1, 10);
                num2 = getRandomNumber(1, num1); // Ensure non-negative result
                result = num1 - num2;
                exercise = {
                    display: `${num1} - ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "smallMul":
                num1 = getRandomNumber(1, 10);
                num2 = getRandomNumber(1, 10);
                result = num1 * num2;
                exercise = {
                    display: `${num1} × ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "smallDiv":
                num2 = getRandomNumber(1, 10);
                result = getRandomNumber(1, 10);
                num1 = num2 * result; // Ensure exact division
                exercise = {
                    display: `${num1} ÷ ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "largeAdd":
                num1 = getRandomNumber(100, 999);
                num2 = getRandomNumber(100, 999);
                result = num1 + num2;
                exercise = {
                    display: `${num1} + ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "largeSub":
                num1 = getRandomNumber(100, 999);
                num2 = getRandomNumber(100, num1); // Ensure non-negative result
                result = num1 - num2;
                exercise = {
                    display: `${num1} - ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "largeMul":
                num1 = getRandomNumber(10, 99);
                num2 = getRandomNumber(10, 99);
                result = num1 * num2;
                exercise = {
                    display: `${num1} × ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "largeDiv":
                num2 = getRandomNumber(10, 99);
                result = getRandomNumber(10, 99);
                num1 = num2 * result; // Ensure exact division
                exercise = {
                    display: `${num1} ÷ ${num2}`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;

            case "square":
                num1 = getRandomNumber(1, 20);
                result = num1 * num1;
                exercise = {
                    display: `${num1}²`,
                    expectedResult: result,
                    userResult: null,
                    resultCorrect: false
                };
                break;
        }

        // Add the generated exercise to the list
        exercises.push(exercise!);
    }

    return exercises;
};
