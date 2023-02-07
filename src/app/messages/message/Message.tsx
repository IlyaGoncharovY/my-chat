import React from 'react';
import {ChatMessageTypeAPI} from "../../../api/chatAPI";
import s from "./Message.module.scss"
import {Container} from "react-bootstrap";

type MessageType = {
    message: ChatMessageTypeAPI
}

export const Message = React.memo((props: MessageType) => {

    return (
        <Container className={s.messageBox}>
                <div className={s.messageBody}>
                    <div>
                        <img src={props.message.photo} style={{width: "40px"}} alt={"avatar"}/>
                    </div>
                    <br/>
                    <span>
                {props.message.userName}
            </span>
                    <div>
                        <b>{props.message.message}</b>
                    </div>
                    <hr/>
                </div>
        </Container>

    );
});

