import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/customAxios";
import { allPatientRecordAPI } from "../../../config/baseAPI";
import ModalAddRecord from "../../ModalComponent/ModalRecord/ModalAddRecord";

const RecordManagementContent = () => {
    const [modalAddOpen, setModalAddOpen] = useState(false);

    const { id } = useParams()
    const [recordList, setRecordList] = useState([])
    const getDetail = async (id) => {
        try {
            const res = await axiosInstance.get(allPatientRecordAPI + id)
            console.log(res.data.content)
            setRecordList(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDetail(id)
    }, [id])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Hồ sơ bệnh án của ...
            </Typography>
            <IconButton aria-label="add" style={{ borderRadius: "20%" }} onClick={() => {
                setModalAddOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <div className='attibute'>Lý do đến khám</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="search"
                                    label="Tìm kiếm"
                                    name="search"
                                    autoComplete="search"
                                    // value={searchInputName}
                                    autoFocus
                                // onChange={handleSearchName}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Chẩn đoán</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="search"
                                    label="Tìm kiếm"
                                    name="search"
                                    autoComplete="search"
                                    // value={searchInputBirthdate}
                                    autoFocus
                                // onChange={handleSearchBirthDate}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Nguyên nhân</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="search"
                                    label="Tìm kiếm"
                                    name="search"
                                    autoComplete="search"
                                    // value={searchInputPhone}
                                    autoFocus
                                // onChange={handleSearchPhone}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Ngày khám</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="search"
                                    label="Tìm kiếm"
                                    name="search"
                                    autoComplete="search"
                                    // value={searchInputAddress}
                                    autoFocus
                                // onChange={handleSearchAddress}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Lưu ý về tủy</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="searchRoom"
                                    label="Tìm kiếm"
                                    name="searchRoom"
                                    autoComplete="searchRoom"
                                    // value={searchInputEmail}
                                    autoFocus
                                // onChange={handleSearchEmail}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Ghi chú</div>
                        </TableCell>
                        <TableCell></TableCell>
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
                            <TableCell>
                                <Button>
                                    Dịch vụ
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => {
                                    console.log(el.patientRecordId)
                                    // setModalUpdateOpen(true)
                                    // dispatch(setUserId(item.patientId))
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    // setModalDeleteOpen(true)
                                    // dispatch(setUserId(item.patientId))
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
            <div>
                <ModalAddRecord modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>
        </>
    )
}

export default RecordManagementContent