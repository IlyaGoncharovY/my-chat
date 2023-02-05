import {AppThunk} from "../store";
import {authAPI, LoginParamsType, StatusCode} from "../../api/authAPI";

let initialState = {
    isLoggedIn: false
}

type initialStateType = typeof initialState
export type AuthReducerActionType = setIsLoggedInACType

export const AuthReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN": {
            return {
                ...state,
                isLoggedIn: action.value
            }
        }
        default:
            return state
    }
}


type setIsLoggedInACType = ReturnType<typeof setIsLoggedIdAC>
export const setIsLoggedIdAC = (value: boolean) => {
    return {
        type: "AUTH/SET-IS-LOGGED-IN",
        value
    } as const
}

export const loginTC = (userData: LoginParamsType) : AppThunk => async dispatch => {
    try {
        const res = await authAPI.login(userData)
        if (res.data.resultCode === StatusCode.Ok) {
            dispatch(setIsLoggedIdAC(true))
        }
    } catch (e) {
        console.log({e})
    }
}

export const logOutTC = () : AppThunk => async dispatch => {
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === StatusCode.Ok) {
            dispatch(setIsLoggedIdAC( false))
        }
    } catch (e) {
        console.log({e})
    }
}


