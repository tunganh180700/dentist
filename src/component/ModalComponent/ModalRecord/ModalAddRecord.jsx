import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material"
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
import { regexNumber, validationDate } from "../../../config/validation";
import moment from "moment";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "../../../redux/RecordSlice/listRecordSlice";
import "./style.css"
import _ from "lodash";

const ModalAddRecord = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(new Date());
    const { id } = useParams()
    const [listTreatingService, setListTreatingService] = useState([])

    const [serviceId, setServiceId] = useState();
    const [serviceName, setServiceName] = useState();
    const [serviceIds, setServiceIds] = useState([]);

    const [newPrice, setNewPrice] = useState();
    const [servicePrice, setServicePrice] = useState();
    const [serviceDiscount, setServiceDiscount] = useState();
    const [status, setStatus] = useState();

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const isAddRecord = useSelector(state => state.listRecord.isAddRecord)
    const [rows, setRows] = useState([
        {}
    ]);


    const validationSchema = yup.object({
        reason: yup
            .string('Nhập lý do đến khám')
            .max(250, "Lý do đến khám không được quá 250 ký tự.")
            .required('Lý do đến khám là bắt buộc'),
        diagnostic: yup
            .string('Nhập chẩn đoán')
            .required('Chẩn đoán là bắt buộc.'),
        causal: yup
            .string('Nhập nguyên nhân')
            .max(250, "Nguyên nhân không được quá 250 ký tự.")
            .required('Nguyên nhân là bắt buộc.'),
        marrowRecord: yup
            .string('Nhập lưu ý về tủy')
            .max(250, "Lưu ý về tuỷ không được quá 250 ký tự.")
            .required('Lưu ý về tuỷ là bắt buộc.'),
        note: yup
            .string('Nhập ghi chú')
            .max(250, "Ghi chú không được quá 250 ký tự.")
            .required('Ghi chú là bắt buộc.'),
        treatment: yup
            .string('Nhập điều trị')
            .max(250, "Điều trị không được quá 250 ký tự.")
            .required('Điều trị là bắt buộc.'),
        // discount: yup
        //     .string("Enter your discount")
        //     .matches(regexNumber, "Only number or positive number")
        //     .required("discount is required"),
        // status: yup
        //     .string("Enter your email")
        //     .required("Email is required"),
    });

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
            treatment: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            const serviceDTOs = [{
                serviceId: serviceId,
                serviceName: serviceName,
                price: servicePrice,
                discount: serviceDiscount,
                status: status,
                isNew: 1
            }]

            const listA = listTreatingService.filter(a => {
                return Object.keys(a).length !== 0;
            })
            const listB = rows.filter(a => {
                return Object.keys(a).length !== 0;
            })
            values.serviceDTOS = listA.concat(listB)
            const addValue = {
                id: id,
                values: values
            }
            console.log("aaa", values)


            console.log("ser list", values.date)
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
                id: rows.length + 1, serviceName: "", price: "", discount: "", status: ""
            },
        ]);
        setEdit(true);
    };


    const handleEdit = (e) => {
        setEdit(!isEdit);
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

        // formik.values.reason = ""
        // formik.errors.reason = ""

        // formik.values.causal = ""
        // formik.errors.causal = ""

        // formik.values.diagnostic = ""
        // formik.errors.diagnostic = ""

        // formik.values.marrowRecord = ""
        // formik.errors.marrowRecord = ""

        // formik.values.note = ""
        // formik.errors.note = ""

        // formik.values.treatment = ""
        // formik.errors.treatment = ""

        setValue(null)
        formik.resetForm()
    }

    const handleServiceChange = (index, newsServiceId) => {
        const serviceInfo = serviceIds.find((s) => s.serviceId === newsServiceId
        )
        setRows(prev => {
            prev[index] = { ...prev[index], ...serviceInfo }
            prev[index].isNew = 1
            return _.cloneDeep(prev)
        })
    }

    const handleStatusForItem = (row, value) => {
        console.log(value)
        row.status = value;
    }



    const getServiceTreating = async (id) => {
        try {
            const res = await axiosInstance.get(listTreatingServiceAPI + id)
            console.log("list", res.data)
            setListTreatingService(res.data)
            // formik.setValues(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     const price = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.price
    //     const discount = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.discount
    //     setServicePrice(price)
    //     setServiceDiscount(discount)
    // }, [serviceId])

    useEffect(() => {

        // const price = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.price

        const price = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.price

        setServicePrice(price)
        getServiceTreating(id)


    }, [id, serviceId, isAddRecord])


    return (
        <>
            <Modal
                title="Thêm Hồ Sơ"
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
                        {formik.errors.reason && formik.touched.reason && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.reason}</Typography>}
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
                        {formik.errors.diagnostic && formik.touched.diagnostic && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.diagnostic}</Typography>}
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
                        {formik.errors.causal && formik.touched.causal && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.causal}</Typography>}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày khám"
                                name="birthdate"
                                value={value}
                                disablePast={true}
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
                        {formik.errors.marrowRecord && formik.touched.marrowRecord && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.marrowRecord}</Typography>}
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
                        {formik.errors.note && formik.touched.note && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.note}</Typography>}
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
                        {formik.errors.treatment && formik.touched.treatment && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.treatment}</Typography>}
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
                                {listTreatingService?.map((item, index) => (
                                    <TableRow key={item.serviceId}>
                                        <TableCell>{item.serviceName}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        labelId="status"
                                                        id="status"
                                                        value={item.status || ""}
                                                        onChange={(e) =>
                                                            setListTreatingService((prev) => {
                                                                prev[index].status = e.target.value;
                                                                return _.cloneDeep(prev)
                                                            })
                                                            // setStatus(e.target.value)
                                                        }
                                                    >
                                                        <MenuItem value={1}>Đang chữa trị</MenuItem>
                                                        <MenuItem value={2}>Đã xong</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                                {rows?.map((i, index) => {
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
                                                                    value={i.serviceId}
                                                                    onChange={(e) => {
                                                                        setServiceId(e.target.value)
                                                                        handleServiceChange(index, e.target.value)
                                                                    }}

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
                                                            id={i.serviceId}
                                                            disabled
                                                            value={i.price}
                                                            name="price"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            style={styleInput}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <input
                                                            value={i.serviceDiscount}
                                                            name="discount"
                                                            onChange={(e) =>
                                                                // setServiceDiscount(e.target.value)
                                                                setRows((prev) => {
                                                                    prev[index].discount = e.target.value;
                                                                    return _.cloneDeep(prev)
                                                                })
                                                            }
                                                            style={styleInput}
                                                        />
                                                    </TableCell>
                                                    <TableCell padding="none">
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth>
                                                                <Select
                                                                    labelId="status"
                                                                    id="status"
                                                                    value={i.status || ""}
                                                                    onChange={(e) => {
                                                                        setRows((prev) => {
                                                                            prev[index].status = e.target.value;
                                                                            return _.cloneDeep(prev)
                                                                        })
                                                                    }}
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