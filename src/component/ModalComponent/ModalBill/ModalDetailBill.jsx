import { Box, TextField, Typography } from "@mui/material"
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchBill } from "../../../redux/BillSlice/choosenBillSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalDetailBill = ({ modalDeltailOpen, setModalDetailOpen }) => {
    const [loading, setLoading] = useState();
    const treatmentId = useSelector(state => state.modal.treatmentId);
    const dispatch = useDispatch();
    const listTreatmentServiceMapDTOList = useSelector(state => state.choosenBill.treatmentServiceMapDTOList);
    // const serviceName = useSelector(state => state.choosenBill.treatmentServiceMapDTOList.serviceName);
    // const currentPrice = useSelector(state => state.choosenBill.treatmentServiceMapDTOList.currentPrice);
    // const discount = useSelector(state => state.choosenBill.treatmentServiceMapDTOList.discount);
    const isUpdateBill = useSelector(state => state.listBill.isUpdateBill);


    console.log("list treat: ", listTreatmentServiceMapDTOList)
    useEffect(() => {
        setLoading(true)
        try {
            if (treatmentId > 0) {
                dispatch(fetchBill(treatmentId))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [treatmentId, isUpdateBill])

    return (
        <>
            <Modal
                hideBackdrop
                open={modalDeltailOpen}
                onClose={() => setModalDetailOpen(false)}
            >

                <Box sx={{ ...style }}>
                    <Table size="small" style={{ marginTop: "15px" }}>
                        <TableHead>
                            <TableRow >

                                <TableCell>Dịch vụ dùng</TableCell>
                                <TableCell>Giá tiền khám</TableCell>
                                <TableCell>Giảm giá</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listTreatmentServiceMapDTOList.map((item) =>
                                <TableRow size='medium' key={item.treatmentServiceMapId}>
                                    <TableCell>{item.serviceName}</TableCell>
                                    <TableCell>{item.currentPrice}</TableCell>
                                    <TableCell>{item.discount}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>

            </Modal>
        </>
    )
}

export default ModalDetailBill