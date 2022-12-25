import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField, TextareaAutosize } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { regexEmail, regexName, regexPhone, validationDate } from '../../../config/validation';
import { useFormik } from 'formik';
import moment from 'moment';
import { addPatient } from '../../../redux/PatienSlice/listPatientSlice';

const ModalAddPatient = ({ modalAddOpen, setModalAddOpen, isSubmitForm }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState();

    const validationSchema = yup.object({
        patientName: yup
            .string('Nhập họ tên')
            .matches(regexName, 'Họ và tên không được nhập số hoặc kí tự đặc biệt, nhập từ 8 đến 32 ký tự.')
            .required('Họ tên là bắt buộc.'),
        phone: yup
            .string("Nhập số điện thoại")
            .matches(regexPhone, "Số điện thoại không được nhập chữ, kí tự, bắt buộc phải 10 số bắt đầu là 03, 05, 07 08, 09.")
            .required("Số điện thoại là bắt buộc."),
        email: yup
            .string("Nhập email")
            .matches(regexEmail, "Email không đúng với định dạng."),
        address: yup
            .string("Nhập địa chỉ")
            .max(255, "Địa chỉ không thể quá 255 kí tự.")
            .required("Địa chỉ là bắt buộc."),
    });

    const formik = useFormik({
        initialValues: {
            patientName: '',
            phone: "",
            email: "",
            address: '',
            bodyPrehistory: '',
            teethPrehistory: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.gender = gender;
            dispatch(addPatient(values))
            setModalAddOpen(false)
            isSubmitForm(true)
            formik.handleReset()
        }
    });

    const handleCancel = () => {
        setModalAddOpen(false)
        isSubmitForm(false)
        // formik.values.patientName = ""
        // formik.errors.patientName = ""

        // formik.values.phone = ""
        // formik.errors.phone = ""

        // formik.values.address = ""
        // formik.errors.address = ""

        // formik.values.email = ""
        // formik.errors.email = ""

        // formik.values.bodyPrehistory = ""
        // formik.errors.bodyPrehistory = ""

        // formik.values.teethPrehistory = ""
        // formik.errors.teethPrehistory = ""

        setGender(false)
        setValue(null)
        formik.resetForm()
    }

    useEffect(() => {

        setGender(false)


    })


    return (
        <>
            <Modal
                title="Thêm Bệnh Nhân"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
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
                {formik.errors.patientName && formik.touched.patientName && <Typography style={{ color: 'red', fontSize: '15px' }}>{formik.errors.patientName}</Typography>}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        name="birthdate"
                        value={value}
                        disableFuture={true}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newValue) => {
                            setValue(newValue);
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
                {formik.errors.phone && formik.touched.phone && <Typography style={{ color: 'red', fontSize: '15px' }}>{formik.errors.phone}</Typography>}
                <FormControl style={{ display: 'flex' }}>
                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: "80%" }}>Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{ marginRight: "30%" }}
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue={false}
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
                {formik.errors.address && formik.touched.address && <Typography style={{ color: 'red', fontSize: '15px' }}>{formik.errors.address}</Typography>}
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && <Typography style={{ color: 'red', fontSize: '15px' }}>{formik.errors.email}</Typography>}
                <TextField
                    margin="normal"
                    fullWidth
                    id="bodyPrehistory"
                    label="Tiền sử cơ thể"
                    name="bodyPrehistory"
                    autoComplete="bodyPrehistory"
                    value={formik.values.bodyPrehistory}
                    multiline
                    rows={5}
                    autoFocus
                    onChange={formik.handleChange}
                    variant="outlined"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="teethPrehistory"
                    label="Tiền sử răng miệng"
                    name="teethPrehistory"
                    autoComplete="teethPrehistory"
                    value={formik.values.teethPrehistory}
                    multiline
                    rows={5}
                    variant="outlined"
                    autoFocus
                    onChange={formik.handleChange}
                />

            </Modal>
        </>
    )
}

export default ModalAddPatient