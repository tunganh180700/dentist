import { Typography } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../../../img/ngang.png'

const styleLogo = {
    height: `100%`,
    width: `100px`,
    backgroundImage: `url(${Logo})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`
}

const HeaderAdmin = ({ title }) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", width: '100%', }}>
                <div>
                    <img src={Logo} style={{ height: '50px' }} />
                </div>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                >
                    <a href='/login' style={{ color: "white", textDecoration: "none", }}>Đăng xuất</a>
                </Typography>
            </div>
        </>
    )
}

export default HeaderAdmin;