import React from 'react';
import { AppStages } from '../enum/stages.enum';
import { Button, Checkbox, MenuItem, Select } from '@mui/material';
import { AppDataModel } from '../models/app-data.model';
import { generateExercises } from '../services/exercises-generator.service';
import './home.component.css';

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
            exercises: exercises,
        }));
        setState(AppStages.EXERCISE);
    }


    return <div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Welcome to Mental Math!</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.smallAddSub}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        smallAddSub: !prevState.smallAddSub
                    }))}
                />
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    smallAddSub: !prevState.smallAddSub
                }))}>
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
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    smallMulDiv: !prevState.smallMulDiv
                }))}>
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
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    largeAddSub: !prevState.largeAddSub
                }))}>
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
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    largeMulDiv: !prevState.largeMulDiv
                }))}>
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
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    square: !prevState.square
                }))}>
                    Quadrate
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.audioOnly}
                    onChange={() => setData(prevState => ({
                        ...prevState,
                        audioOnly: !prevState.audioOnly
                    }))}
                />
                <div className='home-component-checkbox-text' onClick={() => setData(prevState => ({
                    ...prevState,
                    audioOnly: !prevState.audioOnly
                }))}>
                    Only audio
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <Select
                    id="number-exercises-select"
                    value={data.numExer}
                    label="Age"
                    sx={{ width: '150px' }}
                    onChange={(event: { target: { value: any; }; }) => setData(prevState => ({
                        ...prevState,
                        numExer: Number(event.target.value)
                    }))}
                >
                    <MenuItem key='1' value={1}>
                        1
                    </MenuItem>
                    {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(value => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ marginTop: '15px' }}>
                <Button variant='contained' onClick={startExercises}>Next</Button>
            </div>
        </div>

    </div>;
}