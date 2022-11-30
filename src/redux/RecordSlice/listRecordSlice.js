import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { addRecordAPI } from "../../config/baseAPI"
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
    statusDeletePatient: false,
    isDeletePatient: false,
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

    }

})

export const addRecord = createAsyncThunk('listRecord/addRecord', async ({id, values}) => {
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

export const { setListRecord } = listRecordSlice.actions;
export default listRecordSlice.reducer;