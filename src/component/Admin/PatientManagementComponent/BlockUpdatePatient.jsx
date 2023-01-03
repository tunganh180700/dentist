import { Box, FormControlLabel, Button } from "@mui/material";
import { Radio, Space } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getPatientByIdAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import { updatePatient } from "../../../redux/PatienSlice/listPatientSlice";
import DatePickerDentist from "../../ui/date-picker/DatePickerDentist";
import InputDentist from "../../ui/input";
import {
  regexEmail,
  regexName,
  regexPhone,
  validationDate,
} from "../../../config/validation";

const BlockUpdatePatient = ({setIsEdit , userInfo, submit }) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState(userInfo.gender);
  const [valueDate, setValueDate] = useState(moment(userInfo.birthdate));
  const [loading, setLoading] = useState();
  const patientId = useSelector((state) => state.modal.userId);

  // const [oldData, setOldData] = useState();

  const validationSchema = yup.object({
    patientName: yup
      .string("Nhập họ tên")
      .matches(regexName, "Họ và tên không được nhập số hoặc kí tự đặc biệt"),
    phone: yup
      .string("Nhập số điện thoại")
      .matches(
        regexPhone,
        "Số điện thoại không được nhập chữ, kí tự, bắt buộc phải 10 số bắt đầu là 03, 05, 07 08, 09."
      ),
    email: yup
      .string("Nhập email")
      .matches(regexEmail, "Email không đúng với định dạng."),
    address: yup
      .string("Nhập địa chỉ")
      .max(255, "Địa chỉ không thể quá 255 kí tự."),
  });

  const formik = useFormik({
    initialValues: userInfo,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const valueForm = { ...values };
      valueForm.birthdate = moment(valueDate).format(validationDate);
      valueForm.gender = gender;
      dispatch(updatePatient(valueForm));
      submit(true);
    },
  });

  const fetchPatient = async (patientId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(getPatientByIdAPI + patientId);
      formik.setValues(res.data);
      // setOldData(res.data);
      setValueDate(res.data.birthdate);
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
  };

  return (
    <>
      <InputDentist
        id="patientName"
        isFlex
        label="Họ và tên:"
        value={formik.values.patientName}
        onChange={formik.handleChange}
        error={{
          message: formik.errors.patientName,
          touched: formik.touched.patientName,
        }}
      />
      <Box className="flex items-center mb-2">
        <p className="mb-1 font-bold w-1/3">Ngày sinh</p>
        <Box className="w-full">
          <DatePickerDentist
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
            }}
          />
        </Box>
      </Box>
      <InputDentist
        id="phonenumber"
        isFlex
        label="Số điện thoại"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={{
          message: formik.errors.phone,
          touched: formik.touched.phone,
        }}
      />
      <Box className="flex items-center gap-3 mb-2">
        <span className="font-bold w-1/3">Giới tính:</span>
        <Radio.Group
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          className="items-center w-full"
        >
          <FormControlLabel value={true} control={<Radio />} label="Nam" />
          <FormControlLabel value={false} control={<Radio />} label="Nữ" />
        </Radio.Group>
      </Box>
      <InputDentist
        id="address"
        isFlex
        label="Địa chỉ"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={{
          message: formik.errors.address,
          touched: formik.touched.address,
        }}
      />
      <InputDentist
        id="email"
        isFlex
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={{
          message: formik.errors.email,
          touched: formik.touched.email,
        }}
      />
      <InputDentist
        id="bodyPrehistory"
        isFlex
        label="Tiền sử cơ thể"
        value={formik.values.bodyPrehistory}
        onChange={formik.handleChange}
      />
      <InputDentist
        id="teethPrehistory"
        isFlex
        label="Tiền sử răng miệng"
        value={formik.values.teethPrehistory}
        onChange={formik.handleChange}
      />
     <Box className="flex justify-end gap-3">
     <Button variant="contained" color="info" onClick={formik.handleSubmit}>
        <span className="leading-none">Lưu</span>
      </Button>
      <Button variant="contained" color="error" onClick={() => setIsEdit(false)}>
        <span className="leading-none">Hủy</span>
      </Button>
     </Box>
    </>
  );
};

export default BlockUpdatePatient;
