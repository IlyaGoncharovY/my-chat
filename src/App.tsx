import React, {useEffect} from 'react';
import './App.css';
import {Messages} from "./messages/Messages";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";
import {useAppDispatch} from "./utils/hook/hook";
import {startMessagesListening, stopMessagesListening} from "./bll/reducers/chat-reducer";


function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            <Messages/>
            <AddMessagesForm/>
        </div>
    )
}

export default App;
