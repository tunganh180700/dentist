import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { fetchAllAccount } from '../../../redux/AccountSlice/listAccountSlice';
import ModalUpdateAccount from '../../ModalComponent/ModalAccount/ModalUpdateAccount';
import ModalDeleteAccount from '../../ModalComponent/ModalAccount/ModalDeleteAccount';
import ModalAddAcount from '../../ModalComponent/ModalAccount/ModalAddAccount';

const AccountManagementContent = () => {

    const listAccount = useSelector(state => state.listAccount.listAccount)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listAccount.pageSize)
    const totalPages = useSelector(state => state.listAccount.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    const totalElements = useSelector(state => state.listAccount.totalElements)
    const isUpdateAccount = useSelector(state => state.listAccount.isUpdateAccount);
    const isDeleteAccount = useSelector(state => state.listAccount.isDeleteAccount);
    const isAddAccount = useSelector(state => state.listAccount.isAddAccount);

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        if (isDeleteAccount && totalElements % pageSize == 1) {
            const newCurrentPage = currentPage - 1
            setCurrentPage((prev) => prev - 1)
            dispatch(fetchAllAccount({
                size: pageSize,
                page: newCurrentPage,
            })
            );
        }
        dispatch(fetchAllAccount({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage, isUpdateAccount, isDeleteAccount, isAddAccount])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Danh Sách Tài Khoản
            </Typography>
            <IconButton aria-label="add" style={{ borderRadius: "20%" }} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Họ tên</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Tên đăng nhập</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Số điện thoại</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Ngày sinh</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Quyền hạn</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {totalPages === 0 ?
                    (
                        <>
                            <Typography
                                component="h1"
                                variant="h5"
                                color="inherit"
                                noWrap
                                textAlign="center"
                            >
                                Không có toàn khoản nào
                            </Typography>
                        </>
                    ) : (
                        <>
                            <TableBody>
                                {listAccount.map((item) =>
                                    <TableRow key={item.userId}>
                                        <TableCell>{item.fullName}</TableCell>
                                        <TableCell>{item.userName}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.birthdate}</TableCell>
                                        <TableCell>{item.roleName}</TableCell>
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
                        </>
                    )
                }
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', padding: "14px 16px" }}>
                {totalPages > 1 ?
                    <Pagination
                        count={totalPages}
                        onChange={(e, pageNumber) => {
                            setCurrentPage(pageNumber - 1)
                        }}
                    />
                    : null
                }
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