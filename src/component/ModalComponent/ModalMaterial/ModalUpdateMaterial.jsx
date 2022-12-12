import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as yup from "yup";
import { updateMaterial } from '../../../redux/MaterialSlice/listMaterialSlice';
import { getMaterialByIdAPI } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';
import { regexNumber } from '../../../config/validation';


const ModalUpdateMaterial = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const materialId = useSelector(state => state.modal.materialId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);
    const [oldData, setOldData] = useState()

    const validationSchema = yup.object({
        materialName: yup
            .string('Nhập tên vật liệu')
            .max(255, 'Vật liệu không thể quá 255 ký tự.')
            .required('Vật liệu là bắt buộc.'),
        unit: yup
            .string('Nhập đơn vị')
            .max(45, 'Đơn vị không thể quá 45 ký tự.')
            .required('Đơn vị là bắt buộc.'),
        amount: yup
            .string('Nhập số lượng')
            .matches(regexNumber, "Số lượng không được nhập chữ, kí tự, số âm.")
            .required('Số lượng là bắt buộc.'),
        price: yup
            .string('Nhập đơn giá')
            .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
            .required('Đơn giá là bắt buộc.')
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
            const res = await axiosInstance.get(
                getMaterialByIdAPI + materialId,
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
        if (materialId > 0)
            fetchMaterial(materialId)
    }, [materialId])


    const handleCancel = () => {
        formik.values.materialName = oldData.materialName
        formik.values.unit = oldData.unit
        formik.values.amount = oldData.amount
        formik.values.price = oldData.price

        formik.errors.materialName = ""
        formik.touched.materialName = ""

        formik.errors.unit = ""
        formik.touched.unit = ""

        formik.errors.amount = ""
        formik.touched.amount = ""

        formik.errors.price = ""
        formik.touched.price = ""
        setModalUpdateOpen(false)
    }

    return (
        <>
            <Modal
                title="Cập Nhật Vật Liệu"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
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
                    {formik.errors.materialName && formik.touched.materialName && <Typography style={{ color: 'red' }}>{formik.errors.materialName}</Typography>}
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
                    {formik.errors.unit && formik.touched.unit && <Typography style={{ color: 'red' }}>{formik.errors.unit}</Typography>}
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
                    {formik.errors.amount && formik.touched.amount && <Typography style={{ color: 'red' }}>{formik.errors.amount}</Typography>}
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
                    {formik.errors.price && formik.touched.price && <Typography style={{ color: 'red' }}>{formik.errors.price}</Typography>}
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateMaterial