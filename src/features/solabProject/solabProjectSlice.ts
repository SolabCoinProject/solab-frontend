import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IResponseData, IResponseFailure } from '../../common/types';
import toastConfigs from '../../config/toast';
import { ISolabProject, ISolabProjectState } from './types';

const initialState: ISolabProjectState = {
    app: {
        solabProject: null,
        isFetchingSolabProject: false,
    },
};

export const solabProjectSlice = createSlice({
    name: 'solabProject',
    initialState,
    reducers: {
        fetchSolabProject: (state) => {
            state.app.isFetchingSolabProject = true;
        },
        fetchSolabProjectSuccess: (
            state,
            action: PayloadAction<IResponseData<ISolabProject>>
        ) => {
            state.app.isFetchingSolabProject = false;
            state.app.solabProject = action.payload.data;
        },
        fetchSolabProjectFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFetchingSolabProject = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Server Error', toastConfigs.error);
            }
        },
    },
});

export const solabProjectActions = solabProjectSlice.actions;

export default solabProjectSlice.reducer;
