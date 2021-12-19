import { IPaginationResponse, IResponseData } from './../../common/types';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import projectApi from './api';
import { IProject, IProjectFieldOptions } from './types';
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

function* createProject(action: PayloadAction<Omit<IProject, '_id'>>) {
    try {
        const response: IResponseData<IProject> = yield call(
            projectApi.admin.createProject,
            action.payload
        );
        yield put(projectActions.createProjectSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(projectActions.createProjectFailure({ status, data: data }));
    }
}

function* fetchFieldOptions() {
    try {
        const response: IResponseData<IProjectFieldOptions> = yield call(
            projectApi.admin.fetchFieldOptions
        );
        yield put(projectActions.fetchFieldOptionsSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(
            projectActions.fetchFieldOptionsFailure({ status, data: data })
        );
    }
}

function* editProject(
    action: PayloadAction<{ id: string; data: Omit<IProject, '_id'> }>
) {
    try {
        const response: IResponseData<IProject> = yield call(
            projectApi.admin.editProject,
            action.payload.id,
            action.payload.data
        );
        yield put(projectActions.editProjectSuccess(response));
    } catch (err: any) {
        const { status, data } = err.response;
        yield put(projectActions.editProjectFailure({ status, data: data }));
    }
}

export default function* projectSaga() {
    yield takeLatest(projectActions.fetchProjects.type, fetchProjects);
    yield takeLatest(projectActions.createProject.type, createProject);
    yield takeLatest(projectActions.fetchFieldOptions.type, fetchFieldOptions);
    yield takeLatest(projectActions.editProject.type, editProject);
}
