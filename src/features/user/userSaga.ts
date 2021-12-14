import { ILoginParams, ILoginResponse, IStaff } from './types';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { IReduxAction } from '../../common/types';
import { userActions } from './userSlice';
import userApi from './api';

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

export default function* userSaga() {
    yield takeLatest(userActions.staffLogin.type, staffLogin);
    yield takeLatest(userActions.getCurrentStaff.type, getCurrentStaff);
}
