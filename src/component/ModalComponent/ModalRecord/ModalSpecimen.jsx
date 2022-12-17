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
import {getAllLaboAPI} from "../../../config/baseAPI";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

    const ModalSpecimen = ({ showModalSpecimen, specimens, serviceDTOS}) => {
    const dispatch = useDispatch();
    const [labo, setLabo] = useState([])
    const [specimen, setSpecimen] = useState([])

    const getLabos = async () => {
        try {
            const { data } = await axiosInstance.get(getAllLaboAPI);
            setLabo(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLabos();
    }, [dispatch]);

    return (
        <>
            <Modal
                okText={'Lưu'}
                title="Tạo mẫu vật"
                open={showModalSpecimen}
                width="50%"
                onOk={specimens(specimen)}
            >
                <IconButton style={{ fontSize: 'larger', borderRadius: '5%' }} aria-label="add" onClick={() => {
                    setSpecimen((prev) => [...prev, {specimenName: null, amount: null, unitPrice: null, laboId: null, serviceId: null}])
                }}>
                    Thêm mới
                </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "25%" }}>
                            Tên mẫu vật
                        </TableCell>
                        <TableCell>
                            Số lượng
                        </TableCell>
                        <TableCell>
                            Đơn giá
                        </TableCell>
                        <TableCell>
                            Tên labo
                        </TableCell>
                        <TableCell>
                            Dịch vụ
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        specimen?.map((specimen, index) => (
                            <TableRow key={index}>
                                <TableCell padding="none">
                                    <input
                                        value={specimen.specimenName}
                                        name="specimenName"
                                        onChange={(e) =>
                                            setSpecimen((prev) => {
                                                prev[index].specimenName = e.target.value
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={specimen.amount}
                                        name="amount"
                                        type={"number"}
                                        onChange={(e) =>
                                            setSpecimen((prev) => {
                                                prev[index].amount = e.target.value
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <input
                                        value={specimen.unitPrice}
                                        name="unitPrice"
                                        type={"number"}
                                        onChange={(e) =>
                                            setSpecimen((prev) => {
                                                prev[index].unitPrice = e.target.value;
                                                return _.cloneDeep(prev)
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                <Select
                                            id="laboId"
                                            value={specimen?.laboId}
                                            onChange={(e) => {
                                                const m = labo.find((l) => l.laboId === e.target.value)
                                                setSpecimen(prev => {
                                                    prev[index] = { ...prev[index], laboId: m?.laboId }
                                                    return _.cloneDeep(prev)
                                                })
                                            }
                                            }
                                        >
                                            {labo?.map(item => (
                                                <MenuItem key={item.laboId} value={item.materialId}>{item.laboName}</MenuItem>
                                            ))}
                                        </Select>
                                </TableCell>
                                <TableCell padding="none">
                                <Select
                                            id="serviceId"
                                            value={specimen?.serviceId}
                                            onChange={(e) => {
                                                const m = serviceDTOS.find((s) => s.serviceId === e.target.value)
                                                setSpecimen(prev => {
                                                    prev[index] = { ...prev[index], serviceId: m?.serviceId }
                                                    return _.cloneDeep(prev)
                                                })
                                            }
                                            }
                                        >
                                            {serviceDTOS?.map(item => (
                                                <MenuItem key={item.serviceId} value={item.serviceId}>{item.serviceName}</MenuItem>
                                            ))}
                                        </Select>
                                </TableCell>
                                
                                <TableCell padding="none">
                                    <Button className="mr10" onClick={
                                        () => {setSpecimen((prev) => {
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
export default ModalSpecimen;