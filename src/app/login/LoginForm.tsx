import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../utils/hook/hook";
import {loginTC} from "../../bll/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/path/path";
import * as Yup from 'yup';

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
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type="email"
                       id="email"
                       {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
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
