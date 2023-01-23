import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ChatActionType, ChatReducer} from "./reducers/chat-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { RootState } from "../utils/hook/hook";

type RootActionType = ChatActionType

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootActionType>

let rootReducer = combineReducers({
    Chat: ChatReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))