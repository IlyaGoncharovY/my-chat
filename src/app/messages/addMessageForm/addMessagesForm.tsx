import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hook/hook";
import {sendMessage} from "../../../bll/reducers/chat-reducer";
import {Button, Col, Container, FloatingLabel, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';

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
        <Container fluid className="fixed-bottom p-3 mb-2 bg-secondary">
            <Row>
                <Col>
                    <FloatingLabel controlId="floatingTextarea2" label="Type your message">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{height: "100px", resize: "none"}}
                            onChange={onChangeSetMessage}
                            value={message}
                        />
                    </FloatingLabel>
                    <Button disabled={status !== "ready"}
                            onClick={sendMessageHandler}
                            variant="outline-dark"
                            className={"m-2"}
                    >send</Button>
                </Col>
            </Row>
        </Container>
    );
};

