import {AppThunk} from "../store";
import {authAPI, StatusCode} from "../../api/authAPI";
import {setIsLoggedIdAC} from "./auth-reducer";

let initialState = {
    isInitialized: false
}

type initialStateType = typeof initialState
export type AppReducerActionType = setInitializedACType

export const appReducer = (state: initialStateType = initialState, action: AppReducerActionType): initialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED": {
            return {
                ...state,
                isInitialized: action.value
            }
        }
        default:
            return state
    }
}

type setInitializedACType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (value: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        value
    } as const
}

export const initializedAppTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === StatusCode.Ok) {
            dispatch(setIsLoggedIdAC(true))
        }
    } catch (e) {
        console.log({e})
    } finally {
        dispatch(setInitializedAC(true))
    }
}