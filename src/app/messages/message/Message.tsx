import React from 'react';
import {ChatMessageTypeAPI} from "../../../api/chatAPI";
import {Col, Container, Row} from "react-bootstrap";

type MessageType = {
    message: ChatMessageTypeAPI
}

export const Message = React.memo((props: MessageType) => {

    return (
        <Container className="m-3">
            <Row xs={1} md={2}>
                <Col>
                    <img src={props.message.photo} style={{width: "40px", borderRadius: "7px"}} alt={"avatar"}/>
                </Col>
                <Col className="bg-info bg-opacity-25" style={{borderRadius: "10px"}}>
                    <p>{props.message.message}</p>
                </Col>
                <Col>
                    {props.message.userName}
                </Col>
            </Row>
        </Container>

    );
});

