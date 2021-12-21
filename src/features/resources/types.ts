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
