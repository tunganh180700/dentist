import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listUserAPI } from "../config/baseAPI"

const initState = {
    listAccount: [],
    status: false,
}

const listAccountSlice = createSlice({
    name: 'listAccount',
    initialState: initState,
    reducers: {
        setListAccount: (state, action) => {
            state.listAccount = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccount.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllAccount.fulfilled, (state, action) => {
                state.listAccount = action.payload.content;
                state.status = false
            })
    }
})

export const fetchAllAccount = createAsyncThunk('listAccount/fetchAllAccount', async (paramsSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/users/get_list_users`, {
            params: paramsSearch,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080/api/users/get_list_users',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
            }
        })
        console.log(res)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListAccount } = listAccountSlice.actions;
export default listAccountSlice.reducer;
// header: {
//     "Access-Control-Allow-Origin": "http://localhost:8080"
// }