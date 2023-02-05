import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../utils/hook/hook";
import {loginTC} from "../../bll/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/path/path";


type formikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginForm = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.Auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.MAIN}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="email"
                       id="email"
                       {...formik.getFieldProps('email')}
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    id="rememberMe"
                    {...formik.getFieldProps('rememberMe')}
                />
                <span>Remember me</span>
            </div>
            <button type="submit">Login</button>
        </form>
    );
};
