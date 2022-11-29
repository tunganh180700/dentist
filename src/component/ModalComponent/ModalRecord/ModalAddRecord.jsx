import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
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
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const ModalAddRecord = ({ modalAddOpen, setModalAddOpen }) => {
    const [value, setValue] = useState(null);
    const { id } = useParams()
    const [listTreatingService, setListTreatingService] = useState([])

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [rows, setRows] = useState([
        { serviceName: "", price: "", discount: "", status: "" },
    ]);

    const handleAdd = () => {
        setRows([
            ...rows,
            {
                serviceName: "", price: "", discount: "", status: ""
            },
        ]);
        setEdit(true);
    };

    const handleEdit = (e) => {
        // If edit mode is true setEdit will 
        // set it to false and vice versa
        setEdit(!isEdit);
    };

    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
        setDisable(true);
        setOpen(true);
    };

    const handleInputChange = (e, index) => {
        setDisable(false);
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };

    const handleConfirm = () => {
        setShowConfirm(true);
    };

    const handleRemoveClick = (i) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };

    const handleNo = () => {
        setShowConfirm(false);
    };

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
                        {isEdit ? (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={handleAdd}>
                                    <AddIcon onClick={handleAdd} />
                                    ADD
                                </Button>
                                {rows.length !== 0 && (
                                    <div>
                                        {disable ? (
                                            <Button disabled align="right" onClick={handleSave}>
                                                <AddIcon />
                                                SAVE
                                            </Button>
                                        ) : (
                                            <Button align="right" onClick={handleSave}>
                                                <AddIcon />
                                                SAVE
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Button onClick={handleAdd}>
                                    <AddIcon onClick={handleAdd} />
                                    ADD
                                </Button>
                                <Button align="right" onClick={handleEdit}>
                                    <AddIcon />
                                    EDIT
                                </Button>
                            </div>
                        )}
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
                                    <TableCell>
                                        Xóa
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listTreatingService?.map(item => (
                                    <TableRow key={item.serviceId}>
                                        <TableCell>{item.serviceName}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                                {rows.map((row, i) => {
                                    return (
                                        <TableRow>
                                            {isEdit ? (
                                                <>
                                                    <TableCell padding="none">
                                                        <input
                                                            value={row.serviceName}
                                                            name="serviceName"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            value={row.price}
                                                            name="lastname"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            value={row.discount}
                                                            name="lastname"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            value={row.status}
                                                            name="lastname"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell component="th" scope="row">
                                                        {row.serviceName}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.price}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" align="center">
                                                        {row.discount}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        align="center"
                                                    >{row.status}</TableCell>
                                                    <TableCell></TableCell>
                                                </>
                                            )}
                                            {isEdit ? (
                                                <Button className="mr10" onClick={handleConfirm} >
                                                    <ClearIcon />
                                                </Button>
                                            ) : (
                                                <div style={{ marginTop: "10px" }}></div>
                                                // <TableCell></TableCell>
                                            )}
                                            {showConfirm && (
                                                <div>
                                                    <Dialog
                                                        open={showConfirm}
                                                        onClose={handleNo}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">
                                                            {"Confirm Delete"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Are you sure to delete
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button
                                                                onClick={() => handleRemoveClick(i)}
                                                                color="primary"
                                                                autoFocus
                                                            >
                                                                Yes
                                                            </Button>
                                                            <Button
                                                                onClick={handleNo}
                                                                color="primary"
                                                                autoFocus
                                                            >
                                                                No
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddRecord