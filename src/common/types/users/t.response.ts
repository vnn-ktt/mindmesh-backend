export interface TUserCreateResponse {
    id: number;
    email: string;
}

export interface TUserLoginResponse {
    accessToken: string;
}

export interface TUserSelectResponse {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
    createdAt: Date;
    blocked: boolean | null;
}