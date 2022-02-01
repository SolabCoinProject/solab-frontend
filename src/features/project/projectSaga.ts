import {IPaginationResponse, IResponseData} from './../../common/types';
import {call, takeLatest, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import projectApi from './api';
import {
    IDoCommunityTaskData,
    IProject,
    IProjectFieldOptions,
    IProjectsByPhrase, IPurchaseData,
    IRegisterProjectData,
    IRegistrationInfo
} from './types';
import {projectActions} from './projectSlice';

function* fetchProjects(action: PayloadAction<any>) {
    try {
        const response: IPaginationResponse<IProject[]> = yield call(
            projectApi.admin.fetchProjects,
            action.payload
        );
        yield put(projectActions.fetchProjectsSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.fetchProjectsFailure({status, data: data}));
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
        const {status, data} = err.response;
        yield put(projectActions.createProjectFailure({status, data: data}));
    }
}

function* fetchFieldOptions() {
    try {
        const response: IResponseData<IProjectFieldOptions> = yield call(
            projectApi.admin.fetchFieldOptions
        );
        yield put(projectActions.fetchFieldOptionsSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(
            projectActions.fetchFieldOptionsFailure({status, data: data})
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
        const {status, data} = err.response;
        yield put(projectActions.editProjectFailure({status, data: data}));
    }
}

function* fetchProjectsByPhrase() {
    try {
        const response: IResponseData<IProjectsByPhrase> = yield call(
            projectApi.app.fetchProjectsByPhrase
        );
        yield put(projectActions.fetchProjectsByPhraseSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.fetchProjectsByPhraseFailure({status, data: data}));
    }
}

function* fetchProjectBySlug(action: PayloadAction<{ slug: string }>) {
    try {
        const response: IResponseData<IProject> = yield call(
            projectApi.app.fetchProjectBySlug, action.payload.slug
        );
        yield put(projectActions.fetchProjectBySlugSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.fetchProjectBySlugFailure({status, data: data}));
    }
}

function* fetchProjectById(action: PayloadAction<string>) {
    try {
        const response: IResponseData<IProject> = yield call(
            projectApi.admin.fetchById, action.payload
        );
        yield put(projectActions.fetchProjectByIdSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.fetchProjectByIdFailure({status, data: data}));
    }
}

function* appFetchWhitelistRegistrationInfo(action: PayloadAction<{ project: string, user: string }>) {
    try {
        const response: IResponseData<IRegistrationInfo> = yield call(
            projectApi.app.fetchWhitelistRegistrationInfo, action.payload.project, action.payload.user
        );
        yield put(projectActions.appFetchWhitelistRegistrationInfoSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.appFetchWhitelistRegistrationInfoFailure({status, data: data}));
    }
}

function* appRegisterProject(action: PayloadAction<{ project: string, data: IRegisterProjectData }>) {
    try {
        const response: IResponseData<IRegistrationInfo> = yield call(
            projectApi.app.registerProject, action.payload.project, action.payload.data
        );
        yield put(projectActions.appRegisterProjectSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.appRegisterProjectFailure({status, data: data}));
    }
}

function* appDoCommunityTask(action: PayloadAction<{ project: string, data: IDoCommunityTaskData }>) {
    try {
        const response: IResponseData<IRegistrationInfo> = yield call(
            projectApi.app.doCommunityTask, action.payload.project, action.payload.data
        );
        yield put(projectActions.appDoCommunityTaskSuccessfully(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.appDoCommunityTaskFailure({status, data: data}));
    }
}

function* appPurchase(action: PayloadAction<{ projectId: string, data: IPurchaseData }>) {
    try {
        const response: IResponseData<IRegistrationInfo> = yield call(
            projectApi.app.purchase, action.payload.projectId, action.payload.data
        );
        yield put(projectActions.appPurchaseSuccess(response));
    } catch (err: any) {
        const {status, data} = err.response;
        yield put(projectActions.appPurchaseFailure({status, data: data}));
    }
}

export default function* projectSaga() {
    yield takeLatest(projectActions.fetchProjects.type, fetchProjects);
    yield takeLatest(projectActions.createProject.type, createProject);
    yield takeLatest(projectActions.fetchFieldOptions.type, fetchFieldOptions);
    yield takeLatest(projectActions.editProject.type, editProject);
    yield takeLatest(projectActions.fetchProjectsByPhrase.type, fetchProjectsByPhrase);
    yield takeLatest(projectActions.fetchProjectBySlug.type, fetchProjectBySlug);
    yield takeLatest(projectActions.fetchProjectById.type, fetchProjectById);
    yield takeLatest(projectActions.appFetchWhitelistRegistrationInfo.type, appFetchWhitelistRegistrationInfo);
    yield takeLatest(projectActions.appRegisterProject.type, appRegisterProject);
    yield takeLatest(projectActions.appDoCommunityTask.type, appDoCommunityTask);
    yield takeLatest(projectActions.appPurchase.type, appPurchase);
}
