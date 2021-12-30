import { IResponseData, IPaginationData } from './../../common/types';
import { IFollowProjectParams } from './../user/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IResponseFailure } from '../../common/types';
import toastConfigs from '../../config/toast';
import {
    IDoTaskCommunityParams,
    IFetchRegisterInfoParams,
    IProcessPurchaseParams,
    ISolabProject,
    ISolabProjectState,
    ISolabRegisteredInfo,
    IUpdateSolabWhitelistParams,
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
    admin: {
        solabRegisteredInfos: {
            docs: [],
            totalDocs: 0,
            limit: 0,
            totalPages: 0,
            page: 0,
            pagingCounter: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        },
        isFetchingSolabRegisteredInfos: false,
        reloadSolabRegisteredInfos: false,
        isUpdatingSolabWhitelist: false,
        isFetchingTotalTokenPayment: false,
        totalTokenPayment: [],
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

        //Admin
        fetchSolabRegisteredInfos: (state, action: PayloadAction<any>) => {
            state.admin.isFetchingSolabRegisteredInfos = true;
            state.admin.reloadSolabRegisteredInfos = false;
        },

        fetchSolabRegisteredInfosSuccess: (
            state,
            action: PayloadAction<
                IResponseData<IPaginationData<ISolabRegisteredInfo[]>>
            >
        ) => {
            state.admin.isFetchingSolabRegisteredInfos = false;
            state.admin.reloadSolabRegisteredInfos = false;
            state.admin.solabRegisteredInfos = action.payload.data;
        },

        fetchSolabRegisteredInfosFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingSolabRegisteredInfos = false;
            state.admin.reloadSolabRegisteredInfos = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },

        updateSolabWhitelist: (
            state,
            action: PayloadAction<IUpdateSolabWhitelistParams>
        ) => {
            state.admin.isUpdatingSolabWhitelist = true;
        },

        updateSolabWhitelistSuccess: (
            state,
            action: PayloadAction<IResponseData<null>>
        ) => {
            state.admin.isUpdatingSolabWhitelist = false;
            state.admin.reloadSolabRegisteredInfos = true;
        },

        updateSolabWhitelistFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isUpdatingSolabWhitelist = false;
            state.admin.reloadSolabRegisteredInfos = true;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else {
                toast.error('Something went wrong!');
            }
        },

        fetchTotalTokenPayment: (state) => {
            state.admin.isFetchingTotalTokenPayment = true;
            state.admin.reloadSolabRegisteredInfos = false;
        },
        fetchTotalTokenPaymentSuccess: (
            state,
            action: PayloadAction<
                IResponseData<{ _id: string; amount: number }[]>
            >
        ) => {
            state.admin.isFetchingTotalTokenPayment = false;
            state.admin.reloadSolabRegisteredInfos = false;
            state.admin.totalTokenPayment = action.payload.data;
        },
        fetchTotalTokenPaymentFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingTotalTokenPayment = false;
            state.admin.reloadSolabRegisteredInfos = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else {
                toast.error('Something went wrong!');
            }
        },
    },
});

export const solabProjectActions = solabProjectSlice.actions;

export default solabProjectSlice.reducer;
