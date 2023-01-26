import {authAPI} from "../../api/authAPI";
import {AppThunk} from "../store";

type loginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type authActionType = setUserDataACType

export const AuthReducer = (state: initialStateType = initialState, action: authActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/SET-DATA":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

type setUserDataACType = ReturnType<typeof setUserDataAC>
const setUserDataAC = (id: number | null,
                       email: string | null,
                       login: string | null,
                       isAuth: boolean) => {
    return {
        type: "AUTH/SET-DATA",
        payload: {
            id, email, login, isAuth
        }
    } as const
}

export const getUserData = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        let {id, email, login} = res.data.data
        if (res.data.resulCode === 0) {
            dispatch(setUserDataAC(id, email, login, true))
        }
    } catch (e) {
        console.log({e})
    }
}

export const login = (formData: loginParamsType) : AppThunk => async dispatch => {
    try {
        const res = await authAPI.login(formData)
        if (res.data.resultCode === 0) {
            dispatch(getUserData())
        }
    } catch (e) {
        console.log({e})
    }
}

export const logOut = () : AppThunk => async dispatch => {
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    } catch (e) {
        console.log({e})
    }
}