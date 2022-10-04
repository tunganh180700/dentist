import { Badge, Grid, IconButton, Typography } from '@mui/material';
import { width } from '@mui/system';
import { hover } from '@testing-library/user-event/dist/hover';
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
                    variant="h4"
                    color="inherit"
                    noWrap
                >
                    {title}
                </Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                >
                    <a href='/' style={{ color: "inherit", textDecoration: "none", }}>Quay lại trang web</a>
                </Typography>
            </div>
        </>
    )
}

export default HeaderAdmin;