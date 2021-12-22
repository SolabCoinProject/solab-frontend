import { IResponseData } from './../../common/types';
import {
    ILoginParams,
    ILoginResponse,
    IStaff,
    IUser,
    IUserInfoUpdateParams,
    IUserKycUpdateParams,
    IWalletConnectParams,
} from './types';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { IReduxAction } from '../../common/types';
import { userActions } from './userSlice';
import userApi from './api';
import { PayloadAction } from '@reduxjs/toolkit';

function* staffLogin(action: IReduxAction<ILoginParams>) {
    try {
        const loginRes: ILoginResponse = yield call(
            userApi.admin.login,
            action.payload
        );
        yield put(userActions.staffLoginSuccess(loginRes));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(userActions.staffLoginFailure({ status, data: data }));
    }
}

function* getCurrentStaff() {
    try {
        const staff: IStaff = yield call(userApi.admin.getCurrentStaff);
        yield put(userActions.getCurrentStaffSuccess(staff));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(userActions.getCurrentStaffFailure({ status, data: data }));
    }
}

function* getOrCreateUser(action: PayloadAction<IWalletConnectParams>) {
    try {
        const user: IUser = yield call(
            userApi.app.getOrCreateUser,
            action.payload
        );
        yield put(userActions.getOrCreateUserSuccess(user));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(userActions.getOrCreateUserFailure({ status, data: data }));
    }
}

function* updateUserInformation(
    action: PayloadAction<{
        walletAddress: string;
        data: IUserInfoUpdateParams;
    }>
) {
    try {
        const updatedUser: IUser = yield call(
            userApi.app.updateUserData,
            action.payload.walletAddress,
            action.payload.data
        );
        yield put(userActions.updateUserInformationSuccess(updatedUser));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            userActions.updateUserInformationFailure({ status, data: data })
        );
    }
}

function* updateKyc(
    action: PayloadAction<{
        walletAddress: string;
        data: IUserKycUpdateParams;
    }>
) {
    try {
        const updatedUser: IUser = yield call(
            userApi.app.updateKyc,
            action.payload.walletAddress,
            action.payload.data
        );
        yield put(userActions.updateKycSuccess(updatedUser));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(userActions.updateKycFailure({ status, data: data }));
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.staffLogin.type, staffLogin);
    yield takeLatest(userActions.getCurrentStaff.type, getCurrentStaff);
    yield takeLatest(userActions.userWalletConnected.type, getOrCreateUser);
    yield takeLatest(
        userActions.updateUserInformation.type,
        updateUserInformation
    );
    yield takeLatest(userActions.updateKyc.type, updateKyc);
}
