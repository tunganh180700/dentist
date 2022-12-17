import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { listWaitingAPI } from "../../config/baseAPI"
import axiosInstance from "../../config/customAxios"

const initState = {
    listWaiting: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    totalElements: 0,
    message: ''
}

const listWaitingSlice = createSlice({
    name: 'listWaiting',
    initialState: initState,
    reducers: {
        setListWaiting: (state, action) => {
            state.listWaiting = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllWaiting.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllWaiting.fulfilled, (state, action) => {
                state.listWaiting = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
                state.message = action.payload.message
            })
    }
})

export const fetchAllWaiting = createAsyncThunk('listWaiting/fetchAllWaiting', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listWaitingAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const { setListWaiting } = listWaitingSlice.actions;
export default listWaitingSlice.reducer;