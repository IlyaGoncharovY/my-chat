import React from 'react';
import {Message} from './message/Message';
import {ChatMessageType} from "../api/chatAPI";
import {useSelector} from "react-redux";
import {AppStateType} from "../bll/store";

export const Messages = () => {

   const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.Chat.messages)

    return (
        <div style={{height: "400px", overflowY: "auto"}}>
            {messages.map((el, index) => <Message message={el} key={index}/>)}
        </div>
    );
};

