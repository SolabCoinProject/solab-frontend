export interface IPaginationResponse<T> {
    message: string;
    data: IPaginationData<T>;
}

export interface IPaginationData<T> {
    docs: T;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface IReduxAction<T> {
    type: string;
    payload: T;
}

export interface IResponseData<T> {
    data: T;
    newAccessToken: string | undefined;
    message: string;
}

export interface IResponseFailure {
    status: number;
    data: { message: String; error: any };
}
