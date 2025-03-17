import React from 'react';
import { AppDataModel } from '../models/app-data.model';
import { AppStages } from '../enum/stages.enum';

type Props = {
    setState: React.Dispatch<React.SetStateAction<AppStages>>;
    data: AppDataModel;
    setData: React.Dispatch<React.SetStateAction<AppDataModel>>;
};

export const Result: React.FC<Props> = ({ setState, data, setData }) => <div>
    <p>
        Welcome to result
    </p>

</div>;