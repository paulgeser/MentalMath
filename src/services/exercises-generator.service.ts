import { AppDataModel } from './../models/app-data.model';
import { ExerciseModel } from "../models/app-data.model";

const getRandomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateSmallAdd = (): ExerciseModel => {
    const num1 = getRandomNumber(5, 100);
    const num2 = getRandomNumber(5, 100);
    return { display: `${num1} + ${num2}`, expectedResult: num1 + num2, userResult: null, resultCorrect: false };
};

const generateSmallSub = (): ExerciseModel => {
    const num1 = getRandomNumber(5, 100);
    const num2 = getRandomNumber(5, 100);
    return { display: `${num1} - ${num2}`, expectedResult: num1 - num2, userResult: null, resultCorrect: false };
};

const generateSmallMul = (): ExerciseModel => {
    const num1 = getRandomNumber(1, 15);
    const num2 = getRandomNumber(4, 30);
    return { display: `${num1} × ${num2}`, expectedResult: num1 * num2, userResult: null, resultCorrect: false };
};

const generateSmallDiv = (): ExerciseModel => {
    const num2 = getRandomNumber(1, 10);
    const result = getRandomNumber(1, 10);
    const num1 = num2 * result;
    return { display: `${num1} ÷ ${num2}`, expectedResult: result, userResult: null, resultCorrect: false };
};

const generateLargeAdd = (): ExerciseModel => {
    const num1 = getRandomNumber(100, 999);
    const num2 = getRandomNumber(100, 999);
    return { display: `${num1} + ${num2}`, expectedResult: num1 + num2, userResult: null, resultCorrect: false };
};

const generateLargeSub = (): ExerciseModel => {
    const num1 = getRandomNumber(100, 999);
    const num2 = getRandomNumber(100, num1);
    return { display: `${num1} - ${num2}`, expectedResult: num1 - num2, userResult: null, resultCorrect: false };
};

const generateLargeMul = (): ExerciseModel => {
    const num1 = getRandomNumber(10, 99);
    const num2 = getRandomNumber(10, 99);
    return { display: `${num1} × ${num2}`, expectedResult: num1 * num2, userResult: null, resultCorrect: false };
};

const generateLargeDiv = (): ExerciseModel => {
    const num2 = getRandomNumber(10, 99);
    const result = getRandomNumber(10, 99);
    const num1 = num2 * result;
    return { display: `${num1} ÷ ${num2}`, expectedResult: result, userResult: null, resultCorrect: false };
};

const generateSquare = (): ExerciseModel => {
    const randomNum = getRandomNumber(0, 1);
    if (randomNum === 0) {
        const num1 = getRandomNumber(2, 10);
        return { display: `${num1}³`, expectedResult: num1 * num1 * num1, userResult: null, resultCorrect: false };
    } else {

        const num1 = getRandomNumber(2, 25);
        return { display: `${num1}²`, expectedResult: num1 * num1, userResult: null, resultCorrect: false };
    }
};

export const generateExercises = (data: AppDataModel): ExerciseModel[] => {
    const exercises: ExerciseModel[] = [];
    const operations: { [key: string]: () => ExerciseModel } = {};

    if (data.smallAddSub) {
        operations["smallAdd"] = generateSmallAdd;
        operations["smallSub"] = generateSmallSub;
    }
    if (data.smallMulDiv) {
        operations["smallMul"] = generateSmallMul;
        operations["smallDiv"] = generateSmallDiv;
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
    }

    const operationKeys = Object.keys(operations);
    if (operationKeys.length === 0) return exercises;

    for (let i = 0; i < data.numExer; i++) {
        const operation = operationKeys[Math.floor(Math.random() * operationKeys.length)];
        exercises.push(operations[operation]());
    }

    return exercises;
};
