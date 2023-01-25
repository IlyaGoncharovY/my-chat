import {ChatAPI, ChatMessageTypeAPI} from "../../api/chatAPI";
import {AppThunk} from "../store";
import {Dispatch} from "react";
import {v1} from "uuid"

export type statusType = "pending" | "ready" | "error"

export type ChatMassageType = ChatMessageTypeAPI & {id: string}

const initialState = {
    messages: [] as ChatMassageType[],
    status: "pending" as statusType
}

type InitialStateType = typeof initialState

export type ChatActionType = setMessagesACType | changeStatusACType

export const ChatReducer = (state: InitialStateType = initialState, action: ChatActionType): InitialStateType => {
    switch (action.type) {
        case "CHAT/SET-MESSAGE":
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(el => ({...el, id: v1()}))]
                    .filter((el, index, array) => index >= array.length - 100)
            }
        case "CHAT/CHANGE-STATUS":
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}


type setMessagesACType = ReturnType<typeof setMessagesAC>
export const setMessagesAC = (messages: ChatMessageTypeAPI[]) => {
    return {
        type: "CHAT/SET-MESSAGE",
        messages
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (status: statusType) => {
    return {
        type: "CHAT/CHANGE-STATUS",
        status
    } as const
}

let _newMessageHandler: ((messages: ChatMessageTypeAPI[]) => void) | null = null

const newMessageHandlerCreate = (dispatch: Dispatch<any>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessagesAC(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: statusType) => void) | null = null

const statusHandlerCreate = (dispatch: Dispatch<any>) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(changeStatusAC(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): AppThunk => async dispatch => {
    try {
        ChatAPI.start()
        ChatAPI.subscribe("message-received",newMessageHandlerCreate(dispatch))
        ChatAPI.subscribe("status-changed",statusHandlerCreate(dispatch))
    } catch (e) {
        console.log(e)
    }
}

export const stopMessagesListening = (): AppThunk => async dispatch => {
    try {
        ChatAPI.unsubscribe("message-received", newMessageHandlerCreate(dispatch))
        ChatAPI.subscribe("status-changed",statusHandlerCreate(dispatch))
        ChatAPI.stop()
    } catch (e) {
        console.log(e)
    }
}

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    try {
        ChatAPI.sendMessage(message)
    } catch (e) {
        console.log(e)
    }
}