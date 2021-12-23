import { all } from 'redux-saga/effects';
import userSaga from '../features/user/userSaga';
import tierSaga from '../features/tier/tierSaga';
import projectSaga from '../features/project/projectSaga';
import resourceSaga from '../features/resources/resourceSaga';
import solabProjectSaga from '../features/solabProject/solabProjectSaga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        tierSaga(),
        projectSaga(),
        resourceSaga(),
        solabProjectSaga(),
    ]);
}
