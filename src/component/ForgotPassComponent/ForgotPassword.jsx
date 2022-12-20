import { Avatar, Box, Button, Grid, Link, TextField } from '@mui/material';
import React, { useState } from 'react';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { useHref } from 'react-router-dom';

const ForgotPassword = () => {
    const paperStyle = {
        background: 'linear-gradient(45deg,  rgba(66, 183, 245,0.8) 0%,rgba(66, 245, 189,0.4) 100%)',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <>
            <Grid container style={paperStyle}>
                <Box
                    sx={{
                        width: 500,
                        padding: 10,
                        borderRadius: 5,
                        boxShadow: "0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)",
                        backgroundColor: 'white'
                    }}>
                    <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', alignItems: 'center' }}>
                            <PsychologyAltIcon />
                        </Avatar>
                    </Grid>

                    <label>Vui lòng nhập gmail để tìm kiếm tài khoản</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        // value={formik.values.password}
                        autoComplete="email"
                        autoFocus
                    // onChange={handleChange}
                    />
                    {/* {formik.errors.password && <Typography color={'red'}>{formik.errors.password}</Typography>} */}
                    <div style={{ display: 'flex', width: '60%', marginLeft: '135px' }}>
                        <Button
                            // loading={loading}
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            href="/login"
                            style={{ marginRight: '5px' }}
                        >
                            Hủy
                        </Button>
                        <Button
                            // loading={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        // onClick={formik.handleSubmit}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </Box >
            </Grid >
        </>
    )
}

export default ForgotPassword;