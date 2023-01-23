import {ChatAPI, ChatMessageType} from "../../api/chatAPI";
import {AppThunk} from "../store";
import {Dispatch} from "react";

const initialState = {
    messages: [] as ChatMessageType[]
}

type InitialStateType = typeof initialState

export type ChatActionType = setMessagesACType

export const ChatReducer = (state: InitialStateType = initialState, action: ChatActionType): InitialStateType => {
    switch (action.type) {
        case "CHAT-SET-MESSAGE":
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }

        default:
            return state
    }
}


type setMessagesACType = ReturnType<typeof setMessagesAC>
export const setMessagesAC = (messages: ChatMessageType[]) => {
    return {
        type: "CHAT-SET-MESSAGE",
        messages
    } as const
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreate = (dispatch: Dispatch<any>) => {
    if(_newMessageHandler === null) {
       _newMessageHandler = (messages) => {
           dispatch(setMessagesAC(messages))
       }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): AppThunk => async dispatch => {
    try {
        ChatAPI.start()
        ChatAPI.subscribe(newMessageHandlerCreate(dispatch))
    } catch (e) {
        console.log(e)
    }
}

export const stopMessagesListening = (): AppThunk => async dispatch => {
    try {
        ChatAPI.unsubscribe(newMessageHandlerCreate(dispatch))
        ChatAPI.stop()
    } catch (e) {
        console.log(e)
    }
}

export const sendMessage = (message: string): AppThunk => async dispatch => {
    try {
        ChatAPI.sendMessage(message)
    } catch (e) {
        console.log(e)
    }
}