import { Box, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPatientByIdAPI } from "../../../config/baseAPI";
import { fetchPatient } from "../../../redux/PatienSlice/choosenPatientSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDetailPatient = ({
  modalDetailOpen,
  setModalDetailOpen,
  isSubmitForm,
}) => {
  const [loading, setLoading] = useState();
  const patientId = useSelector((state) => state.modal.userId);
  const dispatch = useDispatch();
  const patientName = useSelector((state) => state.choosenPatient.patientName);
  const birthdate = useSelector((state) => state.choosenPatient.birthdate);
  const gender = useSelector((state) => state.choosenPatient.gender);
  const address = useSelector((state) => state.choosenPatient.address);
  const phone = useSelector((state) => state.choosenPatient.phone);
  const email = useSelector((state) => state.choosenPatient.email);
  const bodyPrehistory = useSelector(
    (state) => state.choosenPatient.bodyPrehistory
  );
  const teethPrehistory = useSelector(
    (state) => state.choosenPatient.teethPrehistory
  );

  const isUpdatePatient = useSelector(
    (state) => state.listPatient.isUpdatePatient
  );

  useEffect(() => {
    setLoading(true);
    try {
      if (patientId > 0) {
        dispatch(fetchPatient(patientId));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [patientId, isUpdatePatient]);

  return (
    <>
      <Modal
        hideBackdrop
        open={modalDetailOpen}
        onClose={() => setModalDetailOpen(false)}
      >
        <Box sx={{ ...style }}>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            textAlign="center"
            fontWeight="bold"
          >
            Chi tiết bệnh nhân
          </Typography>
          {loading === false && (
            <>
              <div className="box" style={{ marginTop: "40px" }}>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Họ và tên:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {patientName}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Ngày sinh:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {birthdate}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Giới tính:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {gender ? "Nam" : "Nữ"}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Địa chỉ:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {address}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Điện thoại:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {phone}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Email:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {email}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Tiền sử cơ thể:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {bodyPrehistory}
                  </Typography>
                </div>
                <div
                  className="attribute"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                  >
                    Lịch sử răng miệng:
                  </Typography>
                  <Typography component="h1" color="inherit" noWrap>
                    {teethPrehistory}
                  </Typography>
                </div>
              </div>
            </>
          )}

          <Button
            onClick={() => setModalDetailOpen(false)}
            style={{ justifyContent: "center" }}
          >
            Đóng
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDetailPatient;
