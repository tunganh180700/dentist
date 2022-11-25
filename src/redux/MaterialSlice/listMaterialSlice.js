import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { listMaterialAPI, updateMaterialAPI, deleteMaterialAPI, addMaterialAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    listMaterial: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 0,
    statusUpdateMaterial: false,
    isUpdateMaterial: false,
    statusDeleteMaterial: false,
    isDeleteMaterial: false,
    statusAddMaterial: false,
    isAddMaterial: false,
    message: ''
}

const listMaterialSlice = createSlice({
    name: 'listMaterial',
    initialState: initState,
    reducers: {
        setListMaterial: (state, action) => {
            state.listMaterial = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMaterial.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllMaterial.fulfilled, (state, action) => {
                state.listMaterial = action.payload.content;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                state.totalPage = action.payload.totalPages;
                state.isUpdateMaterial = false;
                state.isDeleteMaterial = false;
                state.isAddMaterial = false;
                state.message = action.payload.message
            })
            .addCase(updateMaterial.pending, (state, action) => {
                state.statusUpdateMaterial = true
            })
            .addCase(updateMaterial.fulfilled, (state, action) => {
                state.isUpdateMaterial = true
            })
            .addCase(deleteMaterial.pending, (state, action) => {
                state.statusDeleteMaterial = true
            })
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                state.isDeleteMaterial = true
            })
            .addCase(addMaterial.pending, (state, action) => {
                state.statusAddMaterial = true
            })
            .addCase(addMaterial.fulfilled, (state, action) => {
                state.isAddMaterial = true
            })
    }
})

export const fetchAllMaterial = createAsyncThunk('listMaterial/fetchAllMaterial', async (paramsSearch) => {
    try {
        const res = await axios.get(listMaterialAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateMaterial = createAsyncThunk('listMaterial/updateMaterial', async (data) => {
    // console.log(data.userId)
    try {
        const res = await axios.put(
            updateMaterialAPI + data.materialId, data
        )
        console.log(res)
        toast.success(UPDATE_SUCCESS, toastCss)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(UPDATE_FAIL, toastCss)

    }
})

export const deleteMaterial = createAsyncThunk('listMaterial/deleteMaterial', async (materialId) => {
    console.log(materialId)
    try {
        const res = await axios.delete(deleteMaterialAPI + materialId)
        toast.success(DELETE_SUCCESS, toastCss)
        return materialId
    } catch (error) {
        toast.error(DELETE_FAIL, toastCss)

    }
})

export const addMaterial = createAsyncThunk('listMaterial/addMaterial', async (values) => {
    try {
        const formValue = {
            materialName: values.materialName,
            unit: values.unit,
            amount: values.amount,
            price: values.price
        }
        console.log(values)
        const res = await axios.post(addMaterialAPI, formValue)
        toast.success("Thêm vật liệu thành công !!!!!", toastCss)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error('Thêm mới thất bại :(', toastCss)
    }
})
export const { setListMaterial } = listMaterialSlice.actions;
export default listMaterialSlice.reducer;