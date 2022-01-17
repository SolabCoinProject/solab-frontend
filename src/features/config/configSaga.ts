import { put, takeLatest, call } from 'redux-saga/effects';
import { configActions } from './configSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResponseData } from '../../common/types';
import { IConfig } from './types';
import configApi from './api';

function* fetchConfigBySlug(action: PayloadAction<{ slug: string }>) {
    try {
        const response: IResponseData<IConfig> = yield call(
            configApi.admin.fetchConfigBySlug,
            action.payload.slug
        );
        yield put(configActions.fetchConfigBySlugSuccessfully(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            configActions.fetchConfigBySlugFailure({ status, data: data })
        );
    }
}

function* updateSettingsBySlug(
    action: PayloadAction<{ slug: string; value: number }>
) {
    try {
        const response: IResponseData<IConfig> = yield call(
            configApi.admin.updateConfigBySlug,
            action.payload.slug,
            action.payload.value
        );
        yield put(configActions.updateConfigBySlugSuccessfully(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            configActions.updateConfigBySlugFailure({ status, data: data })
        );
    }
}

function* appFetchConfigBySlug(action: PayloadAction<{ slug: string }>) {
    try {
        const response: IResponseData<IConfig> = yield call(
            configApi.app.fetchConfigBySlug,
            action.payload.slug
        );
        yield put(configActions.appFetchConfigBySlugSuccessfully(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            configActions.appFetchConfigBySlugFailure({ status, data: data })
        );
    }
}

export default function* configSaga() {
    yield takeLatest(configActions.fetchConfigBySlug.type, fetchConfigBySlug);
    yield takeLatest(
        configActions.updateConfigBySlug.type,
        updateSettingsBySlug
    );
    yield takeLatest(
        configActions.appFetchConfigBySlug.type,
        appFetchConfigBySlug
    );
}
