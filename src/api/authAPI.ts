import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "3464b8a0-c9aa-4269-a1f1-731b09a66663"
    }
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseLoginType<{ userId: number }>>>("auth/login", data)
    },
    me() {
        return instance.get<ResponseLoginType<MeType>>("auth/me")
    },
    logout() {
        return instance.delete<ResponseLoginType>("auth/login")
    },

}

type MeType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean
    captcha?: string
}

export type ResponseLoginType<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export enum StatusCode {
    Ok,
    Error
}
