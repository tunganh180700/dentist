import { ConstructionOutlined } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Modal } from "antd"
import e from "cors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listTreatingServiceAPI, patientRecordAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import { fetchRecord } from "../../../redux/RecordSlice/listRecordSlice";

const ModalDetailService = ({ modalDetailOpen, setModalDetailOpen }) => {

    const dispatch = useDispatch()
    const patientRecordId = useSelector(state => state.modal.userId);
    const listService = useSelector(state => state.listRecord.listService)


    console.log(patientRecordId)
    const handleCancel = () => {
        setModalDetailOpen(false)
    }


    useEffect(() => {
        if (patientRecordId > 0)
            dispatch(fetchRecord(patientRecordId))

    }, [patientRecordId])

    return (
        <>
            <Modal
                title="Dịch vụ"
                open={modalDetailOpen}
                onCancel={handleCancel}
            >
                <Table size="small" style={{ marginTop: "15px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className='attibute'>Tên dịch vụ</div>
                            </TableCell>
                            <TableCell>
                                <div className='attibute'>Trạng thái</div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listService?.map((item) => {
                            return <TableRow key={item.serviceId}>
                                <TableCell>{item.serviceName}</TableCell>
                                <TableCell>{item.status === 1 ? "Đang chữa trị" : "Đã xong"}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Modal>
        </>
    )

}

export default ModalDetailService