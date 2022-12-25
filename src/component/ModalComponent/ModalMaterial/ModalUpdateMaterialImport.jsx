import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { TextField } from "@mui/material";
import "./../style.css";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateMaterialImport } from "../../../redux/MaterialSlice/listMaterialImportSlice";
import {
  getMaterialImportByIdAPI,
  listAllMaterialAPI,
} from "../../../config/baseAPI";
import { regexNumber, validationDate } from "../../../config/validation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";
import axiosInstance from "../../../config/customAxios";

const ModalUpdateMaterialImport = ({ modalUpdateOpen, setModalUpdateOpen }) => {
  const dispatch = useDispatch();
  const materialImportId = useSelector((state) => state.modal.materialImportId);
  const [loading, setLoading] = useState();
  const [value, setValue] = useState(null);
  const [materialIds, setMaterialIds] = useState([]);
  const [materialId, setMaterialId] = useState();
  const [materialPrice, setMaterialPrice] = useState();

  const [oldData, setOldData] = useState();
  // const [unitPrice, setUnitPrice] = useState();

  const validationSchema = yup.object({
    materialName: yup
      .string("Nhập tên vật liệu")
      .max(255, "Vật liệu không thể quá 255 ký tự.")
      .required("Vật liệu là bắt buộc."),
    supplyName: yup
      .string("Nhập đơn vị cung cấp")
      .max(250, "Đơn vị cung cấp không thể quá 250 ký tự.")
      .required("Đơn vị cung cấp là bắt buộc."),
    amount: yup
      .string("Nhập số lượng")
      .matches(regexNumber, "Số lượng không được nhập chữ, kí tự, số âm.")
      .required("Số lượng là bắt buộc."),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.date = moment(value.$d).format(validationDate);
      values.materialId = materialId;
      values.totalPrice = materialPrice;
      // values.unitPrice = unitPrice;
      dispatch(updateMaterialImport(values));
      setModalUpdateOpen(false);
    },
  });

  const fetchMaterialImport = async (materialImportId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        getMaterialImportByIdAPI + materialImportId
      );
      console.log(res.data);
      formik.setValues(res.data);
      console.log("id", res.data.materialId);
      setMaterialId(res.data.materialId);
      console.log("here: ", res.data.materialId);
      setValue(res.data.date);
      setOldData(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (materialImportId > 0) fetchMaterialImport(materialImportId);
  }, [materialImportId]);

  useEffect(() => {
    const price = (formik.values.unitPrice || 0) * (formik.values.amount || 0);
    setMaterialPrice(price);
  }, [formik.values.unitPrice, formik.values.amount]);

  const loadMaterial = async () => {
    try {
      const res = await axiosInstance.get(listAllMaterialAPI);
      setMaterialIds(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMaterial();
  }, []);

  const handleCancel = () => {
    formik.values.supplyName = oldData.supplyName;
    setValue(oldData.date);
    formik.values.amount = oldData.amount;
    formik.values.unitPrice = oldData.unitPrice;

    // formik.errors.supplyName = ""
    // formik.touched.supplyName = ""
    setModalUpdateOpen(false);
  };

  return (
    <>
      <Modal
        title="Thông Tin Vật Liệu Nhập Khẩu"
        open={modalUpdateOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        {loading === false && (
          <>
            <TextField
              margin="normal"
              required
              disabled
              fullWidth
              id="materialName"
              label="Vật liệu"
              name="materialName"
              autoComplete="materialName"
              value={formik.values.materialName}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.materialName && formik.touched.materialName && (
              <Typography style={{ color: "red" }}>
                {formik.errors.materialName}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="supplyName"
              label="Vật liệu cung cấp"
              name="supplyName"
              autoComplete="supplyName"
              value={formik.values.supplyName}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.supplyName && formik.touched.supplyName && (
              <Typography style={{ color: "red" }}>
                {formik.errors.supplyName}
              </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
               className="my-2"
                label="Date"
                name="date"
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
              id="amount"
              label="Số lượng"
              name="amount"
              type={"number"}
              min={0}
              autoComplete="amount"
              value={formik.values.amount}
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.errors.amount && formik.touched.amount && (
              <Typography style={{ color: "red" }}>
                {formik.errors.amount}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="unitPrice"
              label="Đơn giá"
              type={"number"}
              min={0}
              name="unitPrice"
              autoComplete="unitPrice"
              value={formik.values.unitPrice}
              autoFocus
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              disabled
              fullWidth
              id="totalPrice"
              label="Tổng tiền"
              type={"number"}
              min={0}
              name="totalPrice"
              autoComplete="totalPrice"
              value={materialPrice}
              autoFocus
              onChange={formik.handleChange}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalUpdateMaterialImport;
