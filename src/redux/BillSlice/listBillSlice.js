import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { listBillAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"



const initState = {
    listBill: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 10,
    totalPage: 0,
    statusUpdateBill: false,
    isUpdateBill: false,
    message: ''
}

const listBillSlice = createSlice({
    name: 'listBill',
    initialState: initState,
    reducers: {
        setListBill: (state, action) => {
            state.listBill = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBill.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllBill.fulfilled, (state, action) => {
                state.listBill = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPage = action.payload.totalPages;
                state.message = action.payload.message
            })

    }
})





export const fetchAllBill = createAsyncThunk('listBill/fetchAllBill', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listBillAPI, {
            params: paramsSearch,
        })
        console.log('data bill: ', res.data);
        return res.data

    } catch (error) {
        console.log(error)
    }
})


export const { setListBill } = listBillSlice.actions;
export default listBillSlice.reducer;

