import { AxiosResponse } from 'axios';
import { resourceActions } from './resourceSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ICountry } from './types';
import resourceApi from './api';

function* fetchCountries() {
    try {
        const response: AxiosResponse<ICountry[]> = yield call(
            resourceApi.country.getCountries
        );
        const countries: ICountry[] = response.data.sort((a, b) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        yield put(resourceActions.fetchCountriesSuccess(countries));
    } catch (err) {
        yield put(resourceActions.fetchCountriesFailure());
    }
}

export default function* resourceSaga() {
    yield takeLatest(resourceActions.fetchCountries.type, fetchCountries);
}
