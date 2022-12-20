import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { addRecordAPI, deleteRecordAPI, patientRecordAPI, updateRecordAPI } from "../../config/baseAPI"
import { DELETE_FAIL, DELETE_FAIL_RECORD, DELETE_SUCCESS, UPDATE_FAIL, UPDATE_SUCCESS } from "../../config/constant"
import axiosInstance from "../../config/customAxios"
import { toastCss } from "../toastCss"

const initState = {
    listRecord: [],
    pagination: [],
    index: 0,
    pageSize: 3,
    totalPage: 0,
    totalElements: 0,
    statusUpdateRecord: false,
    isUpdateRecord: false,
    statusDeleteRecord: false,
    isDeleteRecord: false,
    statusAddRecord: false,
    isAddRecord: false,
    statusSearchPatient: false,
    isSearchPatient: false,
    message: '',
    statusPatient: 0,
    listService: [],
    status: '',

    reason: '',
    diagnostic: '',
    causal: '',
    date: '',
    marrowRecord: '',
    note: '',
    treatment: '',
    prescription: ''
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
            .addCase(fetchRecord.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchRecord.fulfilled, (state, action) => {
                state.listRecord = action.payload
                state.listService = action.payload.serviceDTOS
                state.totalPage = action.payload.totalPages

                state.reason = action.payload.reason;
                state.diagnostic = action.payload.diagnostic;
                state.causal = action.payload.causal;
                state.date = action.payload.date;
                state.marrowRecord = action.payload.marrowRecord;
                state.note = action.payload.note
                state.treatment = action.payload.treatment
                state.prescription = action.payload.prescription
            })
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
            .addCase(updateRecord.pending, (state, action) => {
                state.statusUpdateRecord = true
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.isUpdateRecord = true
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
        toast.error(DELETE_FAIL_RECORD, toastCss)

    }
})

export const updateRecord = createAsyncThunk('listRecord/updateRecord', async (data) => {
    // console.log(data.userId)
    try {
        const res = await axiosInstance.put(
            updateRecordAPI + data.recordId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})

// const fetchRecord = async (recordId) => {
//     try {
//         const res = await axiosInstance.get(
//             patientRecordAPI + recordId,
//         )
//         // console.log("list ser", res.data.serviceDTOS)
//         setListRecord(res.data)
//         setListService(res.data.serviceDTOS)
//         console.log("list rec", listRecord)

//         console.log("ser list", listService)
//         // setGender(res.data.gender)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const fetchRecord = createAsyncThunk('listRecord/fetchRecord', async (patientRecordId) => {
    try {
        const res = await axiosInstance.get(patientRecordAPI + patientRecordId)
        console.log("list", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListRecord } = listRecordSlice.actions;
export default listRecordSlice.reducer;