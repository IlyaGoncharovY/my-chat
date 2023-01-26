import React, {useEffect} from 'react';
import {Messages} from "./messages/Messages";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";
import {useAppDispatch} from "../utils/hook/hook";
import {startMessagesListening, statusType, stopMessagesListening} from "../bll/reducers/chat-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../bll/store";

function App() {

    const status = useSelector<AppStateType, statusType>(state => state.Chat.status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            {status === "error" ? <div>Please refresh page!</div> :
                <>
                    <Messages/>
                    <AddMessagesForm/>
                </>
            }
        </div>
    )
}

export default App;
