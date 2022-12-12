import { Grid, Typography, Box, TextField, Link, Avatar, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastCss } from '../../../redux/toastCss';
import { loginAPI } from '../../../config/baseAPI';
import { useNavigate } from 'react-router-dom';
import { regexPassword } from '../../../config/validation';

const validationSchema = yup.object({
    userName: yup
        .string("Nhập tên đăng nhập")
        .required("Trường tên đăng nhập là bắt buộc."),
    password: yup
        .string("Nhập mật khẩu")
        .matches(regexPassword, "Mật khẩu phải là từ 6 đến 32 ký tự, viết liền, không dấu.")
        .required("Trường mật khẩu là bắt buộc."),
});

const LoginComponent = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const paperStyle = {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleLogin(values)
        }
    })

    const handleChange = (e) => {
        formik.handleChange(e)
    }
    const handleLogin = async (values) => {
        try {
            const res = await axios.post(loginAPI, values)
            console.log(res)
            localStorage.setItem('token', res.data.jwt)
            localStorage.setItem('role', res.data.role)
            switch (res.data.role) {
                case "Admin":
                case "Doctor":
                case "LeaderNurse":
                case "Nurse":
                    navigate("/patient-management")
                    break;
                case "Receptionist":
                    navigate("/meetingroom")
                    break;
            }
        } catch (error) {
            toast.error("Tên đăng nhập hoặc mật khẩu không đúng.", toastCss)
        }
    }

    return (
        <Grid container style={paperStyle}>

            <Box
                sx={{
                    width: 500,
                    padding: 10,
                    borderRadius: 5,
                    boxShadow: "0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)",
                }}>
                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', alignItems: 'center' }}>
                        <LoginIcon />
                    </Avatar>
                </Grid>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Tên đăng nhập"
                    name="userName"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.userName}
                    onChange={handleChange}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            formik.handleSubmit()
                        }
                    }}
                />
                {formik.errors.userName && formik.touched.userName && <Typography color={'red'}>{formik.errors.userName}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    autoComplete="password"
                    autoFocus
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            formik.handleSubmit()
                        }
                    }}
                />
                {formik.errors.password && formik.touched.password && <Typography color={'red'}>{formik.errors.password}</Typography>}
                <Button
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={formik.handleSubmit}
                >
                    Đăng nhập
                </Button>
                <Grid item xs
                    sx={{ textAlign: "center" }}>
                    <Link href="/forgot-password" variant="body2">
                        Quên mật khẩu?
                    </Link>
                </Grid>
            </Box >
        </Grid >
    )
}

export default LoginComponent;