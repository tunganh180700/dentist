import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLaboId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { fetchAllLabo } from '../../../redux/LaboSlice/listLaboSlice';
import ModalUpdateLabo from '../../ModalComponent/ModalLabo/ModalUpdateLabo';
import ModalDeleteLabo from '../../ModalComponent/ModalLabo/ModalDeleteLabo';
import ModalAddLabo from '../../ModalComponent/ModalLabo/ModalAddLabo';

const LaboManagementContent = () => {

    const listLabo = useSelector(state => state.listLabo.listLabo)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listLabo.pageSize)
    const totalPages = useSelector(state => state.listLabo.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    // const userId = useSelector(state=>state.modal.userId);
    const isUpdateLabo = useSelector(state => state.listLabo.isUpdateLabo);
    const isDeleteLabo = useSelector(state => state.listLabo.isDeleteLabo);
    const isAddLabo = useSelector(state => state.listLabo.isAddLabo);

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);



    useEffect(() => {
        dispatch(fetchAllLabo({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage, isUpdateLabo, isDeleteLabo, isAddLabo])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý Labo
            </Typography>
            <IconButton aria-label="add"  style={{borderRadius: '5%'}} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                       
                        <TableCell>Tên Labo</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listLabo.map((item, index) =>
                        <TableRow key={item.laboId}>
                           
                            <TableCell>{item.laboName}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.totalMoney}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => {
                                    setModalUpdateOpen(true)
                                    dispatch(setLaboId(item.laboId))
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setLaboId(item.laboId))
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
                <ModalUpdateLabo modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
            <div>
                <ModalDeleteLabo modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalAddLabo modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>

        </>
    )
}

export default LaboManagementContent;