import React from 'react';
import {ChatMessageTypeAPI} from "../../../api/chatAPI";
import {Col, Container, Row} from "react-bootstrap";

type MessageType = {
    message: ChatMessageTypeAPI
}

export const Message = React.memo((props: MessageType) => {

    return (
        <Container>
            <Row xs={1} md={2}>
                <Col>
                    <img src={props.message.photo} style={{width: "40px", borderRadius: "7px"}} alt={"avatar"}/>
                </Col>
                <Col>
                    <b>{props.message.message}</b>
                </Col>
                <Col>
                    {props.message.userName}
                </Col>
            </Row>
            <hr/>
        </Container>

    );
});

