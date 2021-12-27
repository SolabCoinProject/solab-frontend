import {
    IPaginationResponse,
    IResponseData,
    IResponseFailure,
} from './../../common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject, IProjectState, IProjectFieldOptions } from './types';
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
        isCreatingProject: false,
        isFetchingFieldOptions: false,
        fieldOptions: {
            taskTypes: [],
            keyMetricUnitPoses: [],
            socialTypes: [],
            keyMetricTypes: [],
        },
        isEditProjectModalOpen: false,
        editingProject: null,
        isEditingProject: false,
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
                toast.error('Something went wrong!');
            }
        },
        createProject: (
            state,
            action: PayloadAction<Omit<IProject, '_id'>>
        ) => {
            state.admin.isCreatingProject = true;
        },
        createProjectSuccess: (
            state,
            action: PayloadAction<IResponseData<IProject>>
        ) => {
            state.admin.isCreatingProject = false;
            state.admin.isCreateProjectModalOpen = false;
            state.admin.reload = true;
            toast.success(action.payload.message);
        },
        createProjectFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isCreatingProject = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },
        setReload: (state, action: PayloadAction<boolean>) => {
            state.admin.reload = action.payload;
        },
        fetchFieldOptions: (state) => {
            state.admin.isFetchingFieldOptions = true;
        },
        fetchFieldOptionsSuccess: (
            state,
            action: PayloadAction<IResponseData<IProjectFieldOptions>>
        ) => {
            state.admin.isFetchingFieldOptions = false;
            state.admin.fieldOptions = action.payload.data;
        },
        fetchFieldOptionsFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isFetchingFieldOptions = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },
        openEditProjectModal: (state, action: PayloadAction<IProject>) => {
            state.admin.isEditProjectModalOpen = true;
            state.admin.editingProject = action.payload;
        },
        closeEditProjectModal: (state) => {
            state.admin.isEditProjectModalOpen = false;
        },

        editProject: (
            state,
            action: PayloadAction<{ id: string; data: Omit<IProject, '_id'> }>
        ) => {
            state.admin.isEditingProject = true;
        },

        editProjectSuccess: (
            state,
            action: PayloadAction<IResponseData<IProject>>
        ) => {
            state.admin.isEditingProject = false;
            state.admin.isEditProjectModalOpen = false;
            state.admin.reload = true;
            toast.success(action.payload.message);
        },
        editProjectFailure: (
            state,
            action: PayloadAction<IResponseFailure>
        ) => {
            state.admin.isCreatingProject = false;
            if (action.payload.status === 401) {
                toast.error(action.payload.data.message);
                localStorage.removeItem('accessToken');
            } else if (action.payload.status !== 500) {
                toast.error(action.payload.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        },
    },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
