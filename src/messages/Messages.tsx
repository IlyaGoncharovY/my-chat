import React, {useEffect, useState} from 'react';
import {Message} from './message/Message';
import {ChatMessageType, wsChannel} from "../App";


export const Messages = () => {

    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener("message", (e:MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setChatMessages((prevMessage)=>[...prevMessage, ...newMessage])
        })
    }, [])

    return (
        <div style={{height: "400px", overflowY: "auto"}}>
            {chatMessages.map((el, index) => <Message message={el} key={index}/>)}
        </div>
    );
};

