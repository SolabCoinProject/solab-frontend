import { all } from 'redux-saga/effects';
import userSaga from '../features/user/userSaga';
import tierSaga from '../features/tier/tierSaga';

export default function* rootSaga() {
    yield all([userSaga(), tierSaga()]);
}
