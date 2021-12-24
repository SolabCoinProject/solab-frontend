import { GroupBase } from 'react-select';

export interface ICountry {
    name: {
        common: string;
    };
    flag: string;
}

export interface IResourceState {
    countries: ICountry[];
    isFetchingCountries: boolean;
}
