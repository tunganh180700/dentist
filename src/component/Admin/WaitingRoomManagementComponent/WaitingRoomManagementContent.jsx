import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton, TextField } from '@mui/material';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaiting } from '../../../redux/WaitingSlice/listWaitingSlice';
import moment from 'moment';
import { updateWaitingAPI, listConfirmWaitingAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import ModalConfirmWaiting from '../../ModalComponent/ModalWaiting/ModalConfirmWaiting';
import { ToastContainer, toast } from 'react-toastify';
import SockJsClient from 'react-stomp';

const WaitingRoomManagementContent = () => {

    const SOCKET_URL = 'http://localhost:80/waiting-room/';

    const listWaiting = useSelector(state => state.listWaiting.listWaiting)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listWaiting.pageSize)
    const totalPages = useSelector(state => state.listWaiting.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    const totalElements = useSelector(state => state.listWaiting.totalElements)
    const [modalConfirmWaitingOpen, setModalConfirmWaitingOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [u, setU] = useState(true);


    const loadWaitingList = () => {
        dispatch(fetchAllWaiting({
            size: pageSize,
            page: currentPage
        },
        ));
    }

    const onConnected = () => {
        console.log("Connected!!")
    }

    const checkExistConfirmWaiting = async () => {
        try {
            const res = await axiosInstance.get(listConfirmWaitingAPI);
            if (res.data.length > 0) {
                setModalConfirmWaitingOpen(true);
            }
            else {
                setModalConfirmWaitingOpen(false);
            }
        } catch (error) {
            setModalConfirmWaitingOpen(false);
        }
    }

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === 'Receptionist') {
            checkExistConfirmWaiting();
        }
        else {
            setModalConfirmWaitingOpen(false);
        }
        setRole(role);
    }, [])

    useEffect(() => {
        loadWaitingList();
    }, [currentPage])

    // useEffect(() => {
    
    // }, [u])

    const updateWaiting = async (id) => {
        axiosInstance.post(updateWaitingAPI + id)
            .then(res => {
                loadWaitingList();
                toast("Gọi bệnh nhân thành công");
            })
            .catch(err => {
                toast("Gọi bệnh nhân không thành công");
            });
    }

    const getStatusStr = (status) => {
        if (status == 1) {
            return 'Đang chữa';
        }
        if (status == 2) {
            return 'Đang chờ';
        }
        else {
            return 'Đến lượt';
        }
    }

    return (
        <>
            <ToastContainer />
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                QUẢN LÝ PHÒNG CHỜ
            </Typography>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group']}
                onConnect={onConnected}
                onDisconnect={() => console.log("Disconnected!")}
                onMessage={msg => console.log(msg)}
                debug={false}
            />
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Bệnh nhân</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listWaiting?.map((item) =>
                        <TableRow key={item.waitingRoomId}>
                            <TableCell>{item.patientName}</TableCell>
                            <TableCell>{moment(item.date).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>{getStatusStr(item.status)}</TableCell>
                            {
                                role === null || role === 'Receptionist' || item.status === 1 ?
                                    <></>
                                    :
                                    <TableCell>
                                        <IconButton aria-label="edit" onClick={() => {
                                            updateWaiting(item.waitingRoomId)
                                        }}>
                                            Gọi
                                        </IconButton>
                                    </TableCell>
                            }

                        </TableRow>
                    )}
                </TableBody>
            </Table >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    defaultPage={1}
                    onChange={(e, pageNumber) => {
                        setCurrentPage(pageNumber - 1)
                    }}
                />
            </div>
            <div>
                <ModalConfirmWaiting modalConfirmWaitingOpen={modalConfirmWaitingOpen} setModalConfirmWaitingOpen={setModalConfirmWaitingOpen} />
            </div>
        </>
    )
}

export default WaitingRoomManagementContent;