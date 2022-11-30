import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, TextField } from "@mui/material"
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
import { addRecordAPI, listAllServiceAPI, listTreatingServiceAPI } from "../../../config/baseAPI";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import { toastCss } from "../../../redux/toastCss";
import * as yup from "yup";
import { validationDate } from "../../../config/validation";
import moment from "moment";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addRecord } from "../../../redux/RecordSlice/listRecordSlice";
import "./style.css"

const ModalAddRecord = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const { id } = useParams()
    const [listTreatingService, setListTreatingService] = useState([])

    const [serviceId, setServiceId] = useState();
    const [serviceIds, setServiceIds] = useState([]);

    const [servicePrice, setServicePrice] = useState();
    const [serviceDiscount, setServiceDiscount] = useState();
    const [status, setStatus] = useState();

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [rows, setRows] = useState([
        { serviceName: "", price: "", discount: "", status: "" },
    ]);


    // const validationSchema = yup.object({
    //     reason: yup
    //         .string('Enter your name')
    //         .required('Your name is required'),
    //     price: yup
    //         .string("Enter your phone")
    //         .required("Phone is required"),
    //     discount: yup
    //         .string("Enter your password")
    //         .required("Password is required"),
    //     status: yup
    //         .string("Enter your email")
    //         .required("Email is required"),
    // });

    const loadServiceOption = async () => {
        try {
            const res = await axiosInstance.get(listAllServiceAPI)
            setServiceId(res.data[0].serviceId)
            // console.log(serviceId)
            setServiceIds(res.data)
            setServicePrice(res.data[0].price)
            setServiceDiscount(res.data[0].discount)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadServiceOption();
    }, [])

    const formik = useFormik({
        initialValues: {
            reason: '',
            diagnostic: "",
            causal: "",
            marrowRecord: "",
            note: "",
            treatment: "",
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const addValue = {
                id: id,
                values: values
            }
            console.log("aaa", values)
            values.date = moment(value.$d).format(validationDate);
            const serviceDTOs = {
                serviceId: serviceId, serviceName: serviceId, price: servicePrice, discount: serviceDiscount, status: status
            }
            values.serviceDTOs = serviceDTOs
            values.serviceDTOs.status = status
            console.log("status", status)
            console.log("hay", serviceDTOs)
            console.log("pre", servicePrice)

            dispatch(addRecord(addValue))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    const styleInput = {
        width: '70%'
    }

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
        setEdit(!isEdit);
    };

    const handleSave = () => {
        setEdit(!isEdit);
        setListTreatingService(rows);
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

    const handleCancel = () => {
        setModalAddOpen(false)
    }



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
        const price = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.price
        const discount = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.discount
        setServicePrice(price)
        setServiceDiscount(discount)
    }, [serviceId])

    useEffect(() => {
        getServiceTreating(id)
    }, [id])

    return (
        <>
            <Modal
                title="Thêm hồ sơ"
                open={modalAddOpen}
                width="70%"
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
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
                            value={formik.values.reason}
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="diagnostic"
                            label="Chẩn đoán"
                            name="diagnostic"
                            autoComplete="diagnostic"
                            value={formik.values.diagnostic}
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="causal"
                            label="Nguyên nhân"
                            name="causal"
                            autoComplete="causal"
                            value={formik.values.causal}
                            autoFocus
                            onChange={formik.handleChange}
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
                            value={formik.values.marrowRecord}
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="note"
                            label="Ghi chú"
                            name="note"
                            autoComplete="note"
                            value={formik.values.note}
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="treatment"
                            label="Điều trị"
                            name="treatment"
                            autoComplete="treatment"
                            value={formik.values.treatment}
                            autoFocus
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="table" style={{ marginLeft: "150px" }}>
                        {isEdit ? (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={handleAdd}>
                                    <AddIcon onClick={handleAdd} />
                                    Thêm dòng
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button align="right" onClick={handleEdit}>
                                    <AddIcon />
                                    Thêm dòng
                                </Button>
                            </div>
                        )}
                        <Table size="small" style={{ marginTop: "15px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: "25%" }}>
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
                                        <TableCell>{item.status ? "Đang chữa trị" : "Đã xong"}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                                {rows?.map((i) => {
                                    return (
                                        <TableRow>
                                            {isEdit ? (
                                                <>
                                                    <TableCell padding="none">
                                                        {/* <select
                                                            name="cars"
                                                            id="cars"
                                                            value={serviceId}
                                                            style={{ styleInput, justifyContent: "center" }}
                                                            onChange={(e) => setServiceId(e.target.value)}
                                                        >
                                                            {serviceIds?.map(item => (
                                                                <option key={item.serviceId} value={item.serviceId}>{item.serviceName}</option>
                                                            ))}
                                                        </select> */}
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth>
                                                                <Select
                                                                    labelId="permisstion"
                                                                    id="permisstionSelect"
                                                                    value={serviceId}
                                                                    onChange={(e) => setServiceId(e.target.value)}
                                                                >
                                                                    {serviceIds?.map(item => (
                                                                        <MenuItem key={item.serviceId} value={item.serviceId}>{item.serviceName}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            disabled
                                                            value={servicePrice}
                                                            name="status"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            style={styleInput}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            disabled
                                                            value={serviceDiscount}
                                                            name="status"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            style={styleInput}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth>
                                                                <Select
                                                                    labelId="status"
                                                                    id="status"
                                                                    value={status || ""}
                                                                    onChange={(e) => setStatus(e.target.value)}
                                                                >
                                                                    <MenuItem value={1}>Đang chữa trị</MenuItem>
                                                                    <MenuItem value={2}>Đã xong</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <Button className="mr10" onClick={handleConfirm} >
                                                            <ClearIcon />
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <></>
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