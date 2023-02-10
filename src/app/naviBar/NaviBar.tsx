import React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../utils/hook/hook";
import {logOutTC} from "../../bll/reducers/auth-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';

export const NaviBar = () => {

    const isLoggedIn = useAppSelector(state => state.Auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const LogOutHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand className="me-auto">
                Сhat application
            </Navbar.Brand>
            {isLoggedIn &&
                <>
                    <Nav className="me-auto">
                        <b style={{color: "gold"}}>
                            Respect yourself and others ;)
                        </b>
                    </Nav>
                    <Nav>
                        <Button onClick={LogOutHandler} variant="primary" className="me-2">LogOut</Button>
                    </Nav>
                </>

            }
        </Navbar>
    );
};

