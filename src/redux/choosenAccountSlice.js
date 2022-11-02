import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getAccountByIdAPI } from "../config/baseAPI"

const initState = {
    choosenAccount: {},
    status: false,
    statusUser: false,
    statusDeleteAccount: false,
    name: '',
    userName: '',
    birthdate: '',
    phone: '',
    salary: '',
    roleId: ''

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
        setUserName: (state, action) => {
            state.userName = action.payload
        },
        setBirthdate: (state, action) => {
            state.birthdate = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccount.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.choosenAccount = action.payload;
                state.name = action.payload.fullName;
                state.userName = action.payload.userName;
                state.birthdate = action.payload.birthdate;
                state.phone = action.payload.phone;
                state.salary = action.payload.salary;
                state.roleId = action.payload.roleId;
                state.status = false
            })
    }
})
export const fetchAccount = createAsyncThunk('users/fetchAccount', async (userId) => {
    try {
        const res = await axios.get(
            getAccountByIdAPI + userId,
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const { setChoosenAccount, setName, setUserName, setBirthdate, setPhone, setMessage } = choosenAccountSlice.actions;
export default choosenAccountSlice.reducer;

