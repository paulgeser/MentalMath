import React, { useState } from 'react';
import { AppStages } from '../enum/stages.enum';
import { Box, Button, Checkbox, MenuItem, Modal, Select, Typography } from '@mui/material';
import { AppDataModel } from '../models/app-data.model';
import { generateExercises } from '../services/exercises-generator.service';
import './home.component.css';

type Props = {
    setState: React.Dispatch<React.SetStateAction<AppStages>>;
    data: AppDataModel;
    setData: React.Dispatch<React.SetStateAction<AppDataModel>>;
};

export const Home: React.FC<Props> = ({ setState, data, setData }) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [warningShown, setWarningShown] = useState<boolean>(false);


    const startExercises = () => {
        const exercises = generateExercises(data);
        setData(prevState => ({
            ...prevState,
            exercises: exercises,
        }));
        setState(AppStages.EXERCISE);
    }

    const audioWarning = () => {
        if (!warningShown) {
            setModalOpen(true);
            setWarningShown(true);
        }
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 280,
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Willkommen zu Mental Math!</h1>
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
                    Quadrate und Kubikzahlen
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    checked={data.audioOnly}
                    onChange={() => {
                        setData(prevState => ({
                            ...prevState,
                            audioOnly: !prevState.audioOnly
                        }));
                        audioWarning();
                    }}
                />
                <div className='home-component-checkbox-text' onClick={() => {
                    setData(prevState => ({
                        ...prevState,
                        audioOnly: !prevState.audioOnly
                    }));
                    audioWarning();
                }}>
                    Nur Audio (keine visuelle Anzeige)
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                Anzahl Aufgaben:
                <br/>
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
                <Button variant='contained' onClick={startExercises}>Weiter</Button>
            </div>
        </div>
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Audio Warnung!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    Es ist möglich, dass die Audio Funktion nicht funktioniert. Es gibt vorallem Kompatibilitätsprobleme mit Mobilegeräten.
                    <br/>
                    Falls Audio nicht funktioniert, bitte Checkbox für Audio deaktivieren.
                    <Button variant='contained' onClick={handleClose}>
                        Verstanden
                    </Button>
                </Typography>
            </Box>
        </Modal>
    </div>;
}