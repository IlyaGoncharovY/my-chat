import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../utils/hook/hook";
import {sendMessage, statusType} from "../../bll/reducers/chat-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";

export const AddMessagesForm = () => {

    const [message, setMessage] = useState("")
    const status = useSelector<AppStateType, statusType>(state => state.Chat.status)

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

