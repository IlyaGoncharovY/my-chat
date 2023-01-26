import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "3464b8a0-c9aa-4269-a1f1-731b09a66663"
    }
})

export const authAPI = {
    me() {
        return instance.get("auth/me")
    },
    login(data: LoginParamsType) {
        return instance.post("auth/login", data)
    },
    logout() {
        return instance.delete("auth/login")
    }
}

type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}
