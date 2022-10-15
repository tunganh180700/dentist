import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getAccountByIdAPI } from "../config/baseAPI"

const initState = {
    choosenAccount: {},
    status: false,
    statusUser: false,
    statusDeleteAccount: false,
    name: ''
}
const choosenAccountSlice = createSlice({
    name: 'choosenAccount',
    initialState: initState,
    reducers: {
        setChoosenAccount: (state, action) => {
            state.choosenAccount = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccount.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.choosenAccount = action.payload;
                state.name = action.payload.name
                state.status = false
            })
    }
})
export const fetchAccount = createAsyncThunk('users/fetchAccount', async (userId) => {
    try {
        const res = await axios.get(
            getAccountByIdAPI + userId,
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const { setChoosenAccount, setName } = currentUserSlice.actions;
export default choosenAccountSlice.reducer;

