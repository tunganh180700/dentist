import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listAllCategoryAPI,
  addCategoryAPI,
  deleteServiceAPI,
  addServiceAPI,
  updateServiceAPI,
  updateCategoryBySelectIdAPI,
} from "../../config/baseAPI";
import { toast } from "react-toastify";
import { toastCss } from "../toastCss";
import {
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from "../../config/constant";
import axiosInstance from "../../config/customAxios";

const initState = {
  listCategory: [],
  pagination: [],
  status: false,
  index: 0,
  pageSize: 3,
  totalPage: 0,
  statusUpdateCategory: false,
  isUpdateCategory: false,
  statusDeleteCategory: false,
  isDeleteCategory: false,
  statusAddCategory: false,
  isAddCategory: false,

  statusAddService: false,
  isAddService: false,
  statusDeleteService: false,
  isDeleteService: false,
  statusUpdateService: false,
  isUpdateService: false,
  listServiceDTO: [],
  message: "",
  id: 0,
};

const listCategorySlice = createSlice({
  name: "listCategory",
  initialState: initState,
  reducers: {
    setListCategory: (state, action) => {
      state.listCategory = action.payload;
    },
    setIsAddCategory: (state, action) => {
      state.isAddCategory = action.payload;
    },
    setIsUpdateCategory: (state, action) => {
      state.isUpdateCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.listCategory = action.payload;
        state.id = action.payload.categoryServiceId;
        state.status = false;
        state.pageNumber = action.payload.pageNumber;
        state.totalPage = action.payload.totalPages;
        state.isUpdateCategory = false;
        // state.isDeleteCategory = false;
        state.isDeleteService = false;
        state.isAddCategory = false;
        state.isAddService = false;
        state.isUpdateService = false;
        state.message = action.payload.message;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.statusUpdateCategory = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isUpdateCategory = true;
      })
      .addCase(updateService.pending, (state, action) => {
        state.statusUpdateService = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isUpdateService = true;
      })
      .addCase(deleteService.pending, (state, action) => {
        state.statusDeleteService = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isDeleteService = true;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.statusAddCategory = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isAddCategory = true;
      })
      .addCase(addService.pending, (state, action) => {
        state.statusAddService = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.isAddService = true;
      });
  },
});

export const fetchAllCategory = createAsyncThunk(
  "listCategory/fetchAllCategory",
  async (paramsSearch) => {
    try {
      const res = await axiosInstance.get(listAllCategoryAPI, {
        params: paramsSearch,
      });
      console.log("du lieu check: ", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "listCategory/updateCategory",
  async (data) => {
    // console.log(data.userId)
    try {
      const res = await axiosInstance.put(
        updateCategoryBySelectIdAPI + data.categoryServiceId,
        data
      );
      console.log(res);
      toast.success(UPDATE_SUCCESS, toastCss);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(UPDATE_FAIL, toastCss);
    }
  }
);

export const updateService = createAsyncThunk(
  "listCategory/updateService",
  async (data) => {
    // console.log(data.userId)
    try {
      const res = await axiosInstance.put(
        updateServiceAPI + data.serviceId,
        data
      );
      console.log(res);
      toast.success(UPDATE_SUCCESS, toastCss);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(UPDATE_FAIL, toastCss);
    }
  }
);

export const deleteService = createAsyncThunk(
  "listCategory/deleteService",
  async (serviceId) => {
    console.log(serviceId);
    try {
      const res = await axiosInstance.delete(deleteServiceAPI + serviceId);
      toast.success(DELETE_SUCCESS, toastCss);
      console.log(res.data);
      return serviceId;
    } catch (error) {
      toast.error(DELETE_FAIL, toastCss);
    }
  }
);

export const addCategory = createAsyncThunk(
  "listCategory/addCategory",
  async (values) => {
    try {
      const res = await axiosInstance.post(addCategoryAPI, values);
      toast.success("Thêm loại dịch vụ thành công !!!!!", toastCss);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Thêm mới thất bại :(", toastCss);
    }
  }
);

export const addService = createAsyncThunk(
  "listService/addService",
  async (values) => {
    try {
      const res = await axiosInstance.post(addServiceAPI, values);
      toast.success("Thêm dịch vụ thành công !!!!!", toastCss);
      console.log("asdasdas", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Thêm mới thất bại :(", toastCss);
    }
  }
);
export const { setListCategory, setIsAddCategory, setIsUpdateCategory } =
  listCategorySlice.actions;
export default listCategorySlice.reducer;
