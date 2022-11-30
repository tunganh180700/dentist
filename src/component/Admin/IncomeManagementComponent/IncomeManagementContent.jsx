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

import { fetchAllIncome,fetchAllNetIncome } from '../../../redux/IncomeSlice/listIncomeSlice';

const IncomeManagementContent = () => {

    const listIncome = useSelector(state => state.listIncome.listIncome)
    const listNetIncome = useSelector(state => state.listIncome.listNetIncome)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listIncome.pageSize)
    const totalPages = useSelector(state => state.listIncome.totalPage)
    const [currentPage, setCurrentPage] = useState(0);


    console.log('income: ', listNetIncome)



    useEffect(() => {
        dispatch(fetchAllIncome({            
        },
        ));
    },[])

    useEffect(() => {
        dispatch(fetchAllNetIncome({         
        },
        ));
    },[])

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý Thu nhập
            </Typography>

            <h2>Doanh thu</h2>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nguồn thu nhập</TableCell>
                        <TableCell>Ngày thu</TableCell>
                        <TableCell>Số Tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listIncome.incomeDetailDTOS.map((item, index) =>
                        <TableRow size='medium' >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    )}
                    <TableCell colSpan={3} style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'end' }}>Tổng tiền : {listIncome.totalIncome}</TableCell>
                </TableBody>
            </Table>

            <h2>Thực thu</h2>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nguồn thu nhập</TableCell>
                        <TableCell>Ngày thu</TableCell>
                        <TableCell>Số Tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listNetIncome.incomeDetailDTOS.map((item, index) =>
                        <TableRow size='medium' >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    )}
                    <TableCell colSpan={3} style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'end' }}>Tổng tiền : {listNetIncome.totalIncome}</TableCell>
                </TableBody>
            </Table>


        </>
    )
}

export default IncomeManagementContent;