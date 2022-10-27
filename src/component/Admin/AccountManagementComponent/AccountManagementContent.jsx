import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { listUserAPI } from '../../../config/baseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccount } from '../../../redux/listAccountSlice';
import { setUserId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ModalUpdateAccount from '../../ModalComponent/ModalUpdateAccount';
import ModalDeleteAccount from '../../ModalComponent/ModalDeleteAccount';
import ModalAddAcount from '../../ModalComponent/ModalAddAccount';

const AccountManagementContent = () => {

    const listAccount = useSelector(state => state.listAccount.listAccount)
    const dispatch = useDispatch()
    const pageNumber = useSelector(state => state.listAccount.pageNumber)
    const pageSize = useSelector(state => state.listAccount.pageSize)
    const totalElements = useSelector(state => state.listAccount.totalElements)
    const totalPages = useSelector(state => state.listAccount.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    // const userId = useSelector(state=>state.modal.userId);
    const isUpdateAccount = useSelector(state => state.listAccount.isUpdateAccount);
    const isDeleteAccount = useSelector(state => state.listAccount.isDeleteAccount);

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);


    // console.log(modalUpdateOpen)
    useEffect(() => {
        dispatch(fetchAllAccount({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage, isUpdateAccount, isDeleteAccount])

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
            <IconButton aria-label="add" onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listAccount.map((item, index) =>
                        <TableRow key={item.userId}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.birthdate}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => {
                                    setModalUpdateOpen(true)
                                    dispatch(setUserId(item.userId))
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setUserId(item.userId))
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    defaultPage={1}
                    onChange={(e, pageNumber) => {
                        setCurrentPage(pageNumber - 1)
                    }}
                />
            </div>
            <div>
                <ModalUpdateAccount modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
            <div>
                <ModalDeleteAccount modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalAddAcount modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>

        </>
    )
}

export default AccountManagementContent;