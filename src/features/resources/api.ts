import { ICountry } from './types';
import axios from 'axios';

const resourceApi = {
    country: {
        getCountries: (): Promise<ICountry[]> => {
            const url = 'https://restcountries.com/v3.1/all?fields=name,flag';
            return axios.get(url);
        },
    },
};

export default resourceApi;
