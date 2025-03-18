import React, { useEffect, useState } from 'react';
import { AppDataModel, ExerciseModel } from '../models/app-data.model';
import { AppStages } from '../enum/stages.enum';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


type Props = {
    setState: React.Dispatch<React.SetStateAction<AppStages>>;
    data: AppDataModel;
    setData: React.Dispatch<React.SetStateAction<AppDataModel>>;
};

export const Result: React.FC<Props> = ({ setState, data, setData }) => {

    const [results, setResults] = useState<ExerciseModel[]>([]);
    const [resultPercentage, setResultPercentage] = useState<number>(0);

    useEffect(() => {
        createResultTable();
    }, []);

    const createResultTable = () => {
        setResults(data.exercises);
        const correctExercises = data.exercises.filter(x => x.resultCorrect === true);
        setResultPercentage(Math.round((correctExercises.length / data.exercises.length) * 100))
    }

    const backToHome = () => {
        setData(prevState => ({
            ...prevState,
            exercises: []
        }));
        setState(AppStages.HOME);
    }

    return <div>
        {results.length === 0 && <>
            <b>Exercise number was set to 0, so no exercises were created!!</b>
        </>}
        {results.length > 0 && <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ textAlign: 'center' }}>
                    Your results are as follows:
                    <br />
                    <b>{resultPercentage}%</b>
                </p>
                <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
                    <Table sx={{ minWidth: 350, maxWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell align="right">Correct</TableCell>
                                <TableCell align="right">Yours</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.display}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.expectedResult}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.userResult}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.resultCorrect && <>
                                            <IconButton aria-label="delete" size="large" style={{ background: '#bff1bf' }}>
                                                <CheckIcon />
                                            </IconButton>
                                        </>}
                                        {!row.resultCorrect && <>
                                            <IconButton aria-label="delete" size="large" style={{ background: 'rgb(238 170 170)' }}>
                                                <ClearIcon />
                                            </IconButton>
                                        </>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>}
        <div style={{ width: '100%', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={() => backToHome()}>Back to home</Button>
        </div>
    </div>
};