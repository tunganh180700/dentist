import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { listTimekeepingAPI } from "../../config/baseAPI"
import axiosInstance from "../../config/customAxios"

const initState = {
    listTimekeeping: [],
    pagination: [],
    index: 0,
    pageSize: 3,
    totalPage: 0,
    totalElements: 0,
    message: '',
}

const listTimekeepingSlice = createSlice({
    name: 'listTimekeeping',
    initialState: initState,
    reducers: {
        setListTimekeeping: (state, action) => {
            state.listTimekeeping = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTime.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllTime.fulfilled, (state, action) => {
                state.listTimekeeping = action.payload.content;
                state.totalElements = action.payload.totalElements;
                state.totalPage = action.payload.totalPages;
            })
    }
})

export const fetchAllTime = createAsyncThunk('listTimekeeping/fetchAllTime', async (paramSearch) => {
    try {
        const res = await axiosInstance.get(listTimekeepingAPI, {
            params: paramSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListTimekeeping } = listTimekeepingSlice.actions;
export default listTimekeepingSlice.reducer;