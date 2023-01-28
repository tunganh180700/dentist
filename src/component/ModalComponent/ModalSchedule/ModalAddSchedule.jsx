import Button from "react-bootstrap/Button";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axiosInstance from "../../../config/customAxios";
import { listAllPatientAPI } from "../../../config/baseAPI";
import { addSchedule } from "../../../redux/ScheduleSlice/listScheduleSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { validationDate } from "../../../config/validation";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ModalAddSchedule = ({ modalAddOpen, setModalAddOpen, patient }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());

  //   const [patientIds, setPatientIds] = useState([]);
  //   const [patientId, setPatientId] = useState();
  //   const [phone, setPhone] = useState();

  //   const loadPatient = async () => {
  //     try {
  //       const res = await axiosInstance.get(listAllPatientAPI);
  //       setPatientId(res.data[0].patientId);
  //       setPatientIds(res.data);
  //       console.log("list patient: ", res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     loadPatient();
  //   }, []);

  const formik = useFormik({
    initialValues: {
      note: "",
    },
    onSubmit: (values) => {
      values.date = moment(value.$d).format(validationDate);
      values.patientId = patient.patientId;
      values.phone = patient.phone;
      dispatch(addSchedule(values));
      setModalAddOpen(false);
      formik.handleReset();
    },
  });

  const handleCancel = () => {
    setModalAddOpen(false);
    formik.resetForm();
  };
  return (
    <>
      <Modal
        title="Thêm Lịch hẹn"
        open={modalAddOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        <Box>
          <p>
            Tên bệnh nhân:{" "}
            <span className="font-bold">{patient?.patientName}</span>
          </p>
          {/* <FormControl fullWidth>
            <InputLabel id="patient">Bệnh nhân</InputLabel>

            <Select
              style={{ width: "100%", height: "10%" }}
              labelId="patient"
              id="patientSelect"
              label="Bệnh nhân"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {patientIds?.map((item) => (
                <MenuItem
                  selected={patientId}
                  key={item.patientId}
                  value={item.patientId}
                >
                  {item.patientName}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <p>
            Số điện thoại: <span className="font-bold"> {patient?.phone}</span>
          </p>
        </Box>
        {/* <TextField
          margin="normal"
          required
          disabled
          fullWidth
          id="phone"
          name="phone"
          autoComplete="phone"
          value={phone}
          autoFocus
          onChange={formik.handleChange}
        /> */}
        <Box className="mb-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <p className="font-bold mb-1">Ngày khám:</p>
            <DatePicker
              name="date"
              value={value}
              disablePast={true}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <p className="font-bold mb-1">Lưu ý:</p>
          <TextField
            fullWidth
            id="note"
            placeholder="Lưu ý"
            name="note"
            autoComplete="note"
            value={formik.values.note}
            multiline
            rows={10}
            autoFocus
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddSchedule;
