import { IResponseData, IResponseFailure } from './../../common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IStaff,
    IUserState,
    ILoginParams,
    ILoginResponse,
    IWalletConnectParams,
    IUser,
    IUserInfoUpdateParams,
    IUserKycUpdateParams,
} from './types';
import { toast } from 'react-toastify';
import toastConfigs from '../../config/toast';

const initialState: IUserState = {
    admin: {
        staff: null,
        isLoading: false,
        isLoggingIn: false,
        isLoggedIn: false,
        authenticated: true,
        isFetchingStaff: false,
    },
    app: {
        user: null,
        isFetchingUser: false,
        isUpdatingInfo: false,
        isUpdatingKyc: false,
        constants: {
            kycVerified: 1,
            kycDenied: 0,
            kycVerifying: 2,
            kycNeverSubmitted: 3,
            kycArr: [0, 1, 2, 3],
            kycStatuses: [
                {
                    value: 1,
                    label: 'Verified',
                },
                {
                    value: 0,
                    label: 'Denied',
                },
                {
                    value: 2,
                    label: 'Verifying',
                },
                {
                    value: 3,
                    label: 'Never Submitted',
                },
            ],
        },
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // staff
        setStaff: (state, action: PayloadAction<IStaff>) => {
            state.admin.staff = action.payload;
        },
        staffLogin: (state, action: PayloadAction<ILoginParams>) => {
            state.admin.isLoggingIn = true;
        },
        staffLoginSuccess: (state, action: PayloadAction<ILoginResponse>) => {
            const { accessToken } = action.payload;
            localStorage.setItem('accessToken', accessToken);
            state.admin.isLoggingIn = false;
            state.admin.isLoggedIn = true;
            state.admin.authenticated = true;
        },
        staffLoginFailure: (state, action: PayloadAction<IResponseFailure>) => {
            state.admin.isLoggingIn = false;
            state.admin.isLoggedIn = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Server Error');
            }
        },
        getCurrentStaff: (state) => {
            state.admin.isFetchingStaff = true;
        },
        getCurrentStaffSuccess: (
            state,
            action: PayloadAction<IResponseData<IStaff>>
        ) => {
            state.admin.isFetchingStaff = false;
            state.admin.authenticated = true;
            state.admin.staff = action.payload.data;
        },
        getCurrentStaffFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingStaff = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
                state.admin.authenticated = false;
                state.admin.isLoggedIn = false;
            } else {
                toast.error('Server Error');
            }
        },

        // App

        userWalletConnected: (
            state,
            action: PayloadAction<IWalletConnectParams>
        ) => {
            state.app.isFetchingUser = true;
        },

        getOrCreateUserSuccess: (
            state,
            action: PayloadAction<IResponseData<IUser>>
        ) => {
            state.app.isFetchingUser = false;
            state.app.user = action.payload.data;
        },

        getOrCreateUserFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFetchingUser = false;
        },

        userWalletDisconnected: (state) => {
            state.app.user = null;
        },

        updateUserInformation: (
            state,
            action: PayloadAction<{
                walletAddress: string;
                data: IUserInfoUpdateParams;
            }>
        ) => {
            state.app.isUpdatingInfo = true;
        },
        updateUserInformationSuccess: (
            state,
            action: PayloadAction<IResponseData<IUser>>
        ) => {
            state.app.isUpdatingInfo = false;
            state.app.user = action.payload.data;
            toast.success('Update successfully', toastConfigs.success);
        },
        updateUserInformationFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isUpdatingInfo = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Server Error', toastConfigs.error);
            }
        },
        updateKyc: (
            state,
            action: PayloadAction<{
                walletAddress: string;
                data: IUserKycUpdateParams;
            }>
        ) => {
            state.app.isUpdatingKyc = true;
        },
        updateKycSuccess: (
            state,
            action: PayloadAction<IResponseData<IUser>>
        ) => {
            state.app.isUpdatingKyc = false;
            state.app.user = action.payload.data;
            toast.success('Update successfully', toastConfigs.success);
        },
        updateKycFailure: (state, action: PayloadAction<IResponseFailure>) => {
            state.app.isUpdatingInfo = false;
            if (action.payload.status !== 500) {
                toast.error(action.payload.data.message, toastConfigs.error);
            } else {
                toast.error('Server Error', toastConfigs.error);
            }
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
