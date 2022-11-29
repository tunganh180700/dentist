import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listIncomeAPI} from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"
import axiosInstance from "../../config/customAxios"

const initState = {
    listIncome: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    // statusUpdateIncome: false,
    // isUpdateIncome: false,
    // statusDeleteIncome: false,
    // isDeleteIncome: false,
    // statusAddIncome: false,
    // isAddIncome: false,
    message: ''
}

const listIncomeSlice = createSlice({
    name: 'listIncome',
    initialState: initState,
    reducers: {
        setListIncome: (state, action) => {
            state.listIncome = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllIncome.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllIncome.fulfilled, (state, action) => {
                state.listIncome = action.payload;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                // state.isUpdateIncome = false;
                // state.isDeleteIncome = false;
                // state.isAddIncome = false;
                state.message = action.payload.message
            })
            // .addCase(updateIncome.pending, (state, action) => {
            //     state.statusUpdateIncome = true
            // })
            // .addCase(updateIncome.fulfilled, (state, action) => {
            //     state.isUpdateIncome = true
            // })
            // .addCase(deleteIncome.pending, (state, action) => {
            //     state.statusDeleteIncome = true
            // })
            // .addCase(deleteIncome.fulfilled, (state, action) => {
            //     state.isDeleteIncome = true
            // })
            // .addCase(addIncome.pending, (state, action) => {
            //     state.statusAddIncome = true
            // })
            // .addCase(addIncome.fulfilled, (state, action) => {
            //     state.isAddIncome = true
            // })
    }
})

export const fetchAllIncome = createAsyncThunk('listIncome/fetchAllIncome', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listIncomeAPI, {
            params: paramsSearch,
        })
        console.log('data income: ', res.data);
        return res.data
        
    } catch (error) {
        console.log(error)
    }
})

// export const updateIncome = createAsyncThunk('listIncome/updateIncome', async (data) => {
//     // console.log(data.userId)
//     try {
//         const res = await axios.put(
//             updateIncomeAPI + data.IncomeId, data
//         )
//         console.log(res)
//         toast.success(UPDATE_SUCCESS, toastCss)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error(UPDATE_FAIL, toastCss)

//     }
// })

// export const deleteIncome = createAsyncThunk('listIncome/deleteIncome', async (IncomeId) => {
//     console.log(IncomeId)
//     try {
//         const res = await axios.delete(deleteIncomeAPI + IncomeId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return IncomeId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

// export const addIncome = createAsyncThunk('listIncome/addIncome', async (values) => {
//     try {
//         const formValue = {
//             IncomeName: values.IncomeName,
//             phone: values.phone,
//             totalMoney: values.totalMoney
//         }
//         console.log(values)
//         const res = await axios.post(addIncomeAPI, formValue)
//         toast.success("Thêm vật liệu thành công !!!!!", toastCss)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error('Thêm mới thất bại :(', toastCss)
//     }
// })
export const { setListIncome } = listIncomeSlice.actions;
export default listIncomeSlice.reducer;