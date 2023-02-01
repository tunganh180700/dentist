import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { listConfirmWaitingAPI } from "../../config/baseAPI"
import axiosInstance from "../../config/customAxios"

const initState = {
    listConfirmWaiting: [],
    // pagination: [],
    status: false,
    // index: 0,
    // pageSize: 3,
    // totalPage: 0,
    // totalElements: 0,
    message: ''
}

const listConfirmWaitingSlice = createSlice({
    name: 'listConfirmWaiting',
    initialState: initState,
    reducers: {
        setListConfirmWaiting: (state, action) => {
            state.listConfirmWaiting = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllConfirmWaiting.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllConfirmWaiting.fulfilled, (state, action) => {
                state.listConfirmWaiting = action.payload;
                state.status = false;
                // state.pageNumber = action.payload.pageNumber;
                // state.totalPage = action.payload.totalPages;
                // state.totalElements = action.payload.totalElements;
                state.message = action.payload.message
            })
    }
})

export const fetchAllConfirmWaiting = createAsyncThunk('listConfirmWaiting/fetchAllConfirmWaiting', async () => {
    try {
        const res = await axiosInstance.get(listConfirmWaitingAPI);
        return res.data
    } catch (error) {
        console.log('error = ',error)
    }
})

export const { setListConfirmWaiting } = listConfirmWaitingSlice.actions;
export default listConfirmWaitingSlice.reducer;