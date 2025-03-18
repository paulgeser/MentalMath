import React, { useEffect, useState } from 'react';
import { AppStages } from '../enum/stages.enum';
import { AppDataModel, ExerciseModel } from '../models/app-data.model';
import { Button } from '@mui/material';
import './exercise.component.css';

type Props = {
    setState: React.Dispatch<React.SetStateAction<AppStages>>;
    data: AppDataModel;
    setData: React.Dispatch<React.SetStateAction<AppDataModel>>;
};

export const Exercise: React.FC<Props> = ({ setState, data, setData }) => {

    const [currentExercise, setCurrentExercise] = useState<ExerciseModel | null>(null);
    const [exIndex, setExIndex] = useState<number>(0);
    const [userResult, setUserResult] = useState<string>('');
    const [background, setBackground] = useState<string>('unset');

    useEffect(() => {
        setNextExercise();
    }, []);

    const setNextExercise = () => {
        if (exIndex === data.exercises.length) {
            setState(AppStages.RESULT);
        } else {
            setCurrentExercise(data.exercises[exIndex]);
            setExIndex(exIndex + 1);
        }
    }

    const addResultNumber = (value: number) => {
        setUserResult(`${userResult}${value}`);
    }

    const changePosNeg = () => {
        setUserResult(userResult.startsWith("-") ? userResult.slice(1) : "-" + userResult);
    }

    const removeLast = () => {
        setUserResult(userResult.slice(0, -1))
    }

    const evaluate = () => {
        if (currentExercise) {
            const userInput = Number(userResult);
            setData(prevState => ({
                ...prevState,
                exercises: prevState.exercises.map((exercise, index) =>
                    index === (exIndex - 1)
                        ? { ...exercise, userResult: userInput, resultCorrect: currentExercise.expectedResult === userInput } // Update only this one
                        : exercise
                )
            }));
            setUserResult('');
            setNextExercise();
            if (currentExercise.expectedResult === userInput) {
                setBackground('green');
            } else {
                setBackground('red');
            }
            setTimeout(() => { setBackground('unset') }, 500);
        }
    }

    const backToHome = () => {
        setData(prevState => ({
            ...prevState,
            exercises: []
        }));
        setState(AppStages.HOME);
    }

    return <div>

        <div>
            {currentExercise!! && (
                <>
                    <h1 id='exercise-component-exercise-display'>{currentExercise.display}</h1>
                    <h1 id='exercise-component-exercise-input'> {userResult} </h1>
                    <div id="exercise-component-numberpad-box" style={{ background: background }}>
                        <div id="exercise-component-numberpad">
                            <button onClick={() => addResultNumber(1)}>1</button>
                            <button onClick={() => addResultNumber(2)}>2</button>
                            <button onClick={() => addResultNumber(3)}>3</button>
                            <button onClick={() => addResultNumber(4)}>4</button>
                            <button onClick={() => addResultNumber(5)}>5</button>
                            <button onClick={() => addResultNumber(6)}>6</button>
                            <button onClick={() => addResultNumber(7)}>7</button>
                            <button onClick={() => addResultNumber(8)}>8</button>
                            <button onClick={() => addResultNumber(9)}>9</button>
                            <button onClick={() => addResultNumber(0)}>0</button>
                            <button onClick={changePosNeg}>+/-</button>
                            <button onClick={removeLast}>Del</button>
                            <button onClick={evaluate} id="submit" style={{ gridColumn: 'span 3' }} >Submit</button>
                        </div>
                    </div>
                    <Button variant='contained' onClick={() => backToHome()}>Back to home</Button>
                </>
            )}
        </div>
    </div>
};