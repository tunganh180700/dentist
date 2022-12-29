import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Radio, Space } from "antd";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getPatientByIdAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import {
  regexEmail,
  regexName,
  regexPhone,
  validationDate,
} from "../../../config/validation";
import { updatePatient } from "../../../redux/PatienSlice/listPatientSlice";
import DatePickerDentist from "../../ui/date-picker/DatePickerDentist";
import InputDentist from "../../ui/input";

const ModalUpdatePatient = ({
  modalUpdateOpen,
  setModalUpdateOpen,
  isSubmitForm,
}) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState();
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState();
  const patientId = useSelector((state) => state.modal.userId);

  const [oldData, setOldData] = useState();

  const validationSchema = yup.object({
    patientName: yup
      .string("Nhập họ tên")
      .matches(regexName, "Họ và tên không được nhập số hoặc kí tự đặc biệt")
      .required("Họ tên là bắt buộc."),
    phone: yup
      .string("Nhập số điện thoại")
      .matches(
        regexPhone,
        "Số điện thoại không được nhập chữ, kí tự, bắt buộc phải 10 số bắt đầu là 03, 05, 07 08, 09."
      )
      .required("Số điện thoại là bắt buộc."),
    email: yup
      .string("Nhập email")
      .matches(regexEmail, "Email không đúng với định dạng."),
    address: yup
      .string("Nhập địa chỉ")
      .max(255, "Địa chỉ không thể quá 255 kí tự.")
      .required("Địa chỉ là bắt buộc."),
  });

  const formik = useFormik({
    initialValues: {},
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      values.birthdate = moment(value).format(validationDate);
      values.gender = gender;
      dispatch(updatePatient(values));
      setModalUpdateOpen(false);
      isSubmitForm(true);
    },
  });

  const fetchPatient = async (patientId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(getPatientByIdAPI + patientId);
      console.log("gender", res.data.gender);
      formik.setValues(res.data);
      setOldData(res.data);
      setValue(res.data.birthdate);
      setGender(res.data.gender);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (patientId) fetchPatient(patientId);
  }, [patientId]);

  const handleCancel = () => {
    // formik.values.patientName = oldData.patientName;
    // formik.values.phone = oldData.phone;
    // formik.values.address = oldData.address;
    // formik.values.bodyPrehistory = oldData.bodyPrehistory;
    // formik.values.teethPrehistory = oldData.teethPrehistory;
    // setGender(oldData.gender);
    // setValue(oldData.birthdate);
    setModalUpdateOpen(false);
  };

  return (
    <>
      <Modal
        title="Thêm Bệnh Nhân"
        open={modalUpdateOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        <InputDentist
          id="patientName"
          label="Họ và tên bệnh nhân"
          required
          value={formik.values.patientName}
          onChange={formik.handleChange}
          error={{
            message: formik.errors.patientName,
            touched: formik.touched.patientName,
          }}
        />
        <Box className="mb-2">
          <p className="mb-1 font-bold">
            Ngày sinh<span className="text-red-600">*</span>
          </p>
          <DatePickerDentist
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <InputDentist
          id="phonenumber"
          label="Số điện thoại"
          required
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={{
            message: formik.errors.phone,
            touched: formik.touched.phone,
          }}
        />
        <Box className="flex gap-3 mb-2">
          <span className="mr-3  font-bold">Gender:</span>
          <Radio.Group
            style={{ marginRight: "30%" }}
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="items-center"
          >
            <FormControlLabel value={true} control={<Radio />} label="Nam" />
            <FormControlLabel value={false} control={<Radio />} label="Nữ" />
          </Radio.Group>
        </Box>
        <InputDentist
          id="address"
          label="Địa chỉ"
          required
          value={formik.values.address}
          onChange={formik.handleChange}
          error={{
            message: formik.errors.address,
            touched: formik.touched.address,
          }}
        />
        <InputDentist
          id="email"
          label="Email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          error={{
            message: formik.errors.email,
            touched: formik.touched.email,
          }}
        />
        <InputDentist
          id="bodyPrehistory"
          label="Tiền sử cơ thể"
          value={formik.values.bodyPrehistory}
          onChange={formik.handleChange}
        />
        <InputDentist
          id="teethPrehistory"
          label="Tiền sử răng miệng"
          value={formik.values.teethPrehistory}
          onChange={formik.handleChange}
        />
      </Modal>
    </>
  );
};

export default ModalUpdatePatient;
