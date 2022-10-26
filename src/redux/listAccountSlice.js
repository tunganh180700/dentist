import { Rtt, TonalitySharp } from "@mui/icons-material"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listUserAPI, updateAccountAPI, deleteAccountAPI } from "../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "./toastCss"

const initState = {
    listAccount: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    pageNumber: 0,
    totalElements: 0,
    totalPage: 0,
    statusUpdateAccount: false,
    isUpdateAccount: false,
    statusDeleteAccount: false,
    isDeleteAccount: false,
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
                state.totalPage = action.payload.totalPages;
                state.isUpdateAccount = false;
                state.isDeleteAccount = false;
            })
            .addCase(updateAccount.pending, (state, action) => {
                state.statusUpdateAccount = true
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isUpdateAccount = true
            })
            .addCase(deleteAccount.pending, (state, action) => {
                state.statusDeleteAccount = true
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.isDeleteAccount = true
            })

    }
})

export const fetchAllAccount = createAsyncThunk('listAccount/fetchAllAccount', async (paramsSearch) => {
    try {
        const res = await axios.get(listUserAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateAccount = createAsyncThunk('listAccount/updateAccount', async (data) => {
    try {
        const tempData = {
            fullName: data.name,
            userName: data.username,
            birthdate: data.birthdate,
            phone: data.phone,
            salary: 1,
            roleId: 1
        }
        const res = await axios.put(
            updateAccountAPI + data.id, tempData
        )
        console.log(res)
        toast.success("Cập nhật thành công !!!!!", toastCss)
        return res.data
    } catch (error) {
        toast.error('Cập nhật thất bại :(', toastCss)

    }
})

export const deleteAccount = createAsyncThunk('listAccount/deleteAccount', async (userId) => {
    console.log(userId)
    try {
        const res = await axios.delete(deleteAccountAPI + userId)
        toast.success("Xóa thành công !!!!! ", toastCss)
        return userId
    } catch (error) {
        toast.error('Xóa thất bại :(', toastCss)

    }
})

export const { setListAccount } = listAccountSlice.actions;
export default listAccountSlice.reducer;