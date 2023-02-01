import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listLaboAPI, updateLaboAPI, deleteLaboAPI, addLaboAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"

const initState = {
    listLabo: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdateLabo: false,
    isUpdateLabo: false,
    statusDeleteLabo: false,
    isDeleteLabo: false,
    statusAddLabo: false,
    isAddLabo: false,
    message: ''
}

const listLaboSlice = createSlice({
    name: 'listLabo',
    initialState: initState,
    reducers: {
        setListLabo: (state, action) => {
            state.listLabo = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLabo.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllLabo.fulfilled, (state, action) => {
                state.listLabo = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                state.isUpdateLabo = false;
                state.isDeleteLabo = false;
                state.isAddLabo = false;
                state.message = action.payload.message
            })
            .addCase(updateLabo.pending, (state, action) => {
                state.statusUpdateLabo = true
            })
            .addCase(updateLabo.fulfilled, (state, action) => {
                state.isUpdateLabo = true
            })
            .addCase(deleteLabo.pending, (state, action) => {
                state.statusDeleteLabo = true
            })
            .addCase(deleteLabo.fulfilled, (state, action) => {
                state.isDeleteLabo = true
            })
            .addCase(addLabo.pending, (state, action) => {
                state.statusAddLabo = true
            })
            .addCase(addLabo.fulfilled, (state, action) => {
                state.isAddLabo = true
            })
    }
})

export const fetchAllLabo = createAsyncThunk('listLabo/fetchAllLabo', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listLaboAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateLabo = createAsyncThunk('listLabo/updateLabo', async (data) => {
    // console.log(data.userId)
    try {
        const res = await axiosInstance.put(
            updateLaboAPI + data.laboId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})

export const deleteLabo = createAsyncThunk('listLabo/deleteLabo', async (laboId) => {
    console.log(laboId)
    try {
        const res = await axiosInstance.delete(deleteLaboAPI + laboId)
        toast.success(DELETE_SUCCESS, toastCss)
        return laboId
    } catch (error) {
        toast.error(DELETE_FAIL, toastCss)

    }
})

export const addLabo = createAsyncThunk('listLabo/addLabo', async (values) => {
    try {
        const formValue = {
            laboName: values.laboName,
            phone: values.phone,
            totalMoney: values.totalMoney
        }
        console.log(values)
        const res = await axiosInstance.post(addLaboAPI, formValue)
        toast.success("Thêm vật liệu thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})
export const { setListLabo } = listLaboSlice.actions;
export default listLaboSlice.reducer;