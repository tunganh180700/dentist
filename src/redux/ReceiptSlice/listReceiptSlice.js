import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"
import { getListReceiptsByIdAPI, addNewReceiptByIdAPI } from "../../config/baseAPI"

const initState = {
    listReceipts: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    // statusUpdateSpecimens: false,
    // isUpdateSpecimens: false,
    // statusDeleteSpecimens: false,
    // isDeleteSpecimens: false,
    statusAddNewReceipt: false,
    isAddNewReceipt: false,
}

const listReceiptsSlice = createSlice({
    name: 'listReceipts',
    initialState: initState,
    reducers: {
        setListReceipts: (state, action) => {
            state.listReceipts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReceipts.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllReceipts.fulfilled, (state, action) => {
                state.listReceipts = action.payload;
                // state.isUpdateSpecimens = false;
                // state.isDeleteSpecimens = false;
                state.isAddNewReceipt = false;
            })
            .addCase(addNewReceipt.pending, (state, action) => {
                state.statusAddNewReceipt = true
            })
            .addCase(addNewReceipt.fulfilled, (state, action) => {
                state.isAddNewReceipt = true
            })
    }
})

export const fetchAllReceipts = createAsyncThunk('listReceipts/fetchAllReceipts', async (treatmentId) => {
    try {
        const res = await axiosInstance.get(getListReceiptsByIdAPI + treatmentId)
        console.log("receipt here:",res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const addNewReceipt = createAsyncThunk('listReceipts/addNewReceipt', async ({patientId,values}) => {
    try {
       
        console.log(values)
        const res = await axiosInstance.post(addNewReceiptByIdAPI + patientId, values)
        toast.success("Thêm phiếu thu thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})

export const { setListReceipts } = listReceiptsSlice.actions;
export default listReceiptsSlice.reducer;