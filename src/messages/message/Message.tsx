import React from 'react';
import {ChatMessageTypeAPI} from "../../api/chatAPI";


type MessageType = {
   message: ChatMessageTypeAPI
}

export const Message = React.memo((props: MessageType) => {

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
});

