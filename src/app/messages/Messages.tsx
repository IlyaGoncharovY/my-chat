import React, {useEffect, useRef, useState} from 'react';
import {Message} from './message/Message';
import {useAppSelector} from "../../utils/hook/hook";
import {AddMessagesForm} from "./addMessageForm/addMessagesForm";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/path/path";

export const Messages = React.memo(() => {

    const messages = useAppSelector(state => state.Chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const isLoggedIn = useAppSelector(state => state.Auth.isLoggedIn)

    const [autoScrollActive, setAutoScrollActive] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !autoScrollActive && setAutoScrollActive(true)
        } else {
            autoScrollActive && setAutoScrollActive(false)
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        if (autoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
        return () => {
            setAutoScrollActive(false)
        }
    }, [isLoggedIn, messages])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <div style={{height: "400px", overflowY: "auto"}} onScroll={scrollHandler}>
                {messages.map((el) => <Message message={el} key={el.id}/>)}
                <div ref={messagesAnchorRef}></div>
            </div>
            <AddMessagesForm/>
        </>
    );
});

