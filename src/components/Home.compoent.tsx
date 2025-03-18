import React from 'react';
import { AppStages } from '../enum/stages.enum';
import { Button, Checkbox, TextField } from '@mui/material';
import { AppDataModel } from '../models/app-data.model';
import { generateExercises } from '../services/exercises-generator.service';

type Props = {
    setState: React.Dispatch<React.SetStateAction<AppStages>>;
    data: AppDataModel;
    setData: React.Dispatch<React.SetStateAction<AppDataModel>>;
};

export const Home: React.FC<Props> = ({ setState, data, setData }) => {

    const startExercises = () => {
        const exercises = generateExercises(data);
        setData(prevState => ({
            ...prevState,
            exercises: exercises
        }));
        setState(AppStages.EXERCISE);
    }


    return <div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.smallAddSub}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        smallAddSub: !prevState.smallAddSub
                    }))}
                />
                <div>
                    Kleine Addition/Subtraktion
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.smallMulDiv}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        smallMulDiv: !prevState.smallMulDiv
                    }))}
                />
                <div>
                    Kleine Multiplikation/Division
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.largeAddSub}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        largeAddSub: !prevState.largeAddSub
                    }))}
                />
                <div>
                    Grosse Addition/Subtraktion
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.largeMulDiv}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        largeMulDiv: !prevState.largeMulDiv
                    }))}
                />
                <div>
                    Grosse Multiplikation/Division
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.square}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        square: !prevState.square
                    }))}
                />
                <div>
                    Quadrate
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <TextField id="number-exercises" label="Anzahl Aufgaben" variant="outlined" type='number' value={data.numExer}
                    onChange={(event: { target: { value: any; }; }) => setData(prevState => ({
                        ...prevState,
                        numExer: Number(event.target.value)
                    }))} />
            </div>
            <div style={{ marginTop: '15px' }}>
                <Button variant='contained' onClick={startExercises}>Next</Button>
            </div>
        </div>

    </div>;
}