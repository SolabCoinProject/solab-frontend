import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IConfig, IConfigState } from './types';
import { solabPriceSlug } from './constants';
import { IResponseData, IResponseFailure } from '../../common/types';

const initialState: IConfigState = {
    admin: {
        solabPriceConfig: {
            slug: solabPriceSlug,
            value: 0,
        },
        isFetchingSolabPriceConfig: false,
        isUpdatingConfig: false,
    },
    app: {
        solabPriceConfig: {
            slug: solabPriceSlug,
            value: 0,
        },
        isFetchingSolabPriceConfig: false,
    },
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        //admin
        fetchConfigBySlug: (state, action: PayloadAction<{ slug: string }>) => {
            state.admin.isFetchingSolabPriceConfig = true;
        },
        fetchConfigBySlugSuccessfully: (
            state,
            action: PayloadAction<IResponseData<IConfig>>
        ) => {
            state.admin.isFetchingSolabPriceConfig = false;
            state.admin.solabPriceConfig = action.payload.data;
        },
        fetchConfigBySlugFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingSolabPriceConfig = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },
        updateConfigBySlug: (
            state,
            action: PayloadAction<{ slug: string; value: string | number }>
        ) => {
            state.admin.isUpdatingConfig = true;
        },
        updateConfigBySlugSuccessfully: (
            state,
            action: PayloadAction<IResponseData<IConfig>>
        ) => {
            state.admin.isUpdatingConfig = false;
            state.admin.solabPriceConfig = action.payload.data;
            toast.success('Updated successfully!');
        },
        updateConfigBySlugFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isUpdatingConfig = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },
        //app

        appFetchConfigBySlug: (
            state,
            action: PayloadAction<{ slug: string }>
        ) => {
            state.app.isFetchingSolabPriceConfig = true;
        },
        appFetchConfigBySlugSuccessfully: (
            state,
            action: PayloadAction<IResponseData<IConfig>>
        ) => {
            state.app.isFetchingSolabPriceConfig = false;
            state.app.solabPriceConfig = action.payload.data;
        },
        appFetchConfigBySlugFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.app.isFetchingSolabPriceConfig = false;
        },
    },
});

export const configActions = configSlice.actions;
export default configSlice.reducer;
