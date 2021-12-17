import { IPaginationResponse } from './../../common/types';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import projectApi from './api';
import { IProject } from './types';
import { projectActions } from './projectSlice';

function* fetchProjects(action: PayloadAction<any>) {
    try {
        const response: IPaginationResponse<IProject[]> = yield call(
            projectApi.admin.fetchProjects,
            action.payload
        );
        yield put(projectActions.fetchProjectsSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(projectActions.fetchProjectsFailure({ status, data: data }));
    }
}

export default function* projectSaga() {
    yield takeLatest(projectActions.fetchProjects.type, fetchProjects);
}
