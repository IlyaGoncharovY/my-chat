import React, {useEffect, useState} from 'react';
import './App.css';
import {Messages} from "./messages/Messages";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";


export type ChatMessageType = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}

function App() {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)


    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            ws?.removeEventListener("close", closeHandler)
            ws?.close()

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessagesForm wsChannel={wsChannel}/>
        </div>
    )
}

export default App;
