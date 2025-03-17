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
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        console.log(data);
        setNextExercise();
    }, []);

    const setNextExercise = () => {
        if (index === data.exercises.length) {
            console.error("FINISHED WITH EXERCISES");
        } else {
            setCurrentExercise(data.exercises[index]);
            setIndex(index + 1);
        }

    }

    return <div>

        <div>
            {currentExercise!! && (
                <>
                    <h1>{currentExercise.display}</h1>
                    <div id="exercise-component-numberpad-box">
                        <div id="exercise-component-numberpad">
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5</button>
                            <button>6</button>
                            <button>7</button>
                            <button>8</button>
                            <button>9</button>
                            <button>0</button>
                            <button>+/-</button>
                            <button>Del</button>
                            <button id="submit" style={{ gridColumn: 'span 3' }} >Submit</button>
                        </div>
                    </div>
                </>
            )}
        </div>
        <Button onClick={setNextExercise}>Submit</Button>


    </div>
};