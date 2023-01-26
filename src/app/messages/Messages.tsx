import React, {useEffect, useRef, useState} from 'react';
import {Message} from './message/Message';
import {useAppSelector} from "../../utils/hook/hook";

export const Messages = React.memo(() => {

    const messages = useAppSelector(state => state.Chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

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
        if (autoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (
        <div style={{height: "400px", overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((el) => <Message message={el} key={el.id}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
});

