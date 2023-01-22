import React from 'react';
import './App.css';
import {Messages} from "./messages/Messages";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";


export const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type ChatMessageType = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}

function App() {

    return (
        <div>
            <Messages/>
            <AddMessagesForm/>
        </div>
    )
}

export default App;
