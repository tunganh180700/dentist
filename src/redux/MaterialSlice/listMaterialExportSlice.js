import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listMaterialExportAPI,updateMaterialExportAPI, addMaterialExportAPI, deleteMaterialExportAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"

const initState = {
    listMaterialExport: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdateMaterialExport: false,
    isUpdateMaterialExport: false,
    statusDeleteMaterialExport: false,
    isDeleteMaterialExport: false,
    statusAddMaterialExport: false,
    isAddMaterialExport: false,
    message: ''
}

const listMaterialExportSlice = createSlice({
    name: 'listMaterialExport',
    initialState: initState,
    reducers: {
        setListMaterialExport: (state, action) => {
            state.listMaterialExport = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMaterialExport.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllMaterialExport.fulfilled, (state, action) => {
                state.listMaterialExport = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                state.isUpdateMaterialExport = false;
                state.isDeleteMaterialExport = false;
                state.isAddMaterialExport = false;
                state.message = action.payload.message
            })
            .addCase(updateMaterialExport.pending, (state, action) => {
                state.statusUpdateMaterialExport = true
            })
            .addCase(updateMaterialExport.fulfilled, (state, action) => {
                state.isUpdateMaterialExport = true
            })
            .addCase(deleteMaterialExport.pending, (state, action) => {
                state.statusDeleteMaterialExport = true
            })
            .addCase(deleteMaterialExport.fulfilled, (state, action) => {
                state.isDeleteMaterialExport = true
            })
            .addCase(addMaterialExport.pending, (state, action) => {
                state.statusAddMaterialExport = true
            })
            .addCase(addMaterialExport.fulfilled, (state, action) => {
                state.isAddMaterialExport = true
            })
    }
})

export const fetchAllMaterialExport = createAsyncThunk('listMaterialExport/fetchAllMaterialExport', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listMaterialExportAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateMaterialExport = createAsyncThunk('listMaterialExport/updateMaterialExport', async (data) => {

    try {
        const res = await axiosInstance.put(
            updateMaterialExportAPI + data.materialExportId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})

export const deleteMaterialExport = createAsyncThunk('listMaterialExport/deleteMaterialExport', async (materialExportId) => {
    console.log('sss',materialExportId)
    try {
        const res = await axiosInstance.delete(deleteMaterialExportAPI + materialExportId)
        toast.success(DELETE_SUCCESS, toastCss)
        return materialExportId
    } catch (error) {
        toast.error(DELETE_FAIL, toastCss)

    }
})

export const addMaterialExport = createAsyncThunk('listMaterialExport/addMaterialExport', async (values) => {
    try {
       
        console.log(values)
        const res = await axiosInstance.post(addMaterialExportAPI, values)
        toast.success("Thêm vật liệu thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})
export const { setListMaterialExport } = listMaterialExportSlice.actions;
export default listMaterialExportSlice.reducer;