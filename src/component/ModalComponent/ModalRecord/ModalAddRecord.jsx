import { TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal } from "antd"
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axiosInstance from "../../../config/customAxios";
import { useParams } from "react-router-dom";
import { listTreatingServiceAPI } from "../../../config/baseAPI";
import { useEffect } from "react";

const ModalAddRecord = ({ modalAddOpen, setModalAddOpen }) => {
    const [value, setValue] = useState(null);
    const { id } = useParams()
    const [listTreatingService, setListTreatingService] = useState([])
    const getServiceTreating = async (id) => {
        try {
            const res = await axiosInstance.get(listTreatingServiceAPI + id)
            console.log(res.data)
            setListTreatingService(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getServiceTreating(id)
    }, [id])

    return (
        <>
            <Modal
                title="Thêm hồ sơ"
                open={modalAddOpen}
                width="70%"
                // onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
            >
                <div className="container" style={{ display: "flex" }}>
                    <div className="form-input" style={{ width: "50%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reason"
                            label="Lý do đến khám"
                            name="reason"
                            autoComplete="reason"
                            // value={formik.values.patientName}
                            autoFocus
                        // onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="diagnostic"
                            label="Chẩn đoán"
                            name="diagnostic"
                            autoComplete="diagnostic"
                            // value={formik.values.patientName}
                            autoFocus
                        // onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="causal"
                            label="Nguyên nhân"
                            name="causal"
                            autoComplete="causal"
                            // value={formik.values.patientName}
                            autoFocus
                        // onChange={formik.handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày sinh"
                                name="birthdate"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    console.log(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="marrowRecord"
                            label="Lưu ý về tủy"
                            name="marrowRecord"
                            autoComplete="marrowRecord"
                            // value={formik.values.patientName}
                            autoFocus
                        // onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="note"
                            label="Ghi chú"
                            name="note"
                            autoComplete="note"
                            // value={formik.values.patientName}
                            autoFocus
                        // onChange={formik.handleChange}
                        />
                    </div>
                    <div className="table" style={{ marginLeft: "150px" }}>
                        <button style={{}}>+</button>
                        <Table size="small" style={{ marginTop: "15px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Dich vụ
                                    </TableCell>
                                    <TableCell>
                                        Giá tiền
                                    </TableCell>
                                    <TableCell>
                                        Giảm giá
                                    </TableCell>
                                    <TableCell>
                                        Trạng thái
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {listTreatingService?.map(item => ( */}
                                {listTreatingService?.map(item => (
                                    <TableRow key={item.serviceId}>
                                        <TableCell>1</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>4</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow >
                                    {/* <TableCell>
                                            <IconButton aria-label="detail" onClick={() => {
                                                // setModalDetailOpen(true)
                                                // dispatch(setUserId(item.patientId))
                                            }}>
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                        </TableCell> */}

                                    {/* <TableCell>
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
                                        </TableCell> */}
                                </TableRow>
                                {/* 
                                ))} */}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddRecord