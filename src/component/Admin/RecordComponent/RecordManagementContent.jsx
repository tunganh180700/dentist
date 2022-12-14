import { Button, IconButton, ListItemButton, ListItemIcon, Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/customAxios";
import { allPatientRecordAPI } from "../../../config/baseAPI";
import ModalAddRecord from "../../ModalComponent/ModalRecord/ModalAddRecord";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../redux/modalSlice";
import ModalDeleteRecord from "../../ModalComponent/ModalRecord/ModalDeleteRecord";
import ModalDetailService from "../../ModalComponent/ModalRecord/ModalDetailService";

const RecordManagementContent = () => {
    const dispatch = useDispatch()

    const pageSize = useSelector(state => state.listRecord.pageSize)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0);

    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalDetailOpen, setModalDetailOpen] = useState(false);
    const patientName = useSelector(state => state.choosenPatient.patientName)

    const isAddRecord = useSelector(state => state.listRecord.isAddRecord)
    const isDeleteRecord = useSelector(state => state.listRecord.isDeleteRecord)

    console.log("pagezise.", totalPages)
    const { id } = useParams()
    const [recordList, setRecordList] = useState([])
    const getDetail = async (id) => {
        try {
            const res = await axiosInstance.get(allPatientRecordAPI + id, {
                params: {
                    size: pageSize,
                    page: currentPage,
                }
            })
            setTotalPages(res.data.totalPages)
            setRecordList(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDetail(id)
    }, [id, currentPage, pageSize, isAddRecord, isDeleteRecord])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Hồ Sơ Bệnh Án Của {patientName}
            </Typography>
            <IconButton aria-label="add" style={{ borderRadius: "20%" }} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            <IconButton aria-label="back" style={{ borderRadius: "20%", marginRight: "83%" }}>
                <Link to={'/patient-management'}>
                    <ArrowBackIosNewIcon />
                </Link>
            </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <div className='attibute'>Lý do đến khám</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Chẩn đoán</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Nguyên nhân</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Ngày khám</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Lưu ý về tủy</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Ghi chú</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Điều trị</div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Đơn thuốc</div>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordList?.map(el => (
                        <TableRow key={el.patientRecordId}>
                            <TableCell>
                                <IconButton aria-label="detail" onClick={() => {
                                    // setModalDetailOpen(true)
                                    // dispatch(setUserId(item.patientId))
                                }}>
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{el.reason}</TableCell>
                            <TableCell>{el.diagnostic}</TableCell>
                            <TableCell>{el.causal}</TableCell>
                            <TableCell>{el.date}</TableCell>
                            <TableCell>{el.marrowRecord}</TableCell>
                            <TableCell>{el.note}</TableCell>
                            <TableCell>{el.treatment}</TableCell>
                            <TableCell>{el.prescription}</TableCell>
                            <TableCell>
                                <Button onClick={() => {
                                    setModalDetailOpen(true)
                                    dispatch(setUserId(el.patientRecordId))
                                }}>
                                    Dịch vụ
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setUserId(el.patientRecordId))
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
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
                <ModalAddRecord modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>
            <div>
                <ModalDeleteRecord modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalDetailService modalDetailOpen={modalDetailOpen} setModalDetailOpen={setModalDetailOpen} />
            </div>
        </>
    )
}

export default RecordManagementContent