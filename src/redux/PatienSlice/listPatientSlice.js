import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { listPatientAPI } from "../../config/baseAPI"
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
    message: ''
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

export const { setListPatient } = listPatientSlice.actions;
export default listPatientSlice.reducer;