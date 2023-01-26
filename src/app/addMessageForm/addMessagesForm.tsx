import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hook/hook";
import {sendMessage} from "../../bll/reducers/chat-reducer";

export const AddMessagesForm = () => {

    const [message, setMessage] = useState("")
    const status = useAppSelector(state => state.Chat.status)

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
            <button disabled={status !== "ready"} onClick={sendMessageHandler}>send</button>
        </div>
    );
};

