import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ChatActionType, ChatReducer} from "./reducers/chat-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {authActionType, AuthReducer} from "./reducers/auth-reducer";

type RootActionType = ChatActionType | authActionType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, RootActionType>


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootActionType>

let rootReducer = combineReducers({
    Chat: ChatReducer,
    Auth: AuthReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))