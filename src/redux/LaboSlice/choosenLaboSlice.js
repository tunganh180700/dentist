import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getLaboByIdAPI,
  getListPrepareByIdAPI,
  getListReceiveByIdAPI,
  updatePrepareAPI,
  updateReceiveAPI,
} from "../../config/baseAPI";
import axiosInstance from "../../config/customAxios";

const initState = {
  choosenLabo: {},
  status: false,
  statusLabo: false,
  statusDeleteLabo: false,
  laboName: "",
  phone: "",
  totalMoney: "",
  specimensDTOS: [],
  prepareSample: [],
  receiveSamples: [],
  isUpdatePrepareSample: false,
  isUpdateReceiveSample: false,
  isDeleteSpecimens: false
};
const choosenLaboSlice = createSlice({
  name: "choosenLabo",
  initialState: initState,
  reducers: {
    setChoosenLabo: (state, action) => {
      state.choosenLabo = action.payload;
    },
    setLaboName: (state, action) => {
      state.laboName = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setTotalMoney: (state, action) => {
      state.totalMoney = action.payload;
    },
    setIsDeleteSpecimens: (state, action) => {
      state.isDeleteSpecimens = action.payload;;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabo.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchPrepareSample.pending, (state, action) => {
        state.status = true;
      })
      .addCase(updatePrepareSample.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchListReceive.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchLabo.fulfilled, (state, action) => {
        state.choosenLabo = action.payload;
        state.laboName = action.payload.laboName;
        state.phone = action.payload.phone;
        state.totalMoney = action.payload.totalMoney;
        state.specimensDTOS = action.payload.specimensDTOS;
        state.isDeleteSpecimens = false
      })
      .addCase(fetchPrepareSample.fulfilled, (state, action) => {
        state.isUpdatePrepareSample = false;
        state.prepareSample = action.payload;
      })
      .addCase(updatePrepareSample.fulfilled, (state, action) => {
        state.isUpdatePrepareSample = true;
      })
      .addCase(updateReceiveSample.fulfilled, (state, action) => {
        state.isUpdateReceiveSample = true;

      })
      .addCase(fetchListReceive.fulfilled, (state, action) => {
        state.isUpdateReceiveSample = false;
        state.receiveSamples = action.payload;
      });
  },
});

export const fetchLabo = createAsyncThunk("labos/fetchLabo", async (laboId) => {
  try {
    const res = await axiosInstance.get(getLaboByIdAPI + laboId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPrepareSample = createAsyncThunk(
  "labos/fetchPrepareSample",
  async (laboId) => {
    try {
      const res = await axiosInstance.get(getListPrepareByIdAPI + laboId);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchListReceive = createAsyncThunk(
  "labos/fetchListReceive",
  async (laboId) => {
    try {
      const res = await axiosInstance.get(getListReceiveByIdAPI + laboId);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePrepareSample = createAsyncThunk(
  "labos/updatePrepareSample",
  async (payload) => {
    try {
      const res = await axiosInstance.put(updatePrepareAPI, payload);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateReceiveSample = createAsyncThunk(
  "labos/updateReceiveSample",
  async (payload) => {
    try {
      const res = await axiosInstance.put(updateReceiveAPI, payload);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setChoosenLabo,
  setLaboName,
  setPhone,
  setTotalMoney,
  setMessage,
  setIsDeleteSpecimens
} = choosenLaboSlice.actions;

export default choosenLaboSlice.reducer;
