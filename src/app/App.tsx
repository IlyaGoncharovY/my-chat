import React, {useEffect} from 'react';
import {Messages} from "./messages/Messages";
import {useAppDispatch, useAppSelector} from "../utils/hook/hook";
import {startMessagesListening, stopMessagesListening} from "../bll/reducers/chat-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginForm} from "./login/LoginForm";
import {PATH} from "../utils/path/path";
import {initializedAppTC} from "../bll/reducers/app-reducer";
import {logOutTC} from "../bll/reducers/auth-reducer";


function App() {

    const status = useAppSelector(state => state.Chat.status)
    const isInitialized = useAppSelector(state => state.App.isInitialized)

    const dispatch = useAppDispatch()

    const LogOutHandler = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(initializedAppTC())
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    if (!isInitialized) {
        return <div>...Loading</div>
    }

    return (
        <div>
            {status === "error" ? <div>Please refresh page!</div> :
                <>
                    <button onClick={LogOutHandler}>LogOut</button>
                    <Routes>
                        <Route path={PATH.LOGIN} element={<LoginForm/>}/>
                        <Route path={PATH.MAIN} element={<Navigate to={PATH.CHAT_PAGE}/>}/>
                        <Route path={PATH.CHAT_PAGE} element={<Messages/>}/>
                    </Routes>
                </>
            }
        </div>
    )
}

export default App;
