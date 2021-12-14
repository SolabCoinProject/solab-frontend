import { solabApiUrl } from './../config/app';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
    baseURL: solabApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        const accessToken = localStorage.getItem('accessToken');
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        const { newAccessToken } = response.data;
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
        }
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
