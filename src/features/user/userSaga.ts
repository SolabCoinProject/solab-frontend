import {IPaginationData, IResponseData} from './../../common/types';
import {
    ILoginParams,
    ILoginResponse,
    IStaff, IStakeParams,
    IUser,
    IUserFull,
    IUserInfoUpdateParams,
    IUserKycUpdateParams,
    IWalletConnectParams,
} from './types';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {IReduxAction} from '../../common/types';
import {userActions} from './userSlice';
import userApi from './api';
import {PayloadAction} from '@reduxjs/toolkit';

function* staffLogin(action: IReduxAction<ILoginParams>) {
    try {
        const loginRes: ILoginResponse = yield call(
            userApi.admin.login,
            action.payload
        );
        yield put(userActions.staffLoginSuccess(loginRes));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.staffLoginFailure({status, data: data}));
    }
}

function* getCurrentStaff() {
    try {
        const staff: IResponseData<IStaff> = yield call(
            userApi.admin.getCurrentStaff
        );
        yield put(userActions.getCurrentStaffSuccess(staff));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.getCurrentStaffFailure({status, data: data}));
    }
}

function* getOrCreateUser(action: PayloadAction<IWalletConnectParams>) {
    try {
        const user: IResponseData<IUser> = yield call(
            userApi.app.getOrCreateUser,
            action.payload
        );
        yield put(userActions.getOrCreateUserSuccess(user));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.getOrCreateUserFailure({status, data: data}));
    }
}

function* updateUserInformation(
    action: PayloadAction<{
        walletAddress: string;
        data: IUserInfoUpdateParams;
    }>
) {
    try {
        const updatedUser: IResponseData<IUser> = yield call(
            userApi.app.updateUserData,
            action.payload.walletAddress,
            action.payload.data
        );
        yield put(userActions.updateUserInformationSuccess(updatedUser));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(
            userActions.updateUserInformationFailure({status, data: data})
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
        const updatedUser: IResponseData<IUser> = yield call(
            userApi.app.updateKyc,
            action.payload.walletAddress,
            action.payload.data
        );
        yield put(userActions.updateKycSuccess(updatedUser));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(userActions.updateKycFailure({status, data: data}));
    }
}

function* fetchUsers(action: PayloadAction<any>) {
    try {
        const users: IResponseData<IPaginationData<IUserFull[]>> = yield call(
            userApi.admin.fetchUsers,
            action.payload
        );
        yield put(userActions.fetchUsersSuccess(users));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.fetchUsersFailure({status, data: data}));
    }
}

function* updateUsersKycAdmin(action: PayloadAction<IUserKycUpdateParams>) {
    try {
        const res: IResponseData<null> = yield call(
            userApi.admin.updateUserKyc,
            action.payload
        );
        yield put(userActions.updateKycAdminSuccess(res));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.updateKycAdminFailure({status, data: data}));
    }
}

function* stake(action: PayloadAction<IStakeParams>) {
    try {
        const res: IResponseData<IUser> = yield call(
            userApi.app.stake,
            action.payload.userId,
            action.payload.solabAmount,
            action.payload.signature
        );
        yield put(userActions.stakeSuccessfully(res));
    } catch (error: any) {
        const {status, data} = error.response;
        yield put(userActions.stakeFailure({status, data: data}));
    }
}

function* claimInterest(action: PayloadAction<{ userId: string, claimDate: string }>) {
    try {
        const res: IResponseData<IUser> = yield call(
            userApi.app.claimInterest,
            action.payload.userId,
            action.payload.claimDate
        );
        yield put(userActions.claimInterestSuccessfully(res));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(userActions.claimInterestFailure({status, data: data}));
    }
}

function* unstake(action: PayloadAction<{ userId: string }>) {
    try {
        const res: IResponseData<IUser> = yield call(
            userApi.app.unstake,
            action.payload.userId
        );
        yield put(userActions.unstakeSuccessfully(res));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(userActions.unstakeFailure({status, data: data}));
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
    yield takeLatest(userActions.fetchUsers.type, fetchUsers);
    yield takeLatest(userActions.updateKycAdmin.type, updateUsersKycAdmin);
    yield takeLatest(userActions.stake.type, stake);
    yield takeLatest(userActions.claimInterest.type, claimInterest);
    yield takeLatest(userActions.unstake.type, unstake);
}
