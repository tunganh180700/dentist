import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { addPatientAPI, deletePatientAPI, listPatientAPI } from "../../config/baseAPI"
import { DELETE_FAIL, DELETE_SUCCESS } from "../../config/constant"
import { toastCss } from "../toastCss"

const initState = {
    listPatient: [],
    pagination: [],
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdatePatient: false,
    isUpdatePatient: false,
    statusDeletePatient: false,
    isDeletePatient: false,
    statusAddPatient: false,
    isAddPatient: false,
    message: '',
}

const listPatientSlice = createSlice({
    name: 'listPatient',
    initialState: initState,
    reducers: {
        setListPatient: (state, action) => {
            state.listPatient = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPatient.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllPatient.fulfilled, (state, action) => {
                state.listPatient = action.payload.content;
                state.status = false;
                state.totalPage = action.payload.totalPages;
                state.isAddPatient = false;
                state.isDeletePatient = false
            })
            .addCase(addPatient.pending, (state, action) => {
                state.statusAddPatient = true
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.isAddPatient = true
            })
            .addCase(deletePatient.pending, (state, action) => {
                state.statusDeletePatient = true
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.isDeletePatient = true
            })


    }
})

export const fetchAllPatient = createAsyncThunk('listPatient/fetchAllPatient', async (paramSearch) => {
    try {
        const res = await axios.get(listPatientAPI, {
            params: paramSearch,
        })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const addPatient = createAsyncThunk('listPatient/addPatient', async (values) => {
    try {
        const formValue = {
            patientName: values.patientName,
            birthdate: values.birthdate,
            gender: values.gender,
            address: values.address,
            phone: values.phone,
            email: values.email,
            bodyPrehistory: values.bodyPrehistory,
            teethPrehistory: values.teethPrehistory
        }
        console.log(values)
        const res = await axios.post(addPatientAPI, formValue)
        toast.success("Thêm mới thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})

export const deletePatient = createAsyncThunk('listPatient/deletePatient', async (patientId) => {
    console.log(patientId)
    try {
        const res = await axios.delete(deletePatientAPI + patientId)
        toast.success(DELETE_SUCCESS, toastCss)
        return patientId
    } catch (error) {
        toast.error(DELETE_FAIL, toastCss)

    }
})

export const { setListPatient } = listPatientSlice.actions;
export default listPatientSlice.reducer;