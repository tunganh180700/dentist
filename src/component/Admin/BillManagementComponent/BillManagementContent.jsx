import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIncomeId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { fetchAllBill } from '../../../redux/BillSlice/listBillSlice';
import { setTreatmentId } from '../../../redux/modalSlice';
import ModalDetailBill from '../../ModalComponent/ModalBill/ModalDetailBill'
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModalListReceipt from '../../ModalComponent/ModalBill/ModalListReceipt'


const BillManagementContent = () => {

    const listBill = useSelector(state => state.listBill.listBill)

    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listBill.pageSize)
    const totalPages = useSelector(state => state.listBill.totalPage)
    const [currentPage, setCurrentPage] = useState(0);

    const [modalDetailOpen, setModalDetailOpen] = useState(false);
    const [modalReceiptOpen, setModalReceiptOpen] = useState(false);

    console.log('bill: ', listBill)
    console.log('page: ', totalPages)
    //dung roi, total pages trong api dang co 1 thoi
    useEffect(() => {
        dispatch(fetchAllBill({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý hóa đơn
            </Typography>

            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow >
                        <TableCell>Tên bệnh nhân</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Giá gốc</TableCell>
                        <TableCell>Giảm giá</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listBill.map((item, index) =>
                        <TableRow size='medium' key={item.treatmentId}>

                            <TableCell>{item.patientName}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.totalPrice}</TableCell>
                            <TableCell>{item.totalDiscount}</TableCell>
                            <TableCell>{item.realCost}</TableCell>
                            <TableCell>
                                <IconButton aria-label="receipt-list" onClick={() => {
                                    setModalReceiptOpen(true)
                                    dispatch(setTreatmentId(item.treatmentId))
                                }}>
                                    <ReceiptIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="detail" onClick={() => {
                                    setModalDetailOpen(true)
                                    dispatch(setTreatmentId(item.treatmentId))
                                }}>
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', padding: "14px 16px" }}>
                {totalPages > 1 ?
                    <Pagination
                        count={totalPages}
                        onChange={(e, pageNumber) => {
                            setCurrentPage(pageNumber - 1)
                        }}
                    />
                    : null
                }
            </div>
            <div>
                <ModalDetailBill modalDetailOpen={modalDetailOpen} setModalDetailOpen={setModalDetailOpen} />
            </div>

            <div>
                <ModalListReceipt modalReceiptOpen={modalReceiptOpen} setModalReceiptOpen={setModalReceiptOpen} />
            </div>


        </>
    )
}

export default BillManagementContent;