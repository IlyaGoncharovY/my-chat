import React, {useEffect, useRef} from 'react';
import {Message} from './message/Message';
import {ChatMessageType} from "../api/chatAPI";
import {useSelector} from "react-redux";
import {AppStateType} from "../bll/store";

export const Messages = () => {

    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.Chat.messages)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div style={{height: "400px", overflowY: "auto"}}>
            {messages.map((el, index) => <Message message={el} key={index}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

