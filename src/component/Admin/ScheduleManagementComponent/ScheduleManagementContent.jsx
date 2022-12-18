import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Pagination, Typography, IconButton } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ModalAddSchedule from '../../ModalComponent/ModalSchedule/ModalAddSchedule';
import { fetchAllSchedule } from '../../../redux/ScheduleSlice/listScheduleSlice';
import { useDispatch, useSelector } from 'react-redux';

const ScheduleManagementContent = () => {

    const listSchedule = useSelector(state => state.listSchedule.listSchedule)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listSchedule.pageSize)
    const totalPages = useSelector(state => state.listSchedule.totalPage)
    const [currentPage, setCurrentPage] = useState(0);

    const isAddSchedule = useSelector(state => state.listSchedule.isAddSchedule);
    const [modalAddOpen, setModalAddOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAllSchedule({
            size: pageSize,
            page: currentPage
        },
        ));
    }, [currentPage,isAddSchedule])

    return (

        <>

            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                Lịch hẹn
            </Typography>
            <Button aria-label="add"
                variant='success'
                style={{ float: 'right', marginBottom: '1rem' }}
                onClick={() => {
                    setModalAddOpen(true)
                }}
            >
                <AddIcon /> Thêm mới
            </Button>

            <Table striped bordered style={{ marginTop: "15px"}}>
                <thead>
                    <tr >
                        <th>Bệnh nhân</th>
                        <th>Số điện thoại</th>
                        <th>Ngày hẹn</th>
                        <th>Lưu ý</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                {listSchedule.map((item, index) =>
                    <tr key={item.waitingRoomId}>
                        <td>{item.patientName}</td>
                        <td>{item.phone}</td>
                        <td>{item.date}</td>
                        <td>{item.note}</td>
                        <td>
                            <Button aria-label="edit" variant='info'>
                                <EditIcon />
                            </Button>
                        </td>
                        <td>
                            <Button aria-label="delete" variant='danger'>
                                <DeleteIcon />
                            </Button>
                        </td>
                    </tr>
                      )}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                <ModalAddSchedule modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>
            </>

    );
}

export default ScheduleManagementContent;