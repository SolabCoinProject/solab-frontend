import {
    IPaginationResponse,
    IResponseData,
    IResponseFailure,
} from './../../common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITier, ITierState } from './types';
import { toast } from 'react-toastify';

const initialState: ITierState = {
    admin: {
        tiers: {
            docs: [],
            totalDocs: 0,
            limit: 0,
            totalPages: 0,
            page: 0,
            pagingCounter: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        },
        editingTier: null,
        loading: false,
        isCreateTierModalOpen: false,
        isEditTierModalOpen: false,
        reload: false,
    },
};

export const tierSlice = createSlice({
    name: 'tier',
    initialState,
    reducers: {
        fetchTiers: (state, action: PayloadAction<any>) => {
            state.admin.loading = true;
        },
        fetchTiersSuccess: (
            state,
            action: PayloadAction<IPaginationResponse<ITier[]>>
        ) => {
            state.admin.loading = false;
            state.admin.tiers = action.payload.data;
        },
        fetchTiersFailure: (state, action: PayloadAction<IResponseFailure>) => {
            state.admin.loading = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Server Error');
            }
        },
        openCreateTierModal: (state) => {
            state.admin.isCreateTierModalOpen = true;
        },
        closeCreateTierModal: (state) => {
            state.admin.isCreateTierModalOpen = false;
        },
        createTier: (state, action: PayloadAction<Omit<ITier, '_id'>>) => {
            state.admin.loading = true;
        },
        createTierSuccess: (
            state,
            action: PayloadAction<IResponseData<ITier>>
        ) => {
            state.admin.loading = false;
            state.admin.isCreateTierModalOpen = false;
            state.admin.reload = true;
            toast.success(action.payload.message);
        },
        createTierFailure: (state, action: PayloadAction<IResponseFailure>) => {
            state.admin.loading = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Server Error');
            }
        },
        setReload: (state, action: PayloadAction<boolean>) => {
            state.admin.reload = action.payload;
        },
        closeEditTierModal: (state) => {
            state.admin.isEditTierModalOpen = false;
        },
        openEditTierModal: (state, action: PayloadAction<ITier>) => {
            state.admin.isEditTierModalOpen = true;
            state.admin.editingTier = action.payload;
        },
        updateTier: (
            state,
            action: PayloadAction<{ id: string; data: Omit<ITier, '_id'> }>
        ) => {
            state.admin.loading = true;
        },
        updateTierSuccess: (
            state,
            action: PayloadAction<IResponseData<ITier>>
        ) => {
            state.admin.loading = false;
            state.admin.isEditTierModalOpen = false;
            state.admin.reload = true;
            toast.success(action.payload.message);
        },
        updateTierFailure: (state, action: PayloadAction<IResponseFailure>) => {
            state.admin.loading = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Server Error');
            }
        },
    },
});

export const tierActions = tierSlice.actions;

export default tierSlice.reducer;
