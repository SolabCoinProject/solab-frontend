import { ITier } from './types';
import { tierActions } from './tierSlice';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPaginationResponse, IResponseData } from '../../common/types';
import tierApi from './api';

function* createTier(action: PayloadAction<Omit<ITier, '_id'>>) {
    try {
        const response: IResponseData<ITier> = yield call(
            tierApi.admin.createTier,
            action.payload
        );
        yield put(tierActions.createTierSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(tierActions.createTierFailure({ status, data: data }));
    }
}

function* fetchTiers(action: PayloadAction<any>) {
    try {
        const response: IPaginationResponse<ITier[]> = yield call(
            tierApi.admin.fetchTiers,
            action.payload
        );
        yield put(tierActions.fetchTiersSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(tierActions.fetchTiersFailure({ status, data: data }));
    }
}

function* updateTier(
    action: PayloadAction<{ id: string; data: Omit<ITier, '_id'> }>
) {
    try {
        const response: IResponseData<ITier> = yield call(
            tierApi.admin.updateTier,
            action.payload.id,
            action.payload.data
        );
        yield put(tierActions.updateTierSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(tierActions.updateTierFailure({ status, data: data }));
    }
}

function* fetchTiersApp() {
    try {
        const response: IResponseData<ITier[]> = yield call(
            tierApi.app.fetchTiers
        );
        yield put(tierActions.fetchTiersAppSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(tierActions.fetchTierAppFailure({ status, data: data }));
    }
}

export default function* tierSaga() {
    yield takeLatest(tierActions.createTier.type, createTier);
    yield takeLatest(tierActions.fetchTiers.type, fetchTiers);
    yield takeLatest(tierActions.updateTier.type, updateTier);
    yield takeLatest(tierActions.fetchTiersApp.type, fetchTiersApp);
}
