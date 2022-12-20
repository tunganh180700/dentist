import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch } from "react-redux";
// import { useFormik } from "formik";
import { listAllMaterialAPI } from '../../../config/baseAPI';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axiosInstance from '../../../config/customAxios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Button,
    IconButton
} from "@mui/material";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import { addListMaterialImportAPI } from '../../../config/baseAPI';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastCss } from '../../../redux/toastCss';

const ModalAddListMaterialImport = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [materialIds, setMaterialIds] = useState([]);
    const [materialExport, setMaterialExport] = useState([])


    // const [listMaterialPrice, setListMaterialPrice] = useState([]);

    // const validationSchema = yup.object({
    //     supplyName: yup
    //         .string('Nhập đơn vị cung cấp')
    //         .max(250, 'Đơn vị cung cấp không thể quá 250 ký tự.')
    //         .required('Đơn vị cung cấp là bắt buộc.'),
    //     amount: yup
    //         .string('Nhập số lượng')
    //         .matches(regexNumber, "Số lượng không được nhập chữ, kí tự, số âm.")
    //         .required('Số lượng là bắt buộc.'),
    //     unitPrice: yup
    //         .string('Nhập đơn giá')
    //         .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
    //         .required('Đơn giá là bắt buộc.')

    // });



    const loadMaterial = async () => {
        try {
            const res = await axiosInstance.get(listAllMaterialAPI)
            setMaterialIds(res.data)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMaterial();
    }, [])



    // const formik = useFormik({
    //     initialValues: {
    //         supplyName: '',
    //         amount: '',
    //         unitPrice: '',
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         values.date = moment(value.$d).format(validationDate);
    //         values.materialId = materialId;
    //         values.totalPrice = materialPrice;
    //         console.log(values);
    //         dispatch(addMaterialImport(values))
    //         setModalAddOpen(false)
    //         formik.handleReset()
    //     }
    // });

    const handleAddList = async () => {
        try {
            const res = await axiosInstance.post(addListMaterialImportAPI, materialExport)
            console.log("res", res)
            
        } catch (error) {
            toast.error("thêm lỗi", toastCss)
        }
    }

    // const handleCancel = () => {
    //     setModalAddOpen(false)

    //     // formik.errors.supplyName = ""
    //     // formik.touched.supplyName = ""

    //     // formik.errors.amount = ""
    //     // formik.touched.amount = ""

    //     // formik.errors.unitPrice = ""
    //     // formik.touched.unitPrice = ""

    //     formik.resetForm()
    // }

    // useEffect(() => {
    //     const price = (formik.values.unitPrice || 0) * (formik.values.amount || 0)

    //     setMaterialPrice(price)
    // }, [formik.values.unitPrice, formik.values.amount])



    return (
        <>
            <Modal
                okText={'Lưu'}
                title="Bán sản phẩm"
                open={modalAddOpen}
                width="50%"
                onOk={() => {setModalAddOpen(false);dispatch(handleAddList())}}
                onCancel={() => setModalAddOpen(false)}
            >
                <IconButton style={{ fontSize: 'larger', borderRadius: '5%' }} aria-label="add" onClick={() => {
                    setMaterialExport((prev) => [...prev, {materialId: null,supplyName: null, amount: null, unitPrice: null, total: null}])
                }}>
                    Thêm mới
                </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "25%" }}>
                            Tên sản phẩm
                        </TableCell>
                        <TableCell>
                            Hãng cung cấp
                        </TableCell>
                        <TableCell>
                            Số lương
                        </TableCell>
                        <TableCell>
                            Đơn Giá
                        </TableCell>
                        <TableCell>
                            Tổng giá
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        materialExport?.map((materialExport, index) => (
                            <TableRow key={index}>
                                <TableCell padding="none">
                                <Select
                                            id="materialId"
                                            value={materialExport?.materialId}
                                            onChange={(e) => {
                                                setMaterialExport(prev => {
                                                    prev[index].materialId = e.target.value
                                                    return _.cloneDeep(prev)
                                                })
                                            }
                                            }
                                        >
                                            {materialIds?.map(item => (
                                                <MenuItem key={item.materialId} value={item.materialId}>{item.materialName}</MenuItem>
                                            ))}
                                        </Select>
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.supplyName}
                                        name="supplyName"
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                prev[index].supplyName = e.target.value
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.amount}
                                        name="amount"
                                        type={"number"}
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                prev[index].amount = e.target.value
                                                prev[index].total = (e.target.value) * (prev[index].unitPrice)
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.unitPrice}
                                        name="unitPrice"
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                prev[index].unitPrice = e.target.value;
                                                prev[index].total = (e.target.value) * (prev[index].amount)
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.total}
                                        name="total"
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                        disabled={true}
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <Button className="mr10" onClick={
                                        () => {setMaterialExport((prev) => {
                                            prev.splice(index, 1)
                                            return _.cloneDeep(prev)
                                        })}
                                    } >
                                        <ClearIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>
            </Modal>
        </>
    )
}

export default ModalAddListMaterialImport;