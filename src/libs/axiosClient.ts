import { solabBackendUrl } from './../config/app';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: solabBackendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
