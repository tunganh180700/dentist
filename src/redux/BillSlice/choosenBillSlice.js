import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getBillByIdAPI } from "../../config/baseAPI"
import axiosInstance from "../../config/customAxios"

const initState = {
    choosenBill: {},
    status: false,
    statusBill: false,
    treatmentServiceMapDTOList: []
}

const choosenBillSlice = createSlice({
    name: 'choosenBill',
    initialState: initState,
    reducers: {
        setChoosenBill: (state, action) => {
            state.choosenBill = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBill.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchBill.fulfilled, (state, action) => {
                state.choosenBill = action.payload;
                state.treatmentServiceMapDTOList =action.payload.treatmentServiceMapDTOList
                state.status = false
            })

    }
})

export const fetchBill = createAsyncThunk('bills/fetchBill', async(treatmentId) => {
    try {
        const res = await axiosInstance.get(
            getBillByIdAPI + treatmentId,
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const {setChoosenBill} = choosenBillSlice.actions;
export default choosenBillSlice.reducer;