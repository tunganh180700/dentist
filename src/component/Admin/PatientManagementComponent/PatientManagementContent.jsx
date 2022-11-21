import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Typography, IconButton, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAllPatient, searchPatient } from '../../../redux/PatienSlice/listPatientSlice';
import ModalAddPatient from '../../ModalComponent/ModalPatient/ModalAddPatient';
import ModalDeletePatient from '../../ModalComponent/ModalPatient/ModalDeletePatient';
import { setUserId } from '../../../redux/modalSlice';
import ModalUpdatePatient from '../../ModalComponent/ModalPatient/ModalUpdatePatient';
import "./style.css";
import _ from "lodash";


const PatientManagementContent = () => {
    const dispatch = useDispatch();
    const listPatient = useSelector(state => state.listPatient.listPatient)
    const pageSize = useSelector(state => state.listPatient.pageSize)
    const totalPages = useSelector(state => state.listPatient.totalPage)
    const totalElements = useSelector(state => state.listPatient.totalElements)
    const [currentPage, setCurrentPage] = useState(0);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);

    const isDeletePatient = useSelector(state => state.listPatient.isDeletePatient);
    const isAddPatient = useSelector(state => state.listPatient.isAddPatient);
    const isUpdatePatient = useSelector(state => state.listPatient.isUpdatePatient);

    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            if (searchInput === '') {
                dispatch(fetchAllPatient({
                    size: pageSize,
                    page: currentPage,
                })
                );
            } else {
                dispatch(searchPatient({
                    name: searchInput,
                    size: pageSize,
                    page: currentPage,
                }))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [currentPage, isAddPatient, isUpdatePatient])


    useEffect(() => {
        if (isDeletePatient == true && totalElements % pageSize == 1) {
            setCurrentPage(currentPage - 1)
        }
        dispatch(fetchAllPatient())
    }, [isDeletePatient])


    const handleSearchDebounce = useRef(_.debounce(async (value) => {
        setLoading(true)
        try {
            if (value === '') {
                dispatch(fetchAllPatient({
                    size: pageSize,
                    page: currentPage,
                })
                );
            } else {
                dispatch(searchPatient({
                    name: value,
                    size: pageSize,
                    page: currentPage,
                }))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, 500)).current;

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        handleSearchDebounce(e.target.value)
    }

    useEffect(() => {
        return () => {
            handleSearchDebounce.cancel();
        };
    }, [handleSearchDebounce]);
    
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Quản lý bệnh nhân
            </Typography>
            <IconButton aria-label="add" onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            {loading === false && <>
                <Table size="small" style={{ marginTop: "15px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className='attibute'>Họ tên</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        id="searchRoom"
                                        label="Tìm kiếm"
                                        name="searchRoom"
                                        autoComplete="searchRoom"
                                        value={searchInput}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Ngày sinh</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Số điện thoại</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Giới tính</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Địa chỉ</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Email</div>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPatient.map((item) =>
                            <TableRow key={item.patientId}>
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
            </>}
            <div style={{ display: 'flex', justifyContent: 'center', padding: "14px 16px" }}>
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