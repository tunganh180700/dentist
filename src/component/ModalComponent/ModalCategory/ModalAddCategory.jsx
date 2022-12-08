import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addCategory } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';

const ModalAddCategory = ({ modalAddCategoryOpen, setModalAddCategoryOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        categoryServiceName: yup
            .string('Enter Category name')
            .required('Hãy nhập tên loại dịch vụ')
    });

    const formik = useFormik({
        initialValues: {
            categoryServiceName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addCategory(values))
            setModalAddCategoryOpen(false)
            formik.handleReset()
        }
    });

    const handleCancel = () => {
        setModalAddCategoryOpen(false)

        formik.errors.categoryServiceName = ""
        formik.touched.categoryServiceName = ""
    }

    return (
        <>
            <Modal
                title="Thêm loại dịch vụ"
                open={modalAddCategoryOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
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
                {formik.errors.categoryServiceName && formik.touched.categoryServiceName && <Typography style={{ color: 'red' }}>{formik.errors.categoryServiceName}</Typography>}


            </Modal>
        </>
    )
}

export default ModalAddCategory;