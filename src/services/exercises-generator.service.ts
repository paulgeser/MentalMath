import { AppDataModel } from './../models/app-data.model';
import { ExerciseModel } from "../models/app-data.model";

const getRandomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/* const generateSmallAddSub = (): ExerciseModel => {
    let num1 = getRandomNumber(20, 100); // Larger number
    let num2 = getRandomNumber(1, 10);   // Smaller numbers
    let num3 = getRandomNumber(1, 10);

    // Ensure that the numbers are not the same
    while (num1 === num2 || num1 === num3 || num2 === num3) {
        num2 = getRandomNumber(1, 10);
        num3 = getRandomNumber(1, 10);
    }

    const operationOrder = Math.random() > 0.5 ? [`${num1} - ${num2} + ${num3}`, num1 - num2 + num3] : [`${num1} + ${num2} - ${num3}`, num1 + num2 - num3];
    return { display: operationOrder[0] as string, expectedResult: operationOrder[1] as number, userResult: null, resultCorrect: false };
}; */

/* const generateSmallMulMultiple = (): ExerciseModel => {
    const numNumbers = getRandomNumber(2, 4);  // Number of terms between 2 and 4
    let nums: number[] = [];
    let display = '';
    let expectedResult = 1;

    // Generate numbers, ensuring no duplicates
    while (nums.length < numNumbers) {
        const num = getRandomNumber(1, 12); // Numbers no larger than 12
        if (!nums.includes(num)) {
            nums.push(num);
            display += `${num}${nums.length < numNumbers ? ' × ' : ''}`;
            expectedResult *= num;
        }
    }

    return { display, expectedResult, userResult: null, resultCorrect: false };
};
 */
export const generateSmallAdd = (): ExerciseModel => {
    const num1 = getRandomNumber(5, 100);
    const num2 = getRandomNumber(5, 100);
    return {
        display: `${num1} + ${num2}`, expectedResult: num1 + num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 1],
        timeElapsed: -1
    };
};

export const generateSmallSub = (): ExerciseModel => {
    const num1 = getRandomNumber(5, 100);
    const num2 = getRandomNumber(5, 100);
    return {
        display: `${num1} - ${num2}`, expectedResult: num1 - num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 2],
        timeElapsed: -1
    };
};

export const generateSmallMul = (): ExerciseModel => {
    const num1 = getRandomNumber(1, 15);
    const num2 = getRandomNumber(4, 30);
    return {
        display: `${num1} * ${num2}`, expectedResult: num1 * num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 3],
        timeElapsed: -1
    };
};

export const generateSmallDiv = (): ExerciseModel => {
    const num2 = getRandomNumber(1, 10);
    const result = getRandomNumber(1, 10);
    const num1 = num2 * result;
    return {
        display: `${num1} ÷ ${num2}`, expectedResult: result, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 4],
        timeElapsed: -1
    };
};

export const generateLargeAdd = (): ExerciseModel => {
    const num1 = getRandomNumber(100, 999);
    const num2 = getRandomNumber(100, 999);
    return {
        display: `${num1} + ${num2}`, expectedResult: num1 + num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 1],
        timeElapsed: -1
    };
};

export const generateLargeSub = (): ExerciseModel => {
    const num1 = getRandomNumber(100, 999);
    const num2 = getRandomNumber(100, num1);
    return {
        display: `${num1} - ${num2}`, expectedResult: num1 - num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 2],
        timeElapsed: -1
    };
};

export const generateLargeMul = (): ExerciseModel => {
    const num1 = getRandomNumber(10, 99);
    const num2 = getRandomNumber(10, 99);
    return {
        display: `${num1} * ${num2}`, expectedResult: num1 * num2, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 3],
        timeElapsed: -1
    };
};

export const generateLargeDiv = (): ExerciseModel => {
    const num2 = getRandomNumber(10, 99);
    const result = getRandomNumber(10, 99);
    const num1 = num2 * result;
    return {
        display: `${num1} ÷ ${num2}`, expectedResult: result, userResult: null, resultCorrect: false,
        learningModel: [num1, num2, 4],
        timeElapsed: -1
    };
};

export const generateSquare = (): ExerciseModel => {
    const num1 = getRandomNumber(2, 30);
    return {
        display: `${num1}²`, expectedResult: num1 * num1, userResult: null, resultCorrect: false,
        learningModel: [num1, 0.1, 5],
        timeElapsed: -1
    };
};

export const generateCube = (): ExerciseModel => {
    const num1 = getRandomNumber(2, 10);
    return {
        display: `${num1}³`, expectedResult: num1 * num1 * num1, userResult: null, resultCorrect: false,
        learningModel: [num1, 0.1, 6],
        timeElapsed: -1
    };

};

// Modify the generateExercises function to include the new exercises
export const generateExercises = (data: AppDataModel): ExerciseModel[] => {
    const exercises: ExerciseModel[] = [];
    const operations: { [key: string]: () => ExerciseModel } = {};

    if (data.smallAddSub) {
/*         operations["smallAddSub"] = generateSmallAddSub;
 */        operations["smallAdd"] = generateSmallAdd;
        operations["smallSub"] = generateSmallSub;
    }
    if (data.smallMulDiv) {
        operations["smallMul"] = generateSmallMul;
/*         operations["smallMulMultiple"] = generateSmallMulMultiple;
 */        operations["smallDiv"] = generateSmallDiv;
    }
    if (data.largeAddSub) {
        operations["largeAdd"] = generateLargeAdd;
        operations["largeSub"] = generateLargeSub;
    }
    if (data.largeMulDiv) {
        operations["largeMul"] = generateLargeMul;
        operations["largeDiv"] = generateLargeDiv;
    }
    if (data.square) {
        operations["square"] = generateSquare;
        operations["cube"] = generateCube;
    }

    const operationKeys = Object.keys(operations);
    if (operationKeys.length === 0) return exercises;

    for (let i = 0; i < data.numExer; i++) {
        const operation = operationKeys[Math.floor(Math.random() * operationKeys.length)];
        exercises.push(operations[operation]());
    }

    return exercises;
};

