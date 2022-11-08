import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Typography, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAllPatient } from '../../../redux/PatienSlice/listPatientSlice';
import ModalAddPatient from '../../ModalComponent/ModalPatient/ModalAddPatient';
import ModalDeletePatient from '../../ModalComponent/ModalPatient/ModalDeletePatient';
import { setUserId } from '../../../redux/modalSlice';
import ModalUpdatePatient from '../../ModalComponent/ModalPatient/ModalUpdatePatient';

const PatientManagementContent = () => {
    const dispatch = useDispatch();
    const listPatient = useSelector(state => state.listPatient.listPatient)
    const pageSize = useSelector(state => state.listPatient.pageSize)
    const totalPages = useSelector(state => state.listPatient.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);

    const isDeletePatient = useSelector(state => state.listPatient.isDeletePatient);
    const isAddPatient = useSelector(state => state.listPatient.isAddPatient);
    const isUpdatePatient = useSelector(state => state.listPatient.isUpdatePatient);

    // console.log(gender)
    useEffect(() => {
        dispatch(fetchAllPatient({
            size: pageSize,
            page: currentPage
        }));
    }, [currentPage, isAddPatient, isDeletePatient, isUpdatePatient])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý bệnh nhân
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
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listPatient.map((item, index) =>
                        <TableRow key={item.patientId}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.patientName}</TableCell>
                            <TableCell>{item.birthdate}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.gender ? "Nam" : "Nữ"}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => {
                                    setModalUpdateOpen(true)
                                    dispatch(setUserId(item.patientId))
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setUserId(item.patientId))
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
                <ModalAddPatient modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>
            <div>
                <ModalDeletePatient modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalUpdatePatient modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
        </>
    )
}

export default PatientManagementContent