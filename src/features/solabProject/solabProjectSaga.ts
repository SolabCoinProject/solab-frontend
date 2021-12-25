import { PayloadAction } from '@reduxjs/toolkit';
import { solabProjectActions } from './solabProjectSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ISolabProject,
    IDoTaskCommunityParams,
    IProcessPurchaseParams,
} from './types';
import solabProjectApi from './api';
import { IResponseData } from '../../common/types';

function* fetchSolabProject() {
    try {
        const solabProject: IResponseData<ISolabProject> = yield call(
            solabProjectApi.app.fetchSolabProject
        );

        yield put(solabProjectActions.fetchSolabProjectSuccess(solabProject));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            solabProjectActions.fetchSolabProjectFailure({ status, data: data })
        );
    }
}

function* doTaskCommunity(action: PayloadAction<IDoTaskCommunityParams>) {
    try {
        const response: IResponseData<ISolabProject> = yield call(
            solabProjectApi.app.doTaskCommunity,
            action.payload
        );
        yield put(solabProjectActions.doCommunityTaskSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            solabProjectActions.doCommunityTaskFailure({ status, data: data })
        );
    }
}

function* processPurchaseInfo(action: PayloadAction<IProcessPurchaseParams>) {
    try {
        const response: IResponseData<ISolabProject> = yield call(
            solabProjectApi.app.processPurchaseInfo,
            action.payload
        );
        yield put(solabProjectActions.processPurchaseInfoSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            solabProjectActions.processPurchaseInfoFailure({
                status,
                data: data,
            })
        );
    }
}

export default function* solabProjectSaga() {
    yield takeLatest(
        solabProjectActions.fetchSolabProject.type,
        fetchSolabProject
    );
    yield takeLatest(solabProjectActions.doCommunityTask.type, doTaskCommunity);
    yield takeLatest(
        solabProjectActions.processPurchaseInfo.type,
        processPurchaseInfo
    );
}
