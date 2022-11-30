import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { addRecordAPI, deleteRecordAPI } from "../../config/baseAPI"
import { DELETE_FAIL, DELETE_SUCCESS } from "../../config/constant"
import axiosInstance from "../../config/customAxios"
import { toastCss } from "../toastCss"

const initState = {
    listRecord: [],
    pagination: [],
    index: 0,
    pageSize: 10,
    totalPage: 0,
    totalElements: 0,
    statusUpdatePatient: false,
    isUpdatePatient: false,
    statusDeleteRecord: false,
    isDeleteRecord: false,
    statusAddRecord: false,
    isAddRecord: false,
    statusSearchPatient: false,
    isSearchPatient: false,
    message: '',
    statusPatient: 0
}

const listRecordSlice = createSlice({
    name: 'listRecord',
    initialState: initState,
    reducers: {
        setListRecord: (state, action) => {
            state.listPatient = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addRecord.pending, (state, action) => {
                state.statusAddRecord = true
            })
            .addCase(addRecord.fulfilled, (state, action) => {
                state.isAddRecord = true
            })
            .addCase(deleteRecord.pending, (state, action) => {
                state.statusDeleteRecord = true
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                state.isDeleteRecord = true
            })

    }

})

export const addRecord = createAsyncThunk('listRecord/addRecord', async ({ id, values }) => {
    try {
        const res = await axiosInstance.post(addRecordAPI + id, values)
        toast.success("Thêm mới thành công !!!!!", toastCss)
        // console.log(patientRecordId)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})

export const deleteRecord = createAsyncThunk('listRecord/deleteRecord', async (recordId) => {

    try {
        const res = await axiosInstance.delete(deleteRecordAPI + recordId)
        toast.success(DELETE_SUCCESS, toastCss)
        return recordId
    } catch (error) {
        toast.error(DELETE_FAIL, toastCss)

    }
})
export const { setListRecord } = listRecordSlice.actions;
export default listRecordSlice.reducer;