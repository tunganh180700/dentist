import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIncomeId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { fetchAllIncome } from '../../../redux/IncomeSlice/listIncomeSlice';
// import ModalUpdateIncome from '../../ModalComponent/ModalIncome/ModalUpdateIncome';
// import ModalDeleteIncome from '../../ModalComponent/ModalIncome/ModalDeleteIncome';
// import ModalAddIncome from '../../ModalComponent/ModalIncome/ModalAddIncome';

const IncomeManagementContent = () => {

    const listIncome = useSelector(state => state.listIncome.listIncome)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listIncome.pageSize)
    const totalPages = useSelector(state => state.listIncome.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    // const userId = useSelector(state=>state.modal.userId);
    // const isUpdateIncome = useSelector(state => state.listIncome.isUpdateIncome);
    // const isDeleteIncome = useSelector(state => state.listIncome.isDeleteIncome);
    // const isAddIncome = useSelector(state => state.listIncome.isAddIncome);

    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalAddOpen, setModalAddOpen] = useState(false);

    console.log('income: ',listIncome)



    useEffect(() => {
        dispatch(fetchAllIncome({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý Thu nhập
            </Typography>
            {/* <IconButton aria-label="add"  style={{borderRadius: '5%'}} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton> */}
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                       
                        <TableCell>Tiền thực nhận</TableCell>
                        <TableCell>Tiền bệnh nhân chưa nhận</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        {/* <TableCell></TableCell>
                        <TableCell></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>

                        <TableRow size='medium'>                         
                            <TableCell>{listIncome.netIncome}</TableCell>
                            <TableCell>{listIncome.notReceived}</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>{listIncome.totalIncome}</TableCell>
                            {/* <TableCell>
                                <IconButton aria-label="edit" onClick={() => {
                                    setModalUpdateOpen(true)
                                    dispatch(setIncomeId(item.IncomeId))
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setIncomeId(item.IncomeId))
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell> */}
                        </TableRow>

                </TableBody>
            </Table>
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    defaultPage={1}
                    onChange={(e, pageNumber) => {
                        setCurrentPage(pageNumber - 1)
                    }}
                />
            </div>
            <div>
                <ModalUpdateIncome modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
            <div>
                <ModalDeleteIncome modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalAddIncome modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div> */}

        </>
    )
}

export default IncomeManagementContent;