export interface IConfig {
    slug: string,
    value: number | string
}

export interface IConfigState {
    admin: {
        solabPriceConfig: IConfig;
        isFetchingSolabPriceConfig: boolean;
        isUpdatingConfig: boolean;
    }
}