import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { updateMaterial } from '../../../redux/MaterialSlice/listMaterialSlice';
import { getMaterialByIdAPI } from '../../../config/baseAPI';


const ModalUpdateMaterial = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const materialId = useSelector(state => state.modal.materialId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);

    const validationSchema = yup.object({
        materialName: yup
            .string('Enter material name')
            .required('Your material name is required'),
        unit: yup
            .string('Enter unit')
            .required('Your unit is required'),
        amount: yup
            .string('Enter amount')
            .required('Your amount is required'),
        price: yup
            .string('Enter price')
            .required('Your price is required')
    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateMaterial(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchMaterial = async (materialId) => {
        setLoading(true)
        try {
            const res = await axios.get(
                getMaterialByIdAPI + materialId,
            )
            console.log(res.data)
            formik.setValues(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (materialId > 0)
            fetchMaterial(materialId)
    }, [materialId])

    return (
        <>
            <Modal
                title="Thông tin vật liệu"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {loading === false && <>
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
                        value={formik.values.unit}
                        autoComplete="unit"
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.unit && <Typography style={{ color: 'red' }}>{formik.errors.unit}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="amount"
                        label="Số lượng"
                        name="amount"
                        autoComplete="amount"
                        value={formik.values.amount}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.amount && <Typography style={{ color: 'red' }}>{formik.errors.amount}</Typography>}           
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
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateMaterial