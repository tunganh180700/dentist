import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getLaboByIdAPI } from "../../config/baseAPI"

const initState = {
    choosenLabo: {},
    status: false,
    statusLabo: false,
    statusDeleteLabo: false,
    laboName: '',
    phone: '',
    totalMoney: ''

}
const choosenLaboSlice = createSlice({
    name: 'choosenLabo',
    initialState: initState,
    reducers: {
        setChoosenLabo: (state, action) => {
            state.choosenLabo = action.payload
        },
        setLaboName: (state, action) => {
            state.laboName = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setTotalMoney: (state, action) => {
            state.totalMoney = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabo.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchLabo.fulfilled, (state, action) => {
                state.choosenLabo = action.payload;
                state.laboName = action.payload.laboName;
                state.phone = action.payload.phone;
                state.totalMoney = action.payload.totalMoney;
            })
    }
})
export const fetchLabo = createAsyncThunk('labos/fetchLabo', async (laboId) => {
    try {
        const res = await axios.get(
            getLaboByIdAPI + laboId,
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const { setChoosenLabo, setLaboName, setPhone, setTotalMoney, setMessage} = choosenLaboSlice.actions;
export default choosenLaboSlice.reducer;

