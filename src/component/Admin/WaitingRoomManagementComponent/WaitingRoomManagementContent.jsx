import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
// import StyledTableRow from '@mui/material/StyledTableRow';
import { Pagination, Typography, IconButton, TextField } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllWaiting,
  callWaiting,
  deleteWaiting,
} from "../../../redux/WaitingSlice/listWaitingSlice";
import moment from "moment";
import {
  updateWaitingAPI,
  listConfirmWaitingAPI,
} from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import ModalConfirmWaiting from "../../ModalComponent/ModalWaiting/ModalConfirmWaiting";
import { ToastContainer } from "react-toastify";
import SockJsClient from "react-stomp";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";

const WaitingRoomManagementContent = () => {
  const SOCKET_URL = "http://localhost:8080/waiting-room/";

  const listWaiting = useSelector((state) => state.listWaiting.listWaiting);
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listWaiting.pageSize);
  const totalPages = useSelector((state) => state.listWaiting.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  const totalElements = useSelector((state) => state.listWaiting.totalElements);
  const [modalConfirmWaitingOpen, setModalConfirmWaitingOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [u, setU] = useState(true);
  const [triggerGetList, setTriggerGetList] = useState(true);
  const isCallWaiting = useSelector((state) => state.listWaiting.isCallWaiting);
  const isDeleteWaiting = useSelector(
    (state) => state.listWaiting.isDeleteWaiting
  );

  const loadWaitingList = () => {
    dispatch(
      fetchAllWaiting({
        size: pageSize,
        page: currentPage,
      })
    );
  };

  const onConnected = () => {
    console.log("Connected!!");
  };

  const checkExistConfirmWaiting = async () => {
    try {
      const res = await axiosInstance.get(listConfirmWaitingAPI);
      if (res.data.length > 0) {
        setModalConfirmWaitingOpen(true);
      } else {
        setModalConfirmWaitingOpen(false);
      }
    } catch (error) {
      setModalConfirmWaitingOpen(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Receptionist") {
      checkExistConfirmWaiting();
    } else {
      setModalConfirmWaitingOpen(false);
    }
    setRole(role);
  }, []);

  useEffect(() => {
    loadWaitingList();
  }, [currentPage]);

  useEffect(() => {
    if (isDeleteWaiting == true && totalElements % pageSize == 1) {
      setCurrentPage(currentPage - 1);
      dispatch(
        fetchAllWaiting({
          size: pageSize,
          page: currentPage,
        })
      );
    }
  }, [isDeleteWaiting, isCallWaiting]);

  const call = async (id) => {
    dispatch(callWaiting(id));
  };

  const getStatusStr = (status) => {
    if (status == 1) {
      return "Đang chữa";
    }
    if (status == 2) {
      return "Đang chờ";
    } else {
      return "Đến lượt";
    }
  };

  const handlePopupConfirm = () => {
    if (role === null || role === "Receptionist") {
      setTriggerGetList((prev) => !prev);
      setModalConfirmWaitingOpen(true);
    }
  };

  const remove = (id) => {
    dispatch(deleteWaiting(id));
  };

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
        topics={["/topic/group"]}
        onConnect={onConnected}
        onDisconnect={() => console.log("Disconnected!")}
        onMessage={handlePopupConfirm}
        debug={false}
      />
      <StyledTable size="small" style={{ marginTop: "15px" }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Bệnh nhân</StyledTableCell>
            <StyledTableCell>Ngày</StyledTableCell>
            <StyledTableCell>Trạng thái</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {totalPages ==! 0 && (
            <TableBody>
              {listWaiting?.map((item) => (
                <StyledTableRow key={item.waitingRoomId}>
                  <StyledTableCell>{item.patientName}</StyledTableCell>
                  <StyledTableCell>
                    {moment(item.date).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>{getStatusStr(item.status)}</StyledTableCell>
                  {role === null ||
                  role === "Receptionist" ||
                  item.status === 1 ? (
                    <></>
                  ) : (
                    <StyledTableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          call(item.waitingRoomId);
                        }}
                      >
                        Gọi
                      </IconButton>
                    </StyledTableCell>
                  )}
                  {role === null ||
                  role === "Receptionist" ||
                  item.status === 1 ? (
                    <></>
                  ) : (
                    <StyledTableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          remove(item.waitingRoomId);
                        }}
                      >
                        Xóa
                      </IconButton>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
        )}
      </StyledTable>
     {totalPages === 0 && (
         <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              textAlign="center"
              padding={10}
              margin="auto"
            >
              Không có ai ở phòng chờ
            </Typography>
        )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {totalPages > 1 ? (
          <Pagination
            count={totalPages}
            onChange={(e, pageNumber) => {
              setCurrentPage(pageNumber - 1);
            }}
          />
        ) : null}
      </div>
      <div>
        <ModalConfirmWaiting
          modalConfirmWaitingOpen={modalConfirmWaitingOpen}
          setModalConfirmWaitingOpen={setModalConfirmWaitingOpen}
          triggerGetList={triggerGetList}
        />
      </div>
    </>
  );
};

export default WaitingRoomManagementContent;
