import { IPaginationResponse, IResponseFailure } from './../../common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject, IProjectState } from './types';
import { toast } from 'react-toastify';

const initialState: IProjectState = {
    admin: {
        projects: {
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
        isFetchingProject: false,
        isCreateProjectModalOpen: false,
        reload: false,
    },
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        openCreateProjectModal: (state) => {
            state.admin.isCreateProjectModalOpen = true;
        },
        closeCreateProjectModal: (state) => {
            state.admin.isCreateProjectModalOpen = false;
        },
        fetchProjects: (state, action: PayloadAction<any>) => {
            state.admin.isFetchingProject = true;
        },
        fetchProjectsSuccess: (
            state,
            action: PayloadAction<IPaginationResponse<IProject[]>>
        ) => {
            state.admin.isFetchingProject = false;
            state.admin.projects = action.payload.data;
        },
        fetchProjectsFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingProject = false;
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

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
