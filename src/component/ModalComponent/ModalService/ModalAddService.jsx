import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addService } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import axiosInstance from '../../../config/customAxios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {listAllCategoryAPI } from '../../../config/baseAPI';


const ModalAddService = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);


    const [categoryServiceIds, setCategoryServiceIds] = useState([]);
    const [categoryServiceId, setCategoryServiceId] = useState();

    const validationSchema = yup.object({
        serviceName: yup
            .string('Nhập loại dịch vụ')
            .required('Kiểm tra và nhập lại tên loại dịch vụ'),
        unit: yup
            .string('Nhập đơn vị')
            .required('Kiểm tra và nhập lại đơn vị'),
        marketPrice: yup
            .string('Nhập giá thị trường')
            .required('Kiểm tra và nhập giá thị trường'),
        price: yup
            .string('Nhập giá nha khoa Nguyễn Trần')
            .required('Kiểm tra và nhập lại giá nha khoa')
    });

    const loadCategory = async () => {
        try {

            const res = await axiosInstance.get(listAllCategoryAPI)
            setCategoryServiceId(res.data[0].categoryServiceId)
            setCategoryServiceIds(res.data)
            console.log("lam on ra kqua di: ", res.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadCategory();
    }, [])


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
            dispatch(addService(values))
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

                <Box sx={{ maxWidth: 250, minWidth: 250 }}>
                    <FormControl fullWidth>
                        <InputLabel id="material">Category</InputLabel>

                        <Select
                            labelId="material"
                            id="materialSelect"
                            label="Vật liệu"
                            value={categoryServiceId}
                            onChange={(e) => setCategoryServiceId(e.target.value)}
                        >

                            {categoryServiceIds?.map(item => (
                                <MenuItem key={item.categoryServiceId} value={item.categoryServiceId}>{item.categoryServiceName}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                </Box>
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
                {formik.errors.serviceName && <Typography style={{ color: 'red' }}>{formik.errors.serviceName}</Typography>}

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
                {formik.errors.unit && <Typography style={{ color: 'red' }}>{formik.errors.unit}</Typography>}

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
                {formik.errors.marketPrice && <Typography style={{ color: 'red' }}>{formik.errors.marketPrice}</Typography>}

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
                {formik.errors.price && <Typography style={{ color: 'red' }}>{formik.errors.price}</Typography>}


            </Modal>
        </>
    )
}

export default ModalAddService;