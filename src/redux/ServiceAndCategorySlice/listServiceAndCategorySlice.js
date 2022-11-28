import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listServiceAndCategoryAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    listServiceAndCategory: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdateServiceAndCategory: false,
    isUpdateServiceAndCategory: false,
    statusDeleteServiceAndCategory: false,
    isDeleteServiceAndCategory: false,
    statusAddServiceAndCategory: false,
    isAddServiceAndCategory: false,
    listServiceDTO: [],
    message: ''
}

const listServiceAndCategorySlice = createSlice({
    name: 'listServiceAndCategory',
    initialState: initState,
    reducers: {
        setListServiceAndCategory: (state, action) => {
            state.listServiceAndCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllServiceAndCategory.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllServiceAndCategory.fulfilled, (state, action) => {
                state.listServiceAndCategory = action.payload;

                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                // state.isUpdateServiceAndCategory = false;
                // state.isDeleteServiceAndCategory = false;
                // state.isAddServiceAndCategory = false;
                state.message = action.payload.message
            })

        // .addCase(updateServiceAndCategory.pending, (state, action) => {
        //     state.statusUpdateServiceAndCategory = true
        // })
        // .addCase(updateServiceAndCategory.fulfilled, (state, action) => {
        //     state.isUpdateServiceAndCategory = true
        // })
        // .addCase(deleteServiceAndCategory.pending, (state, action) => {
        //     state.statusDeleteServiceAndCategory = true
        // })
        // .addCase(deleteServiceAndCategory.fulfilled, (state, action) => {
        //     state.isDeleteServiceAndCategory = true
        // })
        // .addCase(addServiceAndCategory.pending, (state, action) => {
        //     state.statusAddServiceAndCategory = true
        // })
        // .addCase(addServiceAndCategory.fulfilled, (state, action) => {
        //     state.isAddServiceAndCategory = true
        // })
    }
})

export const fetchAllServiceAndCategory = createAsyncThunk('listServiceAndCategory/fetchAllServiceAndCategory', async (paramsSearch) => {
    try {
        const res = await axios.get(listServiceAndCategoryAPI, {
            params: paramsSearch,
        })
        console.log(res.data)

        return res.data
    } catch (error) {
        console.log(error)
    }
})



// export const updateMaterial = createAsyncThunk('listMaterial/updateMaterial', async (data) => {
//     // console.log(data.userId)
//     try {
//         const res = await axios.put(
//             updateMaterialAPI + data.materialId, data
//         )
//         console.log(res)
//         toast.success(UPDATE_SUCCESS, toastCss)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error(UPDATE_FAIL, toastCss)

//     }
// })

// export const deleteMaterial = createAsyncThunk('listMaterial/deleteMaterial', async (materialId) => {
//     console.log(materialId)
//     try {
//         const res = await axios.delete(deleteMaterialAPI + materialId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return materialId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

// export const addMaterial = createAsyncThunk('listMaterial/addMaterial', async (values) => {
//     try {
//         const formValue = {
//             materialName: values.materialName,
//             unit: values.unit,
//             amount: values.amount,
//             price: values.price
//         }
//         console.log(values)
//         const res = await axios.post(addMaterialAPI, formValue)
//         toast.success("Thêm vật liệu thành công !!!!!", toastCss)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error('Thêm mới thất bại :(', toastCss)
//     }
// })
export const { setListServiceAndCategory } = listServiceAndCategorySlice.actions;
export default listServiceAndCategorySlice.reducer;