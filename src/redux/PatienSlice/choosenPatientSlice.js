import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPatientByIdAPI } from "../../config/baseAPI";
import axiosInstance from "../../config/customAxios";
import { toast } from "react-toastify";
import { toastCss } from "../toastCss";
import {
  DELETE_FAIL,
  DELETE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
} from "../../config/constant";
import { updatePatientAPI, deletePatientAPI } from "../../config/baseAPI";

const initState = {
  choosenPatient: {},
  status: 0,
  statusUser: false,
  statusDeletePatient: false,
  patientName: "",
  birthdate: "",
  gender: false,
  address: "",
  phone: "",
  email: "",
  bodyPrehistory: "",
  teethPrehistory: "",
  isDeleted: null,
};
const choosenPatientSlice = createSlice({
  name: "choosenPatient",
  initialState: initState,
  reducers: {
    setChoosenPatient: (state, action) => {
      state.choosenPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchPatient.fulfilled, (state, { payload }) => {
        state.choosenPatient = payload;
        state.patientName = payload.patientName;
        state.birthdate = payload.birthdate;
        state.gender = payload.gender;
        state.address = payload.address;
        state.phone = payload.phone;
        state.email = payload.email;
        state.bodyPrehistory = payload.bodyPrehistory;
        state.teethPrehistory = payload.teethPrehistory;
        state.status = payload.status;
        state.isDeleted = payload.isDeleted;
      });
  },
});
export const fetchPatient = createAsyncThunk(
  "patients/fetchPatient",
  async (patientId) => {
    try {
      const res = await axiosInstance.get(getPatientByIdAPI + patientId);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePatient = createAsyncThunk(
  "listPatient/deletePatient",
  async (patientId) => {
    try {
      await axiosInstance.delete(deletePatientAPI + patientId);
      toast.success(DELETE_SUCCESS, toastCss);
      return true;
    } catch (error) {
      toast.error(DELETE_FAIL, toastCss);
      return false;
    }
  }
);

export const updatePatient = createAsyncThunk(
  "listPatient/updatePatient",
  async (data) => {
    // console.log(data.userId)
    try {
      const res = await axiosInstance.put(
        updatePatientAPI + data.patientId,
        data
      );
      toast.success(UPDATE_SUCCESS, toastCss);
      return res.data;
    } catch (error) {
      toast.error(UPDATE_FAIL, toastCss);
    }
  }
);
export const { setChoosenPatient } = choosenPatientSlice.actions;
export default choosenPatientSlice.reducer;
