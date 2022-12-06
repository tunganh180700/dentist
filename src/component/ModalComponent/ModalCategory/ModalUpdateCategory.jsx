import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateCategory } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import { getCategoryByIdAPI } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';

const ModalUpdateCategory = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const categoryServiceId = useSelector(state => state.modal.categoryServiceId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        categoryServiceName: yup
            .string('Enter Category name')
            .required('Hãy nhập tên loại dịch vụ')
    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateCategory(values))
            setModalUpdateOpen(false)

        }
    })
    const fetchCategory = async (categoryServiceId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getCategoryByIdAPI + categoryServiceId,
            )
            console.log(res.data)
            formik.setValues(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (categoryServiceId > 0)
            fetchCategory(categoryServiceId)
    }, [categoryServiceId])


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
                        // required
                        fullWidth
                        id="categoryServiceName"
                        label="Loại dịch vụ"
                        name="categoryServiceName"
                        autoComplete="categoryName"
                        value={formik.values.categoryServiceName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.categoryServiceName && <Typography style={{ color: 'red' }}>{formik.errors.categoryServiceName}</Typography>}
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateCategory;