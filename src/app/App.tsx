import React, {useEffect} from 'react';
import {Messages} from "./messages/Messages";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";
import {useAppDispatch, useAppSelector} from "../utils/hook/hook";
import {startMessagesListening, stopMessagesListening} from "../bll/reducers/chat-reducer";

function App() {

    const status = useAppSelector(state => state.Chat.status)

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
