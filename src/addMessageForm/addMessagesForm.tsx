import React, {ChangeEvent, useEffect, useState} from 'react';

type AddMessagesFormType = {
    wsChannel: WebSocket | null
}

export const AddMessagesForm = (props: AddMessagesFormType) => {

    const [message, setMessage] = useState("")
    const [webS, setWebS] = useState<"pending" | "ready">("pending")

    useEffect(() => {
        let openHandler = () => {
            setWebS("ready")
        }

        props.wsChannel?.addEventListener("open", openHandler)

        return () => {
            props.wsChannel?.removeEventListener("open", openHandler)
        }
    }, [props.wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        props.wsChannel?.send(message)
        setMessage("")
    }

    const onChangeSetMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <div>
            <textarea onChange={onChangeSetMessage} value={message}/>
            <button disabled={props.wsChannel === null || webS !== "ready"} onClick={sendMessage}>send</button>
        </div>
    );
};

