import { PayloadAction } from '@reduxjs/toolkit';
import { solabProjectActions } from './solabProjectSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ISolabProject,
    IDoTaskCommunityParams,
    IProcessPurchaseParams,
    IFetchRegisterInfoParams,
    ISolabRegisteredInfo,
    IUpdateSolabWhitelistParams,
} from './types';
import solabProjectApi from './api';
import { IPaginationData, IResponseData } from '../../common/types';
import { IFollowProjectParams } from '../user/types';

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

function* followProject(action: PayloadAction<IFollowProjectParams>) {
    try {
        const response: IResponseData<ISolabProject> = yield call(
            solabProjectApi.app.followProject,
            action.payload
        );
        yield put(solabProjectActions.followProjectSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            solabProjectActions.followProjectFailure({
                status,
                data: data,
            })
        );
    }
}

function* getRegisterInfo(action: PayloadAction<IFetchRegisterInfoParams>) {
    try {
        const response: IResponseData<ISolabRegisteredInfo> = yield call(
            solabProjectApi.app.fetchRegisterInfo,
            action.payload
        );
        yield put(solabProjectActions.fetchRegisterInfoSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            solabProjectActions.fetchRegisterInfoFailure({
                status,
                data: data,
            })
        );
    }
}

function* fetchSolabRegisteredInfos(action: PayloadAction<any>) {
    try {
        const res: IResponseData<IPaginationData<ISolabRegisteredInfo[]>> =
            yield call(
                solabProjectApi.admin.fetchSolabRegisteredInfos,
                action.payload
            );
        yield put(solabProjectActions.fetchSolabRegisteredInfosSuccess(res));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(
            solabProjectActions.fetchSolabRegisteredInfosFailure({
                status,
                data: data,
            })
        );
    }
}

function* updateSolabWhitelist(
    action: PayloadAction<IUpdateSolabWhitelistParams>
) {
    try {
        const res: IResponseData<null> = yield call(
            solabProjectApi.admin.updateSolabWhitelist,
            action.payload
        );
        yield put(solabProjectActions.updateSolabWhitelistSuccess(res));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(
            solabProjectActions.updateSolabWhitelistFailure({
                status,
                data: data,
            })
        );
    }
}

function* fetchTotalTokenPayment() {
    try {
        const res: IResponseData<{ _id: string; amount: number }[]> =
            yield call(solabProjectApi.admin.fetchTotalTokenPayment);
        yield put(solabProjectActions.fetchTotalTokenPaymentSuccess(res));
    } catch (error: any) {
        const { status, data } = error.response;
        yield put(
            solabProjectActions.fetchTotalTokenPaymentFailure({
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
    yield takeLatest(solabProjectActions.followProject.type, followProject);
    yield takeLatest(
        solabProjectActions.fetchRegisterInfo.type,
        getRegisterInfo
    );

    yield takeLatest(
        solabProjectActions.fetchSolabRegisteredInfos.type,
        fetchSolabRegisteredInfos
    );
    yield takeLatest(
        solabProjectActions.updateSolabWhitelist.type,
        updateSolabWhitelist
    );

    yield takeLatest(
        solabProjectActions.fetchTotalTokenPayment.type,
        fetchTotalTokenPayment
    );
}
