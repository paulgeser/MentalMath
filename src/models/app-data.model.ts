
export interface AppDataModel {
    smallAddSub: boolean;
    smallMulDiv: boolean;
    largeAddSub: boolean;
    largeMulDiv: boolean;
    square: boolean;
    numExer: number;
    exercises: ExerciseModel[];
    audioOnly: boolean;
    result: any;
}

export const createAppDataModel = (data: Partial<AppDataModel>): AppDataModel => {
    return {
        smallAddSub: data.smallAddSub ?? false,
        smallMulDiv: data.smallMulDiv ?? false,
        largeAddSub: data.largeAddSub ?? false,
        largeMulDiv: data.largeMulDiv ?? false,
        square: data.square ?? false,
        numExer: data.numExer ?? 0,
        exercises: data.exercises ?? [],
        audioOnly: data.audioOnly ?? false,
        result: data.result ?? null
    };
};

export interface ExerciseModel {
    display: string;
    expectedResult: number;
    userResult: number | null;
    resultCorrect: boolean;
    learningModel: number[];
    timeElapsed: number;
}
