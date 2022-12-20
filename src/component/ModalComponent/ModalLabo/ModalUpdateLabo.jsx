import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField, useStepContext } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexPhone } from '../../../config/validation';
import { updateLabo } from '../../../redux/LaboSlice/listLaboSlice';
import { getLaboByIdAPI } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';


const ModalUpdateLabo = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const laboId = useSelector(state => state.modal.laboId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);

    const [oldData, setOldData] = useState()

    const validationSchema = yup.object({
        laboName: yup
            .string('Nhập Labo')
            .max(250, 'Labo không thể quá 250 ký tự.')
            .required('Labo là bắt buộc.'),
        phone: yup
            .string("Nhập số điện thoại")
            .matches(regexPhone, "Số điện thoại không được nhập chữ, kí tự, bắt buộc phải 10 số bắt đầu là 03, 05, 07 08, 09.")
            .required("Số điện thoại là bắt buộc."),
    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateLabo(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchLabo = async (laboId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getLaboByIdAPI + laboId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setOldData(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (laboId > 0)
            fetchLabo(laboId)
    }, [laboId])

    const handleCancel = () => {
        formik.values.laboName = oldData.laboName
        formik.values.phone = oldData.phone

        // formik.errors.laboName = ""
        // formik.touched.laboName = ""

        // formik.errors.phone = ""
        // formik.touched.phone = ""

        setModalUpdateOpen(false)
    }

    return (
        <>
            <Modal
                title="Thông tin Labo"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                {loading === false && <>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="laboName"
                        label="Labo"
                        name="laboName"
                        autoComplete="laboName"
                        value={formik.values.laboName}
                        autoFocus
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
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.phone && formik.touched.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>}


                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateLabo