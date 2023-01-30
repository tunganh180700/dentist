import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { Pagination, Typography, Button, Box, Chip } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllWaiting,
  callWaiting,
  deleteWaiting,
} from "../../../redux/WaitingSlice/listWaitingSlice";
import moment from "moment";
// import {
//   updateWaitingAPI,
//   listConfirmWaitingAPI,
// } from "../../../config/baseAPI";
// import axiosInstance from "../../../config/customAxios";
// import ModalConfirmWaiting from "../../ModalComponent/ModalWaiting/ModalConfirmWaiting";
import Loading from "../../ui/Loading";
import { ToastContainer } from "react-toastify";
import SockJsClient from "react-stomp";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { Tabs } from "antd";
import {
  confirmWaiting,
  fetchAllConfirmWaiting,
} from "../../../redux/WaitingSlice/listConfirmWaitingSlice";
import { useMemo } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import { SOCKET_URL } from "../../../config/baseAPI";

const WaitingRoomManagementContent = () => {
  const navigate = useNavigate();
  const {tab} = useParams()

  const listWaiting = useSelector((state) => state.listWaiting.listWaiting);
  const listConfirmWaiting = useSelector(
    (state) => state.listConfirmWaiting.listConfirmWaiting
  );
  const dispatch = useDispatch();
  const pageSize = 12;
  const totalPages = useSelector((state) => state.listWaiting.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  const totalElements = useSelector((state) => state.listWaiting.totalElements);
  const [modalConfirmWaitingOpen, setModalConfirmWaitingOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [refSocket, setRefSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const isCallWaiting = useSelector((state) => state.listWaiting.isCallWaiting);
  const isDeleteWaiting = useSelector(
    (state) => state.listWaiting.isDeleteWaiting
  );
  const isConfirmed = useSelector(
    (state) => state.listConfirmWaiting.isConfirmed
  );
  let userInfo = {
    fullName: useSelector((state) => state.userProfile.fullName),
    roleName: useSelector((state) => state.userProfile.roleName),
    userName: useSelector((state) => state.userProfile.userName),
  };

  const loadWaitingList = () => {
    setLoading(true);
    dispatch(fetchAllConfirmWaiting());
    dispatch(
      fetchAllWaiting({
        size: pageSize,
        page: currentPage,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const onConnected = () => {};

  // const checkExistConfirmWaiting = async () => {
  //   try {
  //     const res = await axiosInstance.get(listConfirmWaitingAPI);
  //     if (res.data.length > 0) {
  //       setModalConfirmWaitingOpen(true);
  //     } else {
  //       setModalConfirmWaitingOpen(false);
  //     }
  //   } catch (error) {
  //     setModalConfirmWaitingOpen(false);
  //   }
  // };

  useEffect(() => {
    const role = localStorage.getItem("role");
    loadWaitingList();
    setRole(role);
  }, []);
  useEffect(() => {
    if (isConfirmed) {
      loadWaitingList();
    }
  }, [isConfirmed]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllWaiting({
        size: pageSize,
        page: currentPage,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentPage]);

  useEffect(() => {
    if (isDeleteWaiting || isCallWaiting) {
      loadWaitingList();
    }
  }, [isDeleteWaiting, isCallWaiting]);

  const getStatusStr = (status) => {
    if (status == 1) {
      return { txt: "Đang chữa", color: "rgb(46, 125, 50)" };
    }
    if (status == 2) {
      return { txt: "Đang chờ", color: "rgb(225, 130, 32)" };
    } else {
      return { txt: "Đến lượt", color: "#000" };
    }
  };

  const handleToDoMessageSocket = ({ message, patientId }) => {
    switch (message) {
      case "re-fetch":
        loadWaitingList();
        break;
      case "approve":
         navigate(`/patient-management/profile/${patientId}`);;
        break;
    }
  };

  const requestPatient = async (patient) => {
    await dispatch(callWaiting(patient.waitingRoomId));
    refSocket.sendMessage(
      "/topic/Receptionist",
      JSON.stringify({ patient, doctor: userInfo })
    );
    setTimeout(() => {
      refSocket.sendMessage(
        "/topic/group",
        JSON.stringify({ message: "re-fetch" })
      );
    }, 1000);
  };

  const remove = async (id) => {
    dispatch(deleteWaiting(id));
  };

  const disableCallPatient = useMemo(()=> listWaiting.some(item => item.status === 2) ,[listWaiting])

  const WaittingRoom = useMemo(() => {
    return (
      <>
        <StyledTable size="small" className="shadow-md w-full">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Bệnh nhân</StyledTableCell>
              <StyledTableCell>Ngày</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {listWaiting?.map((item) => (
              <StyledTableRow key={item.waitingRoomId}>
                <StyledTableCell>{item.patientName}</StyledTableCell>
                <StyledTableCell>
                  {moment(item.date).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={getStatusStr(item.status).txt}
                    style={{
                      background: `${getStatusStr(item.status).color}`,
                      color: "#fff",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {item.status === 2 && role === "Receptionist" && (
                    <Box>
                      <Button
                        variant="contained"
                        color="error"
                        // startIcon={<AddIcon />}
                        onClick={() => {
                          remove(item.waitingRoomId);
                        }}
                      >
                        <span className="leading-none">Hủy chờ</span>
                      </Button>
                    </Box>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {totalPages > 1 ? (
            <Pagination
              color="primary"
              count={totalPages}
              onChange={(e, pageNumber) => {
                setCurrentPage(pageNumber - 1);
              }}
            />
          ) : null}
        </div>
      </>
    );
  }, [listWaiting]);

  const WaitingPatientRequest = useMemo(() => {
    return (
      <StyledTable size="small" className="shadow-md w-full">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Bệnh nhân</StyledTableCell>
            <StyledTableCell>Bác sĩ yêu cầu</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listConfirmWaiting?.map((item) => (
            <StyledTableRow key={item.waitingRoomId}>
              <StyledTableCell>{item.patientName}</StyledTableCell>
              <StyledTableCell>doctor</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(
                      confirmWaiting({
                        id: item.waitingRoomId,
                        isAttend: 1,
                      })
                    );
                    refSocket.sendMessage(
                      "/topic/Admin", //Ducnh Flag
                      JSON.stringify({
                        message: "approve",
                        patientId: item.patientId,
                      })
                    );
                  }}
                >
                  <span className="leading-none text-xs">Chấp nhận</span>
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    dispatch(
                      confirmWaiting({
                        id: item.waitingRoomId,
                        isAttend: 0,
                      })
                    );
                  }}
                >
                  <span className="leading-none text-xs">Vắng mặt</span>
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    );
  }, [listConfirmWaiting]);

  return (
    <>
      {loading && <Loading />}
      <ToastContainer />
      <h2 className="font-bold mb-4">Quản Lý Phòng Chờ</h2>
      <SockJsClient
        url={SOCKET_URL}
        topics={[
          `/topic/${userInfo.userName}`,
          `/topic/${role}`,
          "/topic/group",
        ]}
        onConnect={onConnected}
        onDisconnect={() => console.log("Disconnected!")}
        onMessage={handleToDoMessageSocket}
        debug={false}
        ref={(client) => setRefSocket(client)}
      />
      {role !== "Receptionist" && (
        <Box className="mb-3 float-right">
          <Button
            variant="contained"
            color="primary"
            // startIcon={<AddIcon />}
            disabled={!disableCallPatient}
            onClick={() => {
              const firstFreePatient = listWaiting.filter(
                (item) => item.status === 2
              );
              console.log(firstFreePatient);
              requestPatient(firstFreePatient[0]);
            }}
          >
            <span className="leading-none">Yêu cầu bệnh nhân mới</span>
          </Button>
        </Box>
      )}
      {role === "Receptionist" ? (
        <Tabs
          defaultActiveKey={tab}
          className="mt-3 w-full"
          onChange={(tab)=> navigate(`/waitting-room/${tab}`)}
          items={[
            {
              label: (
                <p className="mb-0 font-medium text-lg">Đang ở phòng chờ ({totalElements})</p>
              ),
              key: "list",
              children: WaittingRoom,
            },
            {
              label: (
                <p className="mb-0 font-medium text-lg">Đang được yêu cầu ({listConfirmWaiting.length})</p>
              ),
              key: "confirm",
              children: WaitingPatientRequest,
            },
          ]}
        />
      ) : (
        WaittingRoom
      )}

      {/* <div>
        <ModalConfirmWaiting
          modalConfirmWaitingOpen={modalConfirmWaitingOpen}
          setModalConfirmWaitingOpen={setModalConfirmWaitingOpen}
          triggerGetList={triggerGetList}
        />
      </div> */}
    </>
  );
};

export default WaitingRoomManagementContent;
