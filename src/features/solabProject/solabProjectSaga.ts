import { solabProjectActions } from './solabProjectSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ISolabProject } from './types';
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

export default function* solabProjectSaga() {
    yield takeLatest(
        solabProjectActions.fetchSolabProject.type,
        fetchSolabProject
    );
}
