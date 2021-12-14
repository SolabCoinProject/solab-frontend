export interface IStaff {
    username: string;
    status: Number;
    role: {
        name: string;
        permissions: [String] | undefined;
        haveFullControl: Boolean;
    };
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IUserState {
    admin: {
        staff: IStaff | null;
        isLoading: boolean;
        isLoggingIn: boolean;
        isLoggedIn: boolean;
        authenticated: boolean;
    };
}

export interface ILoginParams {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    message: string;
}




