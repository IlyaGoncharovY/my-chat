import React from 'react';
import {ChatMessageType} from "../../api/chatAPI";


type MessageType = {
   message: ChatMessageType
}

export const Message = (props: MessageType) => {
    return (
        <div>
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
    );
};

