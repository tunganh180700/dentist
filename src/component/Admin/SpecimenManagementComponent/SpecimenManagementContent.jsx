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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { fetchAllSpecimen, searchSpecimen } from '../../../redux/SpecimenSlice/listSpecimenSlice';
import ModalAddSpecimens from '../../ModalComponent/ModalSpecimens/ModalAddSpecimens';
import ModalDeleteSpecimens from '../../ModalComponent/ModalSpecimens/ModalDeleteSpecimens';
import { setSpecimenId } from '../../../redux/modalSlice';
import ModalUpdateSpecimens from '../../ModalComponent/ModalSpecimens/ModalUpdateSpecimens';
import "./style.css";
import _ from "lodash";
import ModalDetailSpecimen from '../../ModalComponent/ModalSpecimens/ModalDetailSpecimen';
import { Link } from 'react-router-dom';
import axiosInstance from "../../../config/customAxios";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';


const SpecimenManagementContent = () => {
    const dispatch = useDispatch();
    const listSpecimen = useSelector(state => state.listSpecimen.listSpecimen)
    const pageSize = useSelector(state => state.listSpecimen.pageSize)
    const totalPages = useSelector(state => state.listSpecimen.totalPage)
    const totalElements = useSelector(state => state.listSpecimen.totalElements)
    const [currentPage, setCurrentPage] = useState(0);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalDetailOpen, setModalDetailOpen] = useState(false);

    const isDeleteSpecimen = useSelector(state => state.listSpecimen.isDeleteSpecimen);
    const isAddSpecimen = useSelector(state => state.listSpecimen.isAddSpecimen);
    const isUpdateSpecimen = useSelector(state => state.listSpecimen.isUpdateSpecimen);
    const isUseSpecimen = useSelector(state => state.listSpecimen.isUseSpecimen);
    const isSearchSpecimen = useSelector(state => state.listSpecimen.isSearchSpecimen);
    const [loading, setLoading] = useState(false)
    const statusList = [null, 1, 2, 3, 4, 5, 6];
    const [statusId, setStatusId] = useState(false)

    const emptySearchValue = {
        specimenName: "",
        patientName: "",
        receiveDate: "",
        usedDate: "",
        deliveryDate: "",
        laboName: "",
        serviceName: "",
        status: null
    }
    const [searchValue, setSearchValue] = useState(emptySearchValue)

    let styleText = {}

    function changeColor(status) {
        if (status === 0) {
            styleText = {
                color: 'green'
            }
        } else if (status === 1) {
            styleText = {
                color: 'red'
            }
        } else {
            styleText = {
                color: 'blue'
            }
        }

    }

    const loadSpecimenList = () => {
        setLoading(true)
        try {
            if (searchValue === emptySearchValue) {
                dispatch(fetchAllSpecimen({
                    size: pageSize,
                    page: currentPage,
                })
                );
            } else {
                dispatch(searchSpecimen({
                    ...searchValue,
                    size: pageSize,
                    page: currentPage,
                }
                ))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadSpecimenList();
    }, [currentPage,isAddSpecimen,isUpdateSpecimen, isUseSpecimen])

    // useEffect(() => {
    //     if (isDeleteSpecimen == true && totalElements % pageSize == 1) {
    //         setCurrentPage(currentPage - 1)
    //         dispatch(fetchAllSpecimen({
    //             size: pageSize,
    //             page: currentPage,
    //         }))
    //     }
    // }, [isDeleteSpecimen])

    const handleSearchDebounce = useRef(_.debounce(async (formValues) => {
        setLoading(true)
        setCurrentPage(0)
        try {
            dispatch(searchSpecimen({
                ...formValues,
                size: pageSize,
                page: 0,
            }))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, 500)).current;

    const handleSearch = (e) => {
        setSearchValue(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        return () => {
            handleSearchDebounce.cancel();
        };
    }, [handleSearchDebounce]);

    useEffect(() => {
        handleSearchDebounce(searchValue)
    }, [searchValue]);

    const getStatusStr = (status) => {
        if (status === 1) {
            return 'Chuẩn bị mẫu vật'
        }
        else if (status === 2) {
            return 'Labo nhận mẫu'
        }
        else if (status === 3) {
            return 'Labo giao mẫu'
        }
        else if (status === 4) {
            return 'Bệnh nhân đã sử dụng'
        }
        else if (status === 5) {
            return 'Mẫu lỗi gửi lại cho labo'
        }
        else if (status == 6) {
            return 'Hoàn thành'
        }
        else {
            return '';
        }
    }

    return (
        <>
            <ToastContainer />
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Quản lý mẫu vật
            </Typography>
            <IconButton aria-label="add" style={{ borderRadius: "20%" }} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            {loading === false && <>
                <Table size="small" style={{ marginTop: "15px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <div className='attibute'>Tên mẫu vật</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="specimenName"
                                        value={searchValue.specimenName}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Ngày nhận</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="receiveDate"
                                        value={searchValue.receiveDate}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Ngày sử dụng</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="usedDate"
                                        value={searchValue.usedDate}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Ngày giao</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="deliveryDate"
                                        value={searchValue.deliveryDate}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Số lượng</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Đơn giá</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Loại dịch vụ</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="serviceName"
                                        value={searchValue.serviceName}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Labo</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="laboName"
                                        value={searchValue.laboName}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Bệnh nhân</div>
                                <div style={{ width: "160px" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Tìm kiếm"
                                        name="patientName"
                                        value={searchValue.patientName}
                                        autoFocus
                                        onChange={handleSearch}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Trạng thái</div>
                                <div style={{ width: "200px" }}>
                                    <br></br>
                                    <Select
                                        labelId="statusSearch"
                                        id="statusSearch"
                                        label="statusSearch"
                                        value={searchValue.status}
                                        style={{width:"100%"}}
                                        onChange={(e) => {
                                            setSearchValue(prevState => ({ ...prevState, status: e.target.value }))
                                        }}
                                    >
                                        {statusList?.map(status => (
                                            <MenuItem key={status} value={status}>{getStatusStr(status)}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </TableCell>
                            <TableCell></TableCell>
                            {/* <TableCell></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSpecimen.map((item) =>
                            <TableRow key={item.specimenId}>
                                <TableCell style={styleText}>
                                    <IconButton aria-label="detail" onClick={() => {
                                        setModalDetailOpen(true)
                                        dispatch(setSpecimenId(item.specimenId))
                                    }}>
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell style={styleText}>{item.specimenName}</TableCell>
                                <TableCell style={styleText}>{item.receiveDate ? moment(item.receiveDate).format("DD/MM/YYYY") : ''}</TableCell>
                                <TableCell style={styleText}>{item.usedDate ? moment(item.usedDate).format("DD/MM/YYYY") : ''}</TableCell>
                                <TableCell style={styleText}>{item.deliveryDate ? moment(item.deliveryDate).format("DD/MM/YYYY") : ''}</TableCell>
                                <TableCell style={styleText}>{item.amount}</TableCell>
                                <TableCell style={styleText}>{item.unitPrice}</TableCell>
                                <TableCell style={styleText}>{item.serviceName}</TableCell>
                                <TableCell style={styleText}>{item.laboName}</TableCell>
                                <TableCell style={styleText}>{item.patientName}</TableCell>
                                <TableCell style={styleText}>{getStatusStr(item.status)}</TableCell>
                                <TableCell style={styleText}>
                                    <IconButton aria-label="edit" onClick={() => {
                                        setModalUpdateOpen(true)
                                        dispatch(setSpecimenId(item.specimenId))
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                {/* <TableCell style={styleText}>
                                    <IconButton aria-label="delete" onClick={() => {
                                        
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell> */}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </>}
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
                <ModalAddSpecimens modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>
            {/* <div>
                <ModalDeleteSpecimens modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div> */}
            <div>
                <ModalUpdateSpecimens modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
            <div>
                <ModalDetailSpecimen loadSpecimenList={loadSpecimenList} modalDetailOpen={modalDetailOpen} setModalDetailOpen={setModalDetailOpen} />
            </div>
        </>
    )
}

export default SpecimenManagementContent