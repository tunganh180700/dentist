import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Input, Radio } from 'antd';
import PropsTypes from 'prop-types';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Button,
    IconButton,
    MenuItem,
    Select
} from "@mui/material";
import axiosInstance from "../../../config/customAxios";
import {listAllMaterialAPI} from "../../../config/baseAPI";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

    const ModalExportMaterial = ({ showModalExportMaterial, exportMaterial }) => {
    const dispatch = useDispatch();
    const [material, setMaterial] = useState([])
    const [materialExport, setMaterialExport] = useState([])

    const getMaterials = async () => {
        try {
            const { data } = await axiosInstance.get(listAllMaterialAPI);
            setMaterial(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMaterials();
    }, [dispatch]);

    return (
        <>
            <Modal
                okText={'Lưu'}
                title="Bán sản phẩm"
                open={showModalExportMaterial}
                width="50%"
                onOk={exportMaterial(materialExport)}
            >
                <IconButton style={{ fontSize: 'larger', borderRadius: '5%' }} aria-label="add" onClick={() => {
                    setMaterialExport((prev) => [...prev, {materialId: null, amount: null, unitPrice: null, total: null}])
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
                            Số lượng
                        </TableCell>
                        <TableCell>
                            Đơn giá
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
                                                const m = material.find((s) => s.materialId === e.target.value)
                                                setMaterialExport(prev => {
                                                    const total = (prev[index]?.amount || 0) * (m?.price)
                                                    prev[index] = { ...prev[index], unitPrice: m?.price, materialId: m?.materialId, total }
                                                    return _.cloneDeep(prev)
                                                })
                                            }
                                            }
                                        >
                                            {material?.map(item => (
                                                <MenuItem key={item.materialId} value={item.materialId}>{item.materialName}</MenuItem>
                                            ))}
                                        </Select>
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.amount}
                                        name="amount"
                                        type={"number"}
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                prev[index].amount = e.target.value
                                                prev[index].total = (e.target.value || 0) * (prev[index].unitPrice || 0)
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
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                        disabled={true}
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={materialExport.total}
                                        name="total"
                                        onChange={(e) =>
                                            setMaterialExport((prev) => {
                                                prev[index].total = e.target.value;
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
export default ModalExportMaterial;