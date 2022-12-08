import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addLabo } from '../../../redux/LaboSlice/listLaboSlice';
import { regexPhone } from '../../../config/validation';

const ModalAddLabo = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        laboName: yup
            .string('Enter labo name')
            .required('Your material name is required'),
        phone: yup
            .string("Enter your phone")
            .matches(regexPhone, "Invalid Phone")
            .required("Phone is required")
    });

    const formik = useFormik({
        initialValues: {
            laboName: '',
            phone: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addLabo(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    const handleCancel = () => {
        setModalAddOpen(false)

        formik.errors.laboName = ""
        formik.touched.laboName = ""

        formik.errors.phone = ""
        formik.touched.phone = ""

        formik.resetForm()

    }

    return (
        <>
            <Modal
                title="Thêm Labo"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="laboName"
                    label="Labo"
                    name="laboName"
                    autoComplete="laboName"
                    value={formik.values.laboName}

                    onChange={formik.handleChange}
                />
                {formik.errors.laboName && formik.touched.laboName && <Typography style={{ color: 'red' }}>{formik.errors.laboName}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phone"
                    value={formik.values.phone}

                    onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>}


            </Modal>
        </>
    )
}

export default ModalAddLabo;