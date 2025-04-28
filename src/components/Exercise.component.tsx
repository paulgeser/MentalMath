import React, { useEffect, useState } from 'react';
import { AppStages } from '../enum/stages.enum';
import { AppDataModel, ExerciseModel } from '../models/app-data.model';
import { Box, Button, Modal, Typography } from '@mui/material';
import './exercise.component.css';
import { handlePredict } from '../services/exercise-timeevaluator.service';

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
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [timeOutSound, setTimeOutSound] = useState<NodeJS.Timeout | null>(null);
    const [timeOutPopup, setTimeOutPopup] = useState<NodeJS.Timeout | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setNextExercise();
    }, []);

    const setNextExercise = () => {
        cancelTimers();
        if (exIndex === data.exercises.length) {
            setState(AppStages.RESULT);
        } else {
            setStartTime(new Date());
            const newExercise = data.exercises[exIndex];
            setCurrentExercise(newExercise);
            setExIndex(exIndex + 1);
            if (data.audioOnly) {
                speakExercise(newExercise.display);
            }
            console.log(newExercise.learningModel);
            startTimingWorkflow(newExercise);
        }
    }

    const playSound = () => {
        const audio = new Audio(`${process.env.PUBLIC_URL}/beep.mp3`);
        audio.play().catch((error) => console.error('Audio play failed:', error));
    };

    const startTimingWorkflow = (newExercise: ExerciseModel) => {
        const waitTime = handlePredict(newExercise.learningModel);

        // First timeout: play sound when time is up
        const soundTimer = setTimeout(() => {
            playSound();

            // Second timeout: 5s after the sound, show popup
            const popupTimer = setTimeout(() => {
                setModalOpen(true);
            }, 5000);

            setTimeOutPopup(popupTimer);
        }, waitTime * 1000 + 1500);

        setTimeOutSound(soundTimer);
    };

    const cancelTimers = () => {
        if (timeOutSound) clearTimeout(timeOutSound);
        if (timeOutPopup) clearTimeout(timeOutPopup);
        setTimeOutSound(null);
        setTimeOutPopup(null);
    };

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
            const endTime = new Date();
            var timeDiff = endTime.getTime() - startTime.getTime();

            timeDiff /= 1000;
            setData(prevState => ({
                ...prevState,
                exercises: prevState.exercises.map((exercise, index) =>
                    index === (exIndex - 1)
                        ? { ...exercise, userResult: userInput, resultCorrect: currentExercise.expectedResult === userInput, timeElapsed: Math.round(timeDiff) } // Update only this one
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

    const speakExercise = (text: string) => {
        const voices = speechSynthesis.getVoices();
        const germanVoice = voices.find(voice => voice.lang.startsWith("de"));

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "de-DE";
        if (germanVoice) {
            utterance.voice = germanVoice;
        }
        speechSynthesis.speak(utterance);
    }

    const handleClose = () => {
        setModalOpen(false);
        evaluate();
    }

    const handleCloseStay = () => {
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

        <div>
            {currentExercise!! && (
                <>
                    <h1 id='exercise-component-exercise-display'>{!data.audioOnly && <>{currentExercise.display}</>}</h1>
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
                    <div style={{ width: '100%', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' onClick={() => backToHome()}>Back to home</Button>
                    </div>
                </>
            )}
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your time is up!!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant='outlined' onClick={handleCloseStay}>
                            Continue here
                        </Button>
                        <Button variant='contained' onClick={handleClose}>
                            Go to next
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </div>
};