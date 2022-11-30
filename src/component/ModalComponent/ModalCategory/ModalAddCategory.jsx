import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addCategory } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';

const ModalAddCategory = ({ modalAddOpen, setModalAddOpen }) => {
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
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    return (
        <>
            <Modal
                title="Thêm loại dịch vụ"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
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
                {formik.errors.categoryServiceName && <Typography style={{ color: 'red' }}>{formik.errors.categoryServiceName}</Typography>}
              

            </Modal>
        </>
    )
}

export default ModalAddCategory;