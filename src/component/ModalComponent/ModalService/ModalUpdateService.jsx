import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from '../../../config/customAxios';
import { updateService } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import { getServiceByIdAPI } from '../../../config/baseAPI';
import { regexNumber } from '../../../config/validation';



const ModalUpdateService = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();
    const serviceId = useSelector(state => state.modal.serviceId);
    const [categoryServiceId, setCategoryId] = useState();

    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        serviceName: yup
            .string('Nhập loại dịch vụ')
            .required('Kiểm tra và nhập lại tên loại dịch vụ'),
        unit: yup
            .string('Nhập đơn vị')
            .required('Kiểm tra và nhập lại đơn vị'),
        marketPrice: yup
            .string('Nhập giá thị trường')
            .matches(regexNumber, "Only number or positive number")
            .required('Kiểm tra và nhập giá thị trường'),
        price: yup
            .string('Nhập giá nha khoa Nguyễn Trần')
            .matches(regexNumber, "Only number or positive number")
            .required('Kiểm tra và nhập lại giá nha khoa')
    });




    const formik = useFormik({
        initialValues: {
            serviceName: '',
            unit: '',
            marketPrice: '',
            price: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.categoryServiceId = categoryServiceId
            dispatch(updateService(values))
            setModalUpdateOpen(false)
            // formik.handleReset()
        }
    });

    const fetchService = async (serviceId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getServiceByIdAPI + serviceId
            )
            formik.setValues(res.data)
            setCategoryId(res.data.categoryServiceId)
            console.log('hihihaha:', res.data.categoryServiceId)
            console.log('dataService: ', res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (serviceId > 0)
            fetchService(serviceId)
    }, [serviceId])

    return (
        <>
            <Modal
                title="Cập nhật dịch vụ"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {loading === false && <>

                    <TextField
                        margin="normal"
                        hidden
                        required
                        fullWidth
                        id="serviceName"
                        label="Dịch vụ"
                        name="serviceName"
                        autoComplete="serviceName"
                        value={categoryServiceId}
                        autoFocus

                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="serviceName"
                        label="Dịch vụ"
                        name="serviceName"
                        autoComplete="serviceName"
                        value={formik.values.serviceName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.serviceName && formik.touched.serviceName && <Typography style={{ color: 'red' }}>{formik.errors.serviceName}</Typography>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="unit"
                        label="Đơn vị"
                        name="unit"
                        autoComplete="unit"
                        value={formik.values.unit}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.unit && formik.touched.unit && <Typography style={{ color: 'red' }}>{formik.errors.unit}</Typography>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="marketPrice"
                        type={'number'}
                        min={0}
                        label="giá thị trường"
                        name="marketPrice"
                        autoComplete="categoryName"
                        value={formik.values.marketPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.marketPrice && formik.touched.marketPrice && <Typography style={{ color: 'red' }}>{formik.errors.marketPrice}</Typography>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        min={0}
                        type={'number'}
                        label="Giá nha khoa Nguyễn Trần"
                        name="price"
                        autoComplete="price"
                        value={formik.values.price}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.price && formik.touched.price && <Typography style={{ color: 'red' }}>{formik.errors.price}</Typography>}

                </>}
            </Modal>
        </>
    )
}

export default ModalUpdateService;