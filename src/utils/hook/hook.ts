import { AnyAction } from "redux";
import {ThunkDispatch} from "redux-thunk";
import {store} from "../../bll/store";
import {useDispatch} from "react-redux";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
// export type AppDispatch = any
export const useAppDispatch: () => AppDispatch = useDispatch
