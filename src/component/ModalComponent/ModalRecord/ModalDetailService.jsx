import { ConstructionOutlined } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Modal } from "antd"
import e from "cors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listTreatingServiceAPI, patientRecordAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";

const ModalDetailService = ({ modalDetailOpen, setModalDetailOpen }) => {

    const patientRecordId = useSelector(state => state.modal.userId);
    const [listService, setListService] = useState([])

    const handleCancel = () => {
        setModalDetailOpen(false)
    }

    const fetchRecord = async (recordId) => {
        try {
            const res = await axiosInstance.get(
                patientRecordAPI + recordId,
            )
            // console.log("list ser", res.data.serviceDTOS)
            setListService(res.data.serviceDTOS)
            // setGender(res.data.gender)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (patientRecordId > 0)
            fetchRecord(patientRecordId)

        console.log("ser list", listService)
    }, [patientRecordId])

    return (
        <>
            <Modal
                title="Dịch vụ"
                open={modalDetailOpen}
                // onOk={formik.handleSubmit}
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
                        {listService?.map(item => {
                            <TableRow key={item.serviceId}>
                                <TableCell>{item.serviceName}</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Modal>
        </>
    )

}

export default ModalDetailService