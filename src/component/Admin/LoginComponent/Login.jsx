import { Grid, Typography, Box, TextField, Button, Link, Avatar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from 'react';
import { useFormik } from "formik";
import ValidatedLoginForm from './Validation/Validate';

const LoginComponent = () => {
    const paperStyle = {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validation: ValidatedLoginForm,
    })

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
                    id="username"
                    label="Tên đăng nhập"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Đăng nhập
                </Button>
                <Grid item xs
                    sx={{ textAlign: "center" }}>
                    <Link href="#" variant="body2">
                        Quên mật khẩu?
                    </Link>
                </Grid>
            </Box >
        </Grid >
    )
}

export default LoginComponent;