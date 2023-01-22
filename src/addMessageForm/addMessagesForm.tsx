import React, {ChangeEvent, useState} from 'react';
import {wsChannel} from "../App";


export const AddMessagesForm = () => {

    const [message, setMessage] = useState("")

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage("")
    }

    const onChangeSetMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <div>
            <textarea onChange={onChangeSetMessage} value={message}/>
            <button onClick={sendMessage}>send</button>
        </div>
    );
};

