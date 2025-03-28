import { ExerciseModel } from './../models/app-data.model';
import { TrainingModel } from './../models/training.model';
import React, { useState } from "react";
import { NeuralNetwork } from "brain.js";
import trainingJSON from '../training-data.json';
import { generateExercises } from './exercises-generator.service';
import { createAppDataModel } from '../models/app-data.model';

const trainingData: TrainingModel[] = trainingJSON;

// Normalize data (scale down inputs and outputs)
const normalizedData = trainingData.map(({ input, output }) => ({
    input: input.map(x => x / 100),  // Scale numbers
    output: output.map(x => x / 100)   // Scale time to [0-1] seconds
}));

// Initialize Neural Network
const net = new NeuralNetwork();
net.train(normalizedData);

const generatedExercises: ExerciseModel[] = generateExercises(createAppDataModel({
    smallAddSub: true,
    largeAddSub: true,
    smallMulDiv: true,
    largeMulDiv: true,
    square: true,
    numExer: 30
}));

const mapResult = generatedExercises.map(exercise => {

    const result: Float32Array = net.run(exercise.learningModel) as any;
    if (result && result[0]) {
        console.log(exercise.display, result[0])

    }
    return result;
})

console.log(mapResult);

// Function to parse input and predict time
export const handlePredict = (expression: string): number => {
    console.log(expression)
    // Match multiple operations, including addition, subtraction, multiplication, and powers
    const match = expression.match(/(\d+)([\+\-\*\/²³])*([\d\+\-\*\/²³]*)/);
    if (!match) {
        //setTime("Invalid expression");
        return -1;
    }

    // Process the math expression
    const tokens = expression.split(/([+\-*÷²³])/).filter(token => token.trim() !== "");
    let numbers = [];
    let operations = [];

    for (let i = 0; i < tokens.length; i++) {
        if (i % 2 === 0) {
            numbers.push(parseInt(tokens[i]));
        } else {
            let op = 1; // Default: Addition
            if (tokens[i] === "-") op = 2;
            if (tokens[i] === "*") op = 3;
            if (tokens[i] === "÷") op = 4;  // Division
            if (tokens[i] === "²") op = 5;  // Square (we assume only num1 is used for squares)
            if (tokens[i] === "³") op = 6;  // Cube (we assume only num1 is used for cubes)
            operations.push(op);
        }
    }

    // Flatten the expression into an array of numbers and operations
    console.log([...numbers, ...operations])
    const input = [...numbers, ...operations].map(x => x / 100);

    // Predict time (in seconds) based on the input
    console.log(net.run(input));
/*     const output = net.run(input)[0] * 10;  // Scale back to time in seconds
 */    return 1;
};