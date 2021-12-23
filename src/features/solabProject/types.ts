export interface ISolabProject {
    _id: string;
    name: string;
    slug: string;
    pubKey: string;
    description: string;
    thumbnail: string;
    token: {
        thumbnail: string;
        address: string;
        symbol: string;
        category: string;
        others?: { label: string; value: string }[];
    };
    keyMetrics?: {
        value: string | number;
        label: string;
        unit?: string;
        unitPosition?: number;
        valueType?: number;
    }[];
    social?: {
        socialType: number;
        link: string;
    }[];
    buyAmountOptions: number[];
    details?: { title: string; content: string }[];
    idoStartDate: string;
    idoEndDate: string;
    task?: {
        uuid: string;
        taskType: number;
        settings: any;
        doneBy: string[];
        rewardTickets: number;
    }[];
    isClosed: boolean;
    media: { mediaType: number; link: string; thumbnail: string }[];
    firstPayment: string;
    lastPayment: string;
}

export interface ISolabProjectState {
    app: {
        solabProject: ISolabProject | null;
        isFetchingSolabProject: boolean;
    };
}
