import { TrainingModel } from './../models/training.model';
import { NeuralNetwork } from "brain.js";
import trainingJSON from '../training-data.json';
import {
    generateCube, generateLargeAdd, generateLargeDiv, generateLargeMul,
    generateLargeSub, generateSmallAdd, generateSmallDiv, generateSmallMul,
    generateSmallSub, generateSquare
} from './exercises-generator.service';
import { INeuralNetworkData } from 'brain.js/dist/neural-network';

const trainingData: TrainingModel[] = trainingJSON;

// Normalize inputs and outputs (scale to 0-1, just to make them comparable)
const normalizedData = trainingData.map(({ input, output }) => {
    return ({
        input: [input[0] / 1000, input[1] / 1000, 0, input[2], 0, 0, 0, 0],
        output: output.map(x => x / 100) // Scale down outputs for easier training
    })
});

// Generate comparison dataset, this helps to fall back to an average in case predictions are weird
const comparisonData: { [key: number]: number[][] | number } = {
    1: [...Array(30)].map(() => generateSmallAdd()).map(e => e.learningModel)
        .concat([...Array(30)].map(() => generateLargeAdd()).map(e => e.learningModel)),
    2: [...Array(30)].map(() => generateSmallSub()).map(e => e.learningModel)
        .concat([...Array(30)].map(() => generateLargeSub()).map(e => e.learningModel)),
    3: [...Array(30)].map(() => generateSmallMul()).map(e => e.learningModel)
        .concat([...Array(30)].map(() => generateLargeMul()).map(e => e.learningModel)),
    4: [...Array(30)].map(() => generateSmallDiv()).map(e => e.learningModel)
        .concat([...Array(30)].map(() => generateLargeDiv()).map(e => e.learningModel)),
    5: [...Array(30)].map(() => generateSquare()).map(e => e.learningModel),
    6: [...Array(30)].map(() => generateCube()).map(e => e.learningModel)
};

// Init the network here. A neural network is set up with layers 16 and 12. These numbers can be adjusted.
let net: NeuralNetwork<INeuralNetworkData, INeuralNetworkData>; // These types may need to be changed based on the data

let neuralNetworkReady = false;
do {
    neuralNetworkReady = true;
    // Initialize the Neural Network with more complexity (hidden layers 16 and 12)
    net = new NeuralNetwork({
        hiddenLayers: [16, 12],
        learningRate: 0.05,
        activation: "relu" // ReLU activation to introduce non-linearity
    });

    // Train the network with the normalized data, 2000 iterations
    net.train(normalizedData, {
        iterations: 2000,
    });


    // Median function to smooth out results (avoiding outliers)
    const median = (numbers: number[]): number => {
        const sorted = Array.from(numbers).sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[middle - 1] + sorted[middle]) / 2
            : sorted[middle];
    };

    // Run comparison data through the network and calculate median durations
    for (let i = 1; i <= 6; i++) {
        const data: number[][] | number = comparisonData[i];
        const result = (data as number[][]).map((entry: number[]) => {
            const normPreparedEntry = [entry[0] / 1000, entry[1] / 1000, 0, entry[2], 0, 0, 0, 0];
            const result: Float32Array = net.run(normPreparedEntry) as any;
            return Number(result[0]);
        });
        if (median(result) == 0) { // Break everything if output is zero (bad case)
            neuralNetworkReady = false;
            break;
        }
        comparisonData[i] = median(result); // store median prediction (normalized)
    }


} while (neuralNetworkReady === false);

console.log(comparisonData)

export const handlePredict = (learningModelInput: number[]): number => {
    const normPreparedEntry = [learningModelInput[0] / 1000, learningModelInput[1] / 1000, 0, learningModelInput[2], 0, 0, 0, 0];

    // Retry prediction if zero values are returned (in case something went wrong)
    let result: Float32Array;
    do {
        result = net.run(normPreparedEntry) as any;
    } while (Number(result[0]) === 0);

    const predictedTime = Math.max(1, Number(result[0]) * 100); // Ensure a minimum of 1ms to avoid weird results
    const averageTime = Math.max(1, (comparisonData[learningModelInput[2]] as number) * 100); // Same here

    // Calculate how many times larger the prediction is than the average
    const ratio = predictedTime / averageTime;

    // Dynamic weighting for predictions:
    // - When prediction is up to 3x average: 70-90% weight
    // - When prediction is 3-10x average: 50-70% weight
    // - When prediction >10x average: 30% weight (min)
    let predictionWeight = 0.7; // base 70%
    if (ratio > 3 && ratio <= 10) {
        predictionWeight = 0.7 - (0.2 * (ratio - 3) / 7); // scales down from 70% to 50%
    } else if (ratio > 10) {
        predictionWeight = 0.3; // minimum 30%
    }

    // Calculate final time (weighted average of prediction and average)
    const finalTime = (predictedTime * predictionWeight) + (averageTime * (1 - predictionWeight));

    console.log(`Average time: ${averageTime.toFixed(2)}ms`);
    console.log(`Predicted time: ${predictedTime.toFixed(2)}ms`);
    console.log(`Final estimated time: ${finalTime.toFixed(2)}ms`);
    console.log(`Prediction weight: ${(predictionWeight * 100).toFixed(0)}%`);
    console.log(`Prediction ratio: ${ratio.toFixed(2)}x`);

    return finalTime;
};
