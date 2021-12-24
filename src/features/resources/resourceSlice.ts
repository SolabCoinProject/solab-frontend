import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry, IResourceState } from './types';

const initialState: IResourceState = {
    countries: [],
    isFetchingCountries: false,
};

export const resourceSlice = createSlice({
    name: 'resource',
    initialState,
    reducers: {
        fetchCountries: (state) => {
            state.isFetchingCountries = true;
        },
        fetchCountriesSuccess: (state, action: PayloadAction<ICountry[]>) => {
            state.isFetchingCountries = false;
            state.countries = action.payload;
        },
        fetchCountriesFailure: (state) => {
            state.isFetchingCountries = false;
            state.countries = [];
        },
    },
});

export const resourceActions = resourceSlice.actions;

export default resourceSlice.reducer;
