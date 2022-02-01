import {IResponseData} from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import {
    IDoCommunityTaskData,
    IProject,
    IProjectFieldOptions,
    IProjectsByPhrase, IPurchaseData,
    IRegisterProjectData,
    IRegistrationInfo
} from './types';

const projectApi = {
    admin: {
        fetchProjects: (params: any): Promise<IResponseData<IProject[]>> => {
            const url = 'admin/project/';
            return axiosClient.get(url, {
                params,
            });
        },
        createProject(
            data: Omit<IProject, '_id'>
        ): Promise<IResponseData<IProject>> {
            const url = 'admin/project/create';
            return axiosClient.post(url, data);
        },

        fetchFieldOptions: (): Promise<IResponseData<IProjectFieldOptions>> => {
            const url = 'admin/project/field-options';
            return axiosClient.get(url);
        },
        editProject: (
            id: string,
            data: Omit<IProject, '_id'>
        ): Promise<IResponseData<IProject>> => {
            const url = `admin/project/${id}`;
            return axiosClient.put(url, data);
        },
        fetchById: (id: string): Promise<IResponseData<IProject>> => {
            const url = `admin/project/${id}`;
            return axiosClient.get(url);
        },
    },
    app: {
        fetchProjectsByPhrase: (): Promise<IResponseData<IProjectsByPhrase>> => {
            const url = 'app/project/projects-by-phrase';
            return axiosClient.get(url);
        },
        fetchProjectBySlug: (slug: string): Promise<IResponseData<IProject>> => {
            const url = `app/project/${slug}`;
            return axiosClient.get(url);
        },
        fetchWhitelistRegistrationInfo: (project: string, user: string): Promise<IResponseData<IRegistrationInfo>> => {
            const url = `app/project/${project}/whitelist-registration/${user}`;
            return axiosClient.get(url);
        },
        registerProject: (project: string, data: IRegisterProjectData): Promise<IResponseData<IRegistrationInfo>> => {
            const putData = {...data};
            const storedRefs = JSON.parse(
                localStorage.getItem('storeRefs') ?? JSON.stringify([])
            );
            const refData = storedRefs.find(
                (storedData) => storedData.p === project
            );
            if (refData) {
                putData.refId = refData.u;
            }
            const url = `app/project/${project}/register`;
            return axiosClient.put(url, putData);
        },
        doCommunityTask: (project: string, data: IDoCommunityTaskData): Promise<IResponseData<IRegistrationInfo>> => {
            const url = `app/project/${project}/do-task-community`;
            return axiosClient.put(url, data);
        },
        purchase: (projectId: string, data: IPurchaseData): Promise<IResponseData<IRegistrationInfo>> => {
            const putData = {...data};
            const storedRefs = JSON.parse(
                localStorage.getItem('storeRefs') ?? JSON.stringify([])
            );
            const refData = storedRefs.find(
                (storedData) => storedData.p === projectId
            );
            if (refData) {
                putData.refId = refData.u;
            }
            const url = `app/project/${projectId}/purchase`;
            return axiosClient.put(url, putData);
        },
    }
};

export default projectApi;
