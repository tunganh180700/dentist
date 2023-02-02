import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  listUserAPI,
  updateAccountAPI,
  deleteAccountAPI,
  addAccountAPI,
} from "../../config/baseAPI";
import { toast } from "react-toastify";
import { toastCss } from "../toastCss";
import {
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  ADD_FAIL_ACCOUNT,
} from "../../config/constant";
import axiosInstance from "../../config/customAxios";

const initState = {
  listAccount: [],
  pagination: [],
  status: false,
  index: 0,
  pageSize: 10,
  totalPage: 0,
  totalElements: 0,
  statusUpdateAccount: false,
  isUpdateAccount: false,
  statusDeleteAccount: false,
  isDeleteAccount: false,
  statusAddAccount: false,
  isAddAccount: false,
  message: "",
  fullName: "",
};

const listAccountSlice = createSlice({
  name: "listAccount",
  initialState: initState,
  reducers: {
    setListAccount: (state, action) => {
      state.listAccount = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setIsUpdateAccount: (state, action) => {
      state.isUpdateAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccount.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchAllAccount.fulfilled, (state, action) => {
        state.listAccount = action.payload.content;
        state.status = false;
        state.pageNumber = action.payload.pageNumber;
        state.totalPage = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.isUpdateAccount = false;
        state.isDeleteAccount = false;
        state.isAddAccount = false;
        state.message = action.payload.message;
      })
      .addCase(updateAccount.pending, (state, action) => {
        state.statusUpdateAccount = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isUpdateAccount = true;
      })
      .addCase(deleteAccount.pending, (state, action) => {
        state.statusDeleteAccount = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isDeleteAccount = true;
      })
      .addCase(addAccount.pending, (state, action) => {
        state.statusAddAccount = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.isAddAccount = true;
      });
  },
});

export const fetchAllAccount = createAsyncThunk(
  "listAccount/fetchAllAccount",
  async (paramsSearch) => {
    try {
      const res = await axiosInstance.get(listUserAPI, {
        params: paramsSearch,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "listAccount/updateAccount",
  async (data) => {
    // console.log(data.userId)
    try {
      const res = await axiosInstance.put(updateAccountAPI + data.userId, data);
      toast.success(UPDATE_SUCCESS, toastCss);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(ADD_FAIL_ACCOUNT, toastCss);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "listAccount/deleteAccount",
  async (userId) => {
    console.log(userId);
    try {
      const res = await axiosInstance.delete(deleteAccountAPI + userId);
      toast.success(DELETE_SUCCESS, toastCss);
      return userId;
    } catch (error) {
      toast.error(DELETE_FAIL, toastCss);
    }
  }
);

export const addAccount = createAsyncThunk(
  "listAccount/addAccount",
  async (values) => {
    try {
      // const formValue = {
      //     fullName: values.fullName,
      //     birthdate: values.birthdate,
      //     password: values.password,
      //     email: values.email,
      //     phone: values.phone,
      //     salary: values.salary,
      //     roleId: values.roleId
      // }
      console.log(values);
      const res = await axiosInstance.post(addAccountAPI, values);
      toast.success("Thêm mới thành công !!!!!", toastCss);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(ADD_FAIL_ACCOUNT, toastCss);
    }
  }
);
export const { setListAccount, setFullName, setIsUpdateAccount } = listAccountSlice.actions;
export default listAccountSlice.reducer;
