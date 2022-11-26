import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getPatientByIdAPI } from "../../config/baseAPI"

const initState = {
    choosenPatient: {},
    status: false,
    statusUser: false,
    statusDeletePatient: false,
    patientName: '',
    birthdate: '',
    gender: false,
    address: '',
    phone: '',
    email: '',
    bodyPrehistory: '',
    teethPrehistory: ''

}
const choosenPatientSlice = createSlice({
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
                state.patientName = action.payload.patientName;
                state.birthdate = action.payload.birthdate;
                state.gender = action.payload.gender;
                state.address = action.payload.address;
                state.phone = action.payload.phone;
                state.email = action.payload.email
                state.bodyPrehistory = action.payload.bodyPrehistory
                state.teethPrehistory = action.payload.teethPrehistory
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
export const { setChoosenPatient } = choosenPatientSlice.actions;
export default choosenPatientSlice.reducer;

