import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { addSpecimensAPI, deleteSpecimenAPI, listSpecimenAPI, searchSpecimenAPI, updateSpecimensAPI, reportSpecimenAPI } from "../../config/baseAPI"
import { DELETE_FAIL, DELETE_SUCCESS, UPDATE_FAIL, UPDATE_SUCCESS } from "../../config/constant"
import axiosInstance from "../../config/customAxios"
import { toastCss } from "../toastCss"

const initState = {
    listSpecimen: [],
    index: 0,
    pageSize: 3,
    totalPage: 0,
    totalElements: 0,
    statusUpdateSpecimen: false,
    isUpdateSpecimen: false,
    statusDeleteSpecimen: false,
    isDeleteSpecimen: false,
    statusAddSpecimen: false,
    isAddSpecimen: false,
    statusSearchSpecimen: false,
    isSearchSpecimen: false,
    message: '',
    statusSpecimen: 0
}

const listSpecimenSlice = createSlice({
    name: 'listSpecimen',
    initialState: initState,
    reducers: {
        setListSpecimen: (state, action) => {
            state.listSpecimen = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSpecimen.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllSpecimen.fulfilled, (state, action) => {
                state.listSpecimen = action.payload.content;
                state.statusSpecimen = action.payload.status
                // state.pageSize = action.payload.pageSize
                state.status = false;
                state.totalElements = action.payload.totalElements;
                state.totalPage = action.payload.totalPages;
                state.isAddSpecimen = false;
                state.isDeleteSpecimen = false;
                state.isUpdateSpecimen = false;
                state.isSearchSpecimen = false;
            })
            .addCase(addSpecimen.pending, (state, action) => {
                state.statusAddSpecimen = true
            })
            .addCase(addSpecimen.fulfilled, (state, action) => {
                state.isAddSpecimen = true
            })
            // .addCase(deleteSpecimen.pending, (state, action) => {
            //     state.statusDeleteSpecimen = true
            // })
            // .addCase(deleteSpecimen.fulfilled, (state, action) => {
            //     state.isDeleteSpecimen = true
            // })
            .addCase(updateSpecimen.pending, (state, action) => {
                state.statusUpdateSpecimen = true
            })
            .addCase(updateSpecimen.fulfilled, (state, action) => {
                state.isUpdateSpecimen = true
            })
            .addCase(searchSpecimen.pending, (state, action) => {
                state.statusSearchSpecimen = true
            })
            .addCase(searchSpecimen.fulfilled, (state, action) => {
                state.listSpecimen = action.payload.content;
                state.isSearchSpecimen = true
                state.totalPage = action.payload.totalPages
                state.totalElements = action.payload.totalElements;
            })

    }
})

export const fetchAllSpecimen = createAsyncThunk('listSpecimen/fetchAllSpecimen', async (paramSearch) => {
    try {
        const res = await axiosInstance.get(listSpecimenAPI, {
            params: paramSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

// export const searchSpecimen = createAsyncThunk('listSpecimen/searchSpecimen', async (paramSearch) => {
//     try {
//         // const formValue = {
//         //     name: values.SpecimenName,
//         //     birthdate: values.birthdate,
//         //     gender: values.gender,
//         //     address: values.address,
//         //     phone: values.phone,
//         //     email: values.email,
//         // }
//         const res = await axiosInstance.get(searchSpecimenAPI, {
//             params: paramSearch
//         })
//         console.log(res)
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// })
export const searchSpecimen = createAsyncThunk('listSpecimen/searchSpecimen', async (paramSearch) => {
    try {

        const res = await axiosInstance.get(searchSpecimenAPI, {
            params: paramSearch
        })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
})


export const updateSpecimen = createAsyncThunk('listSpecimen/updateSpecimen', async (data) => {
    try {
        const res = await axiosInstance.put(
            updateSpecimensAPI + data.specimenId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})


// export const deleteSpecimens = createAsyncThunk('listSpecimens/deleteSpecimens', async (specimenId) => {
//     console.log('sss', specimenId)
//     try {
//         const res = await axiosInstance.delete(deleteSpecimensAPI + specimenId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return specimenId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

export const addSpecimen = createAsyncThunk('listSpecimen/addSpecimen', async (values) => {
    try {

        console.log('body=',values);
        const res = await axiosInstance.post(addSpecimensAPI, values)
        toast.success("Thêm thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm thất bại :(', toastCss)
    }
})

export const reportSpecimen = createAsyncThunk('listSpecimen/reportSpecimen', async (specimenId,values) => {
    try {

        console.log('body=',values);
        const res = await axiosInstance.post(reportSpecimenAPI+specimenId, values)
        toast.success("Báo cáo thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Báo cáo thất bại :(', toastCss)
    }
})

export const { setListSpecimen } = listSpecimenSlice.actions;
export default listSpecimenSlice.reducer;