import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listUserAPI } from "../config/baseAPI"

const initState = {
    listAccount: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    pageNumber: 0,
    totalElements: 0,
    totalPage: 0
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
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalElements = action.payload.totalElements;
                state.totalPage = action.payload.totalPages
            })
    }
})

export const fetchAllAccount = createAsyncThunk('listAccount/fetchAllAccount', async (paramsSearch) => {
    try {
        const res = await axios.get(listUserAPI, {
            params: paramsSearch,
        })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListAccount } = listAccountSlice.actions;
export default listAccountSlice.reducer;