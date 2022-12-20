import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getListScheduleAPI,addScheduleAPI,updateScheduleAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"

const initState = {
    listSchedule: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdateSchedule: false,
    isUpdateSchedule: false,
    // statusDeleteLabo: false,
    // isDeleteLabo: false,
    statusAddSchedule: false,
    isAddSchedule: false,
    message: ''
}

const listScheduleSlice = createSlice({
    name: 'listSchedule',
    initialState: initState,
    reducers: {
        setListSchedule: (state, action) => {
            state.listSchedule = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchedule.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllSchedule.fulfilled, (state, action) => {
                state.listSchedule = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;

                state.message = action.payload.message
            })
            .addCase(updateSchedule.pending, (state, action) => {
                state.statusUpdateSchedule = true
            })
            .addCase(updateSchedule.fulfilled, (state, action) => {
                state.isUpdateSchedule = true
            })
            // .addCase(deleteLabo.pending, (state, action) => {
            //     state.statusDeleteLabo = true
            // })
            // .addCase(deleteLabo.fulfilled, (state, action) => {
            //     state.isDeleteLabo = true
            // })
            .addCase(addSchedule.pending, (state, action) => {
                state.statusAddSchedule = true
            })
            .addCase(addSchedule.fulfilled, (state, action) => {
                state.isAddSchedule = true
            })
    }
})

export const fetchAllSchedule = createAsyncThunk('listSchedule/fetchAllSchedule', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(getListScheduleAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})


export const addSchedule = createAsyncThunk('listSchedule/addSchedule', async (values) => {
    try {

        console.log(values)
        const res = await axiosInstance.post(addScheduleAPI, values)
        toast.success("Thêm vật liệu thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})

export const updateSchedule = createAsyncThunk('listSchedule/updateSchedule', async (data) => {
    // console.log(data.userId)
    try {
        const res = await axiosInstance.put(
            updateScheduleAPI + data.waitingRoomId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})

export const { setListSchedule } = listScheduleSlice.actions;
export default listScheduleSlice.reducer;