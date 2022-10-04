import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

const AccountManagementContent = () => {
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý tài khoản
            </Typography>
            <Table size="small" style={{marginTop: "15px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Họ tên</TableCell>
                        <TableCell>Tên đăng nhập</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Quyền hạn</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more orders
                </Link> */}
        </>
    )
}

export default AccountManagementContent;