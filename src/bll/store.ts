import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ChatActionType, ChatReducer} from "./reducers/chat-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {AuthReducer, AuthReducerActionType} from "./reducers/auth-reducer";
import {appReducer, AppReducerActionType} from "./reducers/app-reducer";

type RootActionType = ChatActionType | AppReducerActionType | AuthReducerActionType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, RootActionType>


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootActionType>

let rootReducer = combineReducers({
    Chat: ChatReducer,
    Auth: AuthReducer,
    App: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store