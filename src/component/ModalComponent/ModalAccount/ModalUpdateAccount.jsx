import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./../style.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import moment from "moment/moment";
import { updateAccount } from "../../../redux/AccountSlice/listAccountSlice";
import {
  regexEmail,
  regexNumber,
  regexPhone,
  validationDate,
} from "../../../config/validation";
import { getAccountByIdAPI, listRoleAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import RoleTag from "../../ui/RoleTag";

const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.modal.userId);
  const [loading, setLoading] = useState();
  const [value, setValue] = useState(null);
  const [roleIds, setRoleIds] = useState([]);
  const [roleId, setRoleId] = useState();

  const [oldData, setOldData] = useState();

  const validationSchema = yup.object({
    fullName: yup.string("Nhập họ tên").required("Họ tên là bắt buộc."),
    phone: yup
      .string("Nhập số điện thoại")
      .matches(
        regexPhone,
        "Số điện thoại không được nhập chữ, kí tự, bắt buộc phải 10 số bắt đầu là 03, 05, 07 08, 09."
      )
      .required("Số điện thoại là bắt buộc."),
    email: yup
      .string("Nhập email")
      .matches(regexEmail, "Email không đúng với định dạng.")
      .required("Trường email là bắt buộc."),
    salary: yup
      .string("Nhập số lương")
      .matches(regexNumber, "Lương không được nhập chữ, kí tự, số âm.")
      .required("Lương là bắt buộc."),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.birthdate = moment(value.$d).format(validationDate);
      values.roleId = roleId;
      const roleNameArray = roleIds.filter((el) => {
        if (el.roleId === roleId) {
          return el;
        }
      });

      values.roleName = roleNameArray[0].roleName;
      dispatch(updateAccount(values));
      setModalUpdateOpen(false);
    },
  });

  const fetchAccount = async (userId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(getAccountByIdAPI + userId);
      formik.setValues(res.data);
      setOldData(res.data);
      setRoleId(res.data.roleId);
      setValue(res.data.birthdate);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId > 0) fetchAccount(userId);
  }, [userId]);

  const loadRole = async () => {
    try {
      const res = await axiosInstance.get(listRoleAPI);
      setRoleId(res.data[0].roleId);
      setRoleIds(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRole();
  }, []);

  const handleCancel = () => {
    formik.values.salary = oldData.salary;
    formik.values.fullName = oldData.fullName;
    formik.values.phone = oldData.phone;
    formik.values.email = oldData.email;
    setValue(oldData.birthdate);
    setRoleId(oldData.roleId);
    setModalUpdateOpen(false);
  };

  return (
    <>
      <Modal
        title="Thông tin nhân viên"
        open={modalUpdateOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        {loading === false && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Họ và tên"
              name="fullName"
              autoComplete="fullName"
              value={formik.values.fullName}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <Typography style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.fullName}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              disabled
              label="Tên đăng nhập"
              name="username"
              value={formik.values.userName}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phonenumber"
              label="Số điện thoại"
              name="phone"
              autoComplete="phonenumber"
              value={formik.values.phone}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <Typography style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.phone}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <Typography style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.email}
              </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày sinh"
                name="birthdate"
                value={value}
                disableFuture={true}
                onChange={(newValue) => {
                  setValue(newValue);
                  console.log(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              required
              fullWidth
              id="salary"
              label="Lương"
              name="salary"
              autoComplete="salary"
              value={formik.values.salary}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.salary && formik.touched.salary && (
              <Typography style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.salary}
              </Typography>
            )}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="permisstion">Quyền hạn</InputLabel>
                <Select
                  labelId="permisstion"
                  id="permisstionSelect"
                  label="Quyền hạn"
                  className="min-h-[70px] min-w-[200px]"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                >
                  {roleIds?.map((item) => (
                    <MenuItem key={item.roleId} value={item.roleId}>
                      <RoleTag role={item.roleName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalUpdateAccount;
