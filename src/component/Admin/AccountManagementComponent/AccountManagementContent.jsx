import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography } from '@mui/material';
import { listUserAPI } from '../../../config/baseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccount, setIndexPagination, setPaginationListAccount } from '../../../redux/listAccountSlice';

const AccountManagementContent = () => {

    const listAccount = useSelector(state => state.listAccount.listAccount)
    const dispatch = useDispatch()
    const number = useSelector(state => parseInt(state.listAccount.number))
    const index = useSelector(state => parseInt(state.listAccount.index))
    const [currentPage, setCurrentPage] = useState()
    const handleChangePage = (accountNumber) => {
        dispatch(setIndexPagination(accountNumber - 1))
    }

    console.log(index)
    useEffect(() => {
        dispatch(fetchAllAccount({
            size: 10,
            page: 0
        }))
    }, []
    )

    useEffect(() => {
        setCurrentPage({ ...listAccount[index] })
    }, [index, listAccount])

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
            <Table size="small" style={{ marginTop: "15px" }}>
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
                    {listAccount.map((item) =>
                        <TableRow key={item.userId}>
                            <TableCell></TableCell>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.birthdate}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={number}
                    defaultPage={1}
                    onChange={(event, pageNumber) => {
                        handleChangePage(pageNumber)
                    }} />
            </div>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more orders
                </Link> */}
        </>
    )
}

export default AccountManagementContent;