import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addMaterial } from '../../../redux/MaterialSlice/listMaterialSlice';

const ModalAddMaterial = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        materialName: yup
            .string('Enter material name')
            .required('Your material name is required'),
        unit: yup
            .string('Enter unit')
            .required('Your unit is required'),

        price: yup
            .string('Enter price')
            .required('Your price is required')
    });

    const formik = useFormik({
        initialValues: {
            materialName: '',
            unit: "",

            price: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addMaterial(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    return (
        <>
            <Modal
                title="Thêm vật liệu"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="materialName"
                    label="Vật liệu"
                    name="materialName"
                    autoComplete="materialName"
                    value={formik.values.materialName}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.materialName && <Typography style={{ color: 'red' }}>{formik.errors.materialName}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="unit"
                    label="Đơn vị"
                    name="unit"
                    autoComplete="unit"
                    autoFocus
                    value={formik.values.unit}
                    type={"unit"}
                    onChange={formik.handleChange}
                />
                {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Số lương"
                    name="amount"
                    autoComplete="amount"
                    value={formik.values.amount}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.amount && <Typography style={{ color: 'red' }}>{formik.errors.amount}</Typography>} */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Giá cả"
                    name="price"
                    autoComplete="price"
                    value={formik.values.price}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.price && <Typography style={{ color: 'red' }}>{formik.errors.price}</Typography>}

            </Modal>
        </>
    )
}

export default ModalAddMaterial;