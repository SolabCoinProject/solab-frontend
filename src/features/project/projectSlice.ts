import {
  IPaginationResponse,
  IResponseData,
  IResponseFailure,
} from "./../../common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProject,
  IProjectState,
  IProjectFieldOptions,
  IProjectsByPhrase,
  IRegistrationInfo,
  IRegisterProjectData,
  IDoCommunityTaskData,
  IPurchaseData,
} from "./types";
import { toast } from "react-toastify";
import toastConfigs from "../../config/toast";

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
    isFetchingProjectById: false,
  },
  app: {
    projectsByPhrase: {
      all: [],
      whitelist: [],
      upcoming: [],
      sale: [],
      distribution: [],
      tba: [],
    },
    isFetchingProjectByPhrase: false,
    isFetchingProjectBySlug: false,
    project: null,
    isFetchingRegistrationInfo: false,
    whitelistRegistrationInfo: null,
    isRegisteringProject: false,
    isTaskModalOpen: false,
    openTask: null,
    isDoingCommunityTask: false,
    isPurchasing: false,
  },
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Admin
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
    fetchProjectsFailure: (state, action: PayloadAction<IResponseFailure>) => {
      state.admin.isFetchingProject = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    },
    createProject: (state, action: PayloadAction<Omit<IProject, "_id">>) => {
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
    createProjectFailure: (state, action: PayloadAction<IResponseFailure>) => {
      state.admin.isCreatingProject = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
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
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
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
      action: PayloadAction<{ id: string; data: Omit<IProject, "_id"> }>
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
    editProjectFailure: (state, action: PayloadAction<IResponseFailure>) => {
      state.admin.isCreatingProject = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    },

    fetchProjectById: (state, action: PayloadAction<string>) => {
      state.admin.isFetchingProjectById = true;
    },

    fetchProjectByIdSuccess: (
      state,
      action: PayloadAction<IResponseData<IProject>>
    ) => {
      state.admin.isFetchingProjectById = false;
      state.admin.editingProject = action.payload.data;
    },

    fetchProjectByIdFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.admin.isFetchingProjectById = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    },

    // App

    fetchProjectsByPhrase: (state) => {
      state.app.isFetchingProjectByPhrase = true;
    },

    fetchProjectsByPhraseSuccess: (
      state,
      action: PayloadAction<IResponseData<IProjectsByPhrase>>
    ) => {
      state.app.isFetchingProjectByPhrase = false;
      state.app.projectsByPhrase = action.payload.data;
    },
    fetchProjectsByPhraseFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.app.isFetchingProjectByPhrase = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    },

    fetchProjectBySlug: (state, action: PayloadAction<{ slug: string }>) => {
      state.app.isFetchingProjectBySlug = true;
    },

    fetchProjectBySlugSuccess: (
      state,
      action: PayloadAction<IResponseData<IProject>>
    ) => {
      state.app.isFetchingProjectBySlug = false;
      state.app.project = action.payload.data;
    },
    fetchProjectBySlugFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.app.isFetchingProjectBySlug = false;
      if (action.payload.status === 401) {
        toast.error(action.payload.data.message);
        localStorage.removeItem("accessToken");
      } else if (action.payload.status !== 500) {
        toast.error(action.payload.data.message, toastConfigs.error);
      } else {
        toast.error("Something went wrong!", toastConfigs.error);
      }
    },

    appFetchWhitelistRegistrationInfo: (
      state,
      action: PayloadAction<{ project: string; user: string }>
    ) => {
      state.app.isFetchingRegistrationInfo = true;
    },
    appFetchWhitelistRegistrationInfoSuccess: (
      state,
      action: PayloadAction<IResponseData<IRegistrationInfo>>
    ) => {
      state.app.isFetchingRegistrationInfo = false;
      state.app.whitelistRegistrationInfo = action.payload.data;
    },
    appFetchWhitelistRegistrationInfoFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.app.isFetchingRegistrationInfo = false;
      state.app.whitelistRegistrationInfo = null;
    },

    appRegisterProject: (
      state,
      action: PayloadAction<{
        project: string;
        data: IRegisterProjectData;
      }>
    ) => {
      state.app.isRegisteringProject = true;
    },
    appRegisterProjectSuccess: (
      state,
      action: PayloadAction<IResponseData<IRegistrationInfo>>
    ) => {
      state.app.isRegisteringProject = false;
      state.app.whitelistRegistrationInfo = action.payload.data;
    },
    appRegisterProjectFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.app.isRegisteringProject = false;
      if (action.payload.status !== 500) {
        toast.error(action.payload.data.message, toastConfigs.error);
      } else {
        toast.error("Something went wrong!", toastConfigs.error);
      }
    },
    openTaskModal: (state, action: PayloadAction<any>) => {
      state.app.isTaskModalOpen = true;
      state.app.openTask = action.payload;
    },
    closeTaskModal: (state) => {
      state.app.isTaskModalOpen = false;
      state.app.openTask = null;
    },
    appDoCommunityTask: (
      state,
      action: PayloadAction<{ project: string; data: IDoCommunityTaskData }>
    ) => {
      state.app.isDoingCommunityTask = true;
    },
    appDoCommunityTaskSuccessfully: (
      state,
      action: PayloadAction<IResponseData<IRegistrationInfo>>
    ) => {
      state.app.isDoingCommunityTask = false;
      state.app.whitelistRegistrationInfo = action.payload.data;
      state.app.isTaskModalOpen = false;
      state.app.openTask = null;
      toast.success("Task completed successfully!", toastConfigs.success);
    },
    appDoCommunityTaskFailure: (
      state,
      action: PayloadAction<IResponseFailure>
    ) => {
      state.app.isDoingCommunityTask = false;
      if (action.payload.status !== 500) {
        toast.error(action.payload.data.message, toastConfigs.error);
      } else {
        toast.error("Something went wrong!", toastConfigs.error);
      }
    },
    appPurchase: (
      state,
      action: PayloadAction<{ projectId: string; data: IPurchaseData }>
    ) => {
      state.app.isPurchasing = true;
    },
    appPurchaseSuccess: (
      state,
      action: PayloadAction<IResponseData<IRegistrationInfo>>
    ) => {
      state.app.isPurchasing = false;
      state.app.whitelistRegistrationInfo = action.payload.data;
    },
    appPurchaseFailure: (state, action: PayloadAction<IResponseFailure>) => {
      state.app.isPurchasing = false;
      if (action.payload.status !== 500) {
        toast.error(action.payload.data.message, toastConfigs.error);
      } else {
        toast.error("Something went wrong!", toastConfigs.error);
      }
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
