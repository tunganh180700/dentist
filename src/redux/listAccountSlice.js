import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listUserAPI } from "../config/baseAPI"

const initState = {
    listAccount: [],
    status: false,
    number: 0,
    index: 0
}

const listAccountSlice = createSlice({
    name: 'listAccount',
    initialState: initState,
    reducers: {
        setListAccount: (state, action) => {
            state.listAccount = action.payload
        },
        setPaginationListAccount: (state, action) => {
            state.listAccount = []
            state.number = 0
            state.index = 0
        },
        setIndexPagination: (state, action) => {
            state.index = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccount.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllAccount.fulfilled, (state, action) => {
                state.listAccount = action.payload.content;
                state.status = false;
                state.number = action.payload.content.length
            })
    }
})

export const fetchAllAccount = createAsyncThunk('listAccount/fetchAllAccount', async (paramsSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/users/get_list_users`, {
            params: paramsSearch,
        })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListAccount, setPaginationListAccount, setIndexPagination } = listAccountSlice.actions;
export default listAccountSlice.reducer;