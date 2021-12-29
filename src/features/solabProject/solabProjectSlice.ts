import { IFollowProjectParams } from './../user/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IResponseData, IResponseFailure } from '../../common/types';
import toastConfigs from '../../config/toast';
import {
    IDoTaskCommunityParams,
    IFetchRegisterInfoParams,
    IProcessPurchaseParams,
    ISolabProject,
    ISolabProjectState,
    ISolabRegisteredInfo,
} from './types';

const initialState: ISolabProjectState = {
    app: {
        solabProject: null,
        isFetchingSolabProject: false,
        isDoingTaskCommunity: false,
        isPurchaseProcessing: false,
        isFollowingProject: false,
        solabRegisteredInfo: null,
        isFetchingRegisterInfo: false,
        isTaskModalOpen: false,
        openTask: null,
        reloadRegisterInfo: false,
    },
};

export const solabProjectSlice = createSlice({
    name: 'solabProject',
    initialState,
    reducers: {
        // App
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
                toast.error('Something went wrong!', toastConfigs.error);
            }
        },
        doCommunityTask: (
            state,
            action: PayloadAction<IDoTaskCommunityParams>
        ) => {
            state.app.isDoingTaskCommunity = true;
        },
        doCommunityTaskSuccess: (
            state,
            action: PayloadAction<IResponseData<ISolabProject>>
        ) => {
            state.app.isDoingTaskCommunity = false;
            state.app.solabProject = action.payload.data;
            state.app.isTaskModalOpen = false;
            state.app.reloadRegisterInfo = true;
        },
        doCommunityTaskFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFetchingSolabProject = false;
            state.app.reloadRegisterInfo = true;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Something went wrong!', toastConfigs.error);
            }
        },
        processPurchase: (state) => {
            state.app.isPurchaseProcessing = true;
        },
        processPurchaseInfo: (
            state,
            action: PayloadAction<IProcessPurchaseParams>
        ) => {
            state.app.isPurchaseProcessing = true;
        },
        processPurchaseInfoSuccess: (
            state,
            action: PayloadAction<IResponseData<ISolabProject>>
        ) => {
            state.app.isPurchaseProcessing = false;
            state.app.solabProject = action.payload.data;
            state.app.reloadRegisterInfo = true;
        },
        processPurchaseInfoFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isPurchaseProcessing = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Something went wrong!', toastConfigs.error);
            }
            state.app.reloadRegisterInfo = true;
        },
        followProject: (state, action: PayloadAction<IFollowProjectParams>) => {
            state.app.isFollowingProject = true;
        },

        followProjectSuccess: (
            state,
            action: PayloadAction<IResponseData<ISolabProject>>
        ) => {
            state.app.isFollowingProject = false;
            state.app.solabProject = action.payload.data;
            state.app.reloadRegisterInfo = true;
        },
        followProjectFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFollowingProject = false;
            state.app.reloadRegisterInfo = true;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Something went wrong!', toastConfigs.error);
            }
        },

        fetchRegisterInfo: (
            state,
            action: PayloadAction<IFetchRegisterInfoParams>
        ) => {
            state.app.isFetchingRegisterInfo = true;
            state.app.reloadRegisterInfo = false;
        },
        fetchRegisterInfoSuccess: (
            state,
            action: PayloadAction<IResponseData<ISolabRegisteredInfo>>
        ) => {
            state.app.isFetchingRegisterInfo = false;
            state.app.solabRegisteredInfo = action.payload.data;
            state.app.reloadRegisterInfo = false;
        },
        fetchRegisterInfoFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFetchingRegisterInfo = false;
            state.app.reloadRegisterInfo = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Something went wrong!', toastConfigs.error);
            }
        },
        openTaskModal: (state, action: PayloadAction<{ taskData: any }>) => {
            state.app.isTaskModalOpen = true;
            state.app.openTask = action.payload.taskData;
        },
        closeTaskModal: (state) => {
            state.app.isTaskModalOpen = false;
            state.app.openTask = null;
        },
    },
});

export const solabProjectActions = solabProjectSlice.actions;

export default solabProjectSlice.reducer;
