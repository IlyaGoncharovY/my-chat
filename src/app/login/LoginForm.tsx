import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../utils/hook/hook";
import {loginTC} from "../../bll/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/path/path";
import * as Yup from 'yup';
import {Button, Col, Container, Row} from "react-bootstrap";

export const LoginForm = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.Auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .min(4, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        })
        ,
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.MAIN}/>
    }

    return (
        <Container style={{marginTop: "70px"}}>
            <Row className="m-2">
                <Col>
                    <label>
                        <p>
                            To log in get registered <a href="https://social-network.samuraijs.com/"
                                                        target={"_blank"}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p>
                            Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </label>
                </Col>
            </Row>
            <Row className="m-2">
                <Col>
                    <form onSubmit={formik.handleSubmit}>
                        <Col>
                            <input type="email"
                                   id="email"
                                   placeholder="email"
                                   {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </Col>
                        <Col>
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Col>
                        <Col>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                {...formik.getFieldProps('rememberMe')}
                            />
                            <span>Remember me</span>
                        </Col>
                        <Button type="submit" variant="primary">Login</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
