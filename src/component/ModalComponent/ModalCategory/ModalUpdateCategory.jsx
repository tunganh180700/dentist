import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateCategory } from "../../../redux/ServiceAndCategorySlice/listCategorySlice";
import { getCategoryByIdAPI } from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import InputDentist from "../../ui/input";

const ModalUpdateCategory = ({ modalUpdateOpen, setModalUpdateOpen }) => {
  const dispatch = useDispatch();
  const categoryServiceId = useSelector(
    (state) => state.modal.categoryServiceId
  );
  const [loading, setLoading] = useState();
  const [value, setValue] = useState(null);

  const validationSchema = yup.object({
    categoryServiceName: yup
      .string("Nhập category")
      .max(250, "Category không thể quá 250 ký tự.")
      .required("Category là bắt buộc."),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateCategory(values));
      setModalUpdateOpen(false);
    },
  });
  const fetchCategory = async (categoryServiceId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        getCategoryByIdAPI + categoryServiceId
      );
      console.log(res.data);
      formik.setValues(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (categoryServiceId > 0) fetchCategory(categoryServiceId);
  }, [categoryServiceId]);

  return (
    <>
      <Modal
        title="Cập nhật loại dịch vụ"
        open={modalUpdateOpen}
        onOk={formik.handleSubmit}
        onCancel={() => setModalUpdateOpen(false)}
      >
        <InputDentist
          margin="normal"
          required
          id="categoryServiceName"
          label="Loại dịch vụ"
          isEdit
          value={formik.values.categoryServiceName}
          autoFocus
          onChange={formik.handleChange}
          error={{
            message: formik.errors.categoryServiceName,
            touched: formik.touched.categoryServiceName,
          }}
        />
      </Modal>
    </>
  );
};

export default ModalUpdateCategory;
