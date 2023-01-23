import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../utils/hook/hook";
import {sendMessage} from "../bll/reducers/chat-reducer";

export const AddMessagesForm = () => {

    const [message, setMessage] = useState("")

    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }

    const onChangeSetMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <div>
            <textarea onChange={onChangeSetMessage} value={message}/>
            <button disabled={false} onClick={sendMessageHandler}>send</button>
        </div>
    );
};

