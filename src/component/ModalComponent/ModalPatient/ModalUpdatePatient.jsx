import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getPatientByIdAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import { regexEmail, regexPhone, validationDate } from "../../../config/validation";
import { updatePatient } from "../../../redux/PatienSlice/listPatientSlice";

const ModalUpdatePatient = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const [gender, setGender] = useState();
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState();
    const patientId = useSelector(state => state.modal.userId);

    const [oldData, setOldData] = useState()

    const validationSchema = yup.object({
        patientName: yup
            .string('Enter your name')
            .required('Your name is required'),
        phone: yup
            .string("Enter your phone")
            .matches(regexPhone, "Invalid Phone")
            .required("Phone is required"),
        email: yup
            .string("Enter your email")
            .matches(regexEmail, "Invalid email")
            .required("Email is required"),
        address: yup
            .string("Enter your address")
            .required("Address is required"),
    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.gender = gender;
            dispatch(updatePatient(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchPatient = async (patientId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getPatientByIdAPI + patientId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setOldData(res.data)
            setValue(res.data.birthdate)
            setGender(res.data.gender)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (patientId > 0)
            fetchPatient(patientId)
    }, [patientId])

    const handleCancel = () => {
        formik.values.patientName = oldData.patientName
        setValue(oldData.birthdate)
        formik.values.phone = oldData.phone
        formik.values.address = oldData.address
        formik.values.bodyPrehistory = oldData.bodyPrehistory
        setGender(oldData.gender)
        formik.values.teethPrehistory = oldData.teethPrehistory
        setModalUpdateOpen(false)
    }

    return (
        <>
            <Modal
                title="Chỉnh sửa tài khoản"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                {loading === false && <>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="patientName"
                        label="Họ và tên bệnh nhân"
                        name="patientName"
                        autoComplete="patientName"
                        value={formik.values.patientName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.patientName && formik.touched.patientName && <Typography style={{ color: 'red' }}>{formik.errors.patientName}</Typography>}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày sinh"
                            name="birthdate"
                            value={value}
                            disableFuture={true}
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
                        id="phonenumber"
                        label="Số điện thoại"
                        name="phone"
                        autoComplete="phonenumber"
                        value={formik.values.phone}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.phone && formik.touched.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>}
                    <FormControl style={{ display: 'flex' }}>
                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: "80%" }}>Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            style={{ marginRight: "30%" }}
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                            <FormControlLabel value={true} control={<Radio />} label="Nam" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Địa chỉ"
                        name="address"
                        autoComplete="address"
                        value={formik.values.address}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.address && formik.touched.address && <Typography style={{ color: 'red' }}>{formik.errors.address}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && <Typography style={{ color: 'red' }}>{formik.errors.email}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="bodyPrehistory"
                        label="Tiền sử cơ thể"
                        name="bodyPrehistory"
                        autoComplete="bodyPrehistory"
                        value={formik.values.bodyPrehistory}
                        autoFocus
                        multiline
                        rows={5}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="teethPrehistory"
                        label="Tiền sử răng miệng"
                        name="teethPrehistory"
                        autoComplete="teethPrehistory"
                        value={formik.values.teethPrehistory}
                        autoFocus
                        multiline
                        rows={5}
                        onChange={formik.handleChange}
                    />
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdatePatient