import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getAccountByIdAPI, getPatientByIdAPI } from "../../config/baseAPI"

const initState = {
    choosenPatient: {},
    status: false,
    statusUser: false,
    statusDeletePatient: false,

}
const choosenAccountSlice = createSlice({
    name: 'choosenPatient',
    initialState: initState,
    reducers: {
        setChoosenPatient: (state, action) => {
            state.choosenPatient = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatient.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.choosenPatient = action.payload;
                state.status = false
            })
    }
})
export const fetchPatient = createAsyncThunk('patients/fetchPatient', async (patientId) => {
    try {
        const res = await axios.get(
            getPatientByIdAPI + patientId,
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const { setChoosenPatient } = choosenAccountSlice.actions;
export default choosenAccountSlice.reducer;

