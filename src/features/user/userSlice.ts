import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStaff, IUserState, ILoginParams, ILoginResponse } from './types';
import { IResponseFailure } from '../../common/types';
import { toast } from 'react-toastify';

const initialState: IUserState = {
    admin: {
        staff: null,
        isLoading: false,
        isLoggingIn: false,
        isLoggedIn: false,
        authenticated: true,
        isFetchingStaff: false,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
        getCurrentStaffSuccess: (state, action: PayloadAction<IStaff>) => {
            state.admin.isFetchingStaff = false;
            state.admin.authenticated = true;
            state.admin.staff = action.payload;
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
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
