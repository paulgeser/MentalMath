import React, { useState } from 'react';
import './App.css';
import { AppStages } from './enum/stages.enum';
import { Home } from './components/home.compoent';
import { Result } from './components/result.component';
import { Exercise } from './components/exercise.component';
import { AppDataModel, createAppDataModel } from './models/app-data.model';

type Props = {
};

export const App: React.FC<Props> = () => {

  const [state, setState] = useState<AppStages>(AppStages.HOME);
  const [data, setData] = useState<AppDataModel>(createAppDataModel({ numExer: 15, audioOnly: false }));

  return (
    <div>
      {state === AppStages.HOME && <Home setState={setState} data={data} setData={setData} />}
      {state === AppStages.EXERCISE && <Exercise setState={setState} data={data} setData={setData} />}
      {state === AppStages.RESULT && <Result setState={setState} data={data} setData={setData} />}

    </div>)
};
