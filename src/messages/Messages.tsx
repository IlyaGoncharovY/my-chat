import React, {useEffect, useState} from 'react';
import {Message} from './message/Message';
import {ChatMessageType} from "../App";


type MessagesType = {
    wsChannel: WebSocket | null
}

export const Messages = (props: MessagesType) => {

    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setChatMessages((prevMessage) => [...prevMessage, ...newMessage])
        }

        props.wsChannel?.addEventListener("message", messageHandler)

        return () => {
            props.wsChannel?.removeEventListener("message", messageHandler)
        }
    }, [props.wsChannel])

    return (
        <div style={{height: "400px", overflowY: "auto"}}>
            {chatMessages.map((el, index) => <Message message={el} key={index}/>)}
        </div>
    );
};

