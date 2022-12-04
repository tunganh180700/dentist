import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from "@mui/material"
// import Modal from '@mui/material/Modal';
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabo } from "../../../redux/LaboSlice/choosenLaboSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ModalDeleteSpecimens from '../../ModalComponent/ModalSpecimens/ModalDeleteSpecimens';
import ModalUpdateSpecimens from '../../ModalComponent/ModalSpecimens/ModalUpdateSpecimens';

import { fetchAllSpecimens } from "../../../redux/SpecimensSlice/listSpecimensSlice";
import { setUserId } from '../../../redux/modalSlice';

const ModalDetailLabo = ({ modalDetailOpen, setModalDetailOpen }) => {

    const [loading, setLoading] = useState();
    const laboId = useSelector(state => state.modal.laboId);
    const specimensDTOS = useSelector(state => state.choosenLabo.specimensDTOS);
    const dispatch = useDispatch();

    const isUpdateLabo = useSelector(state => state.listLabo.isUpdateLabo);
    const isDeleteSpecimens = useSelector(state => state.listSpecimens.isDeleteSpecimens);
    const isUpdateSpecimens = useSelector(state => state.listSpecimens.isUpdateSpecimens);

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    console.log("ket qua labo: ", specimensDTOS);
    useEffect(() => {
        setLoading(true)
        try {
            if (laboId > 0) {
                dispatch(fetchLabo(laboId))
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [laboId, isUpdateLabo])


    useEffect(() => {
        dispatch(fetchAllSpecimens({
            // size: pageSize,
            // page: currentPage
        }, [laboId]
        ));
    }, [isDeleteSpecimens,isUpdateSpecimens])

    return (
        <>
            <Modal
                open={modalDetailOpen}
                onCancel={() => setModalDetailOpen(false)}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    textAlign="center"
                    fontWeight="bold"
                >
                    Thống kê Labo
                </Typography>
                <IconButton aria-label="add" style={{ borderRadius: '5%' }} >
                    <AddIcon /> Thêm mới
                </IconButton>
                {loading === false && <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mẫu thử nghiệm</TableCell>
                                <TableCell>Bệnh nhân</TableCell>
                                <TableCell>Ngày nhận</TableCell>
                                <TableCell>Ngày giao hàng</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {specimensDTOS.map((item) =>
                                <TableRow key={item.specimenId}>
                                    <TableCell>{item.specimenName}</TableCell>
                                    <TableCell>{item.patientName}</TableCell>
                                    <TableCell>{item.receiveDate}</TableCell>
                                    <TableCell>{item.deliveryDate}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{item.unitPrice}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" onClick={() => {
                                            setModalUpdateOpen(true)
                                            dispatch(setUserId(item.specimenId))
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => {
                                            setModalDeleteOpen(true)
                                            dispatch(setUserId(item.specimenId))
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div>
                        <ModalDeleteSpecimens modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
                    </div>
                    <div>
                        <ModalUpdateSpecimens modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
                    </div>
                </>}
            </Modal>
        </>
    )
}

export default ModalDetailLabo
