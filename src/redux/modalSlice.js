import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOpenUpdateUser: false,
    isOpenDeleteAccount: false,
    isOpenDeletePatient: false,
    userId: 0,

    isOpenUpdateLabo: false,
    isOpenDeleteLabo: false,
    laboId: 0,

    isOpenUpdateMaterial: false,
    isOpenDeleteMaterial: false,
    materialId: 0,

    isOpenUpdateMaterialImport: false,
    isOpenDeleteMaterialImport: false,
    materialImportId: 0,

    isOpenUpdateMaterialExport: false,
    isOpenDeleteMaterialExport: false,
    materialExportId: 0,

    

    isOpenUpdateServiceAndCategory: false,
    isOpenDeleteServiceAndCategory: false,
    categoryServiceId: 0,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initState,
    reducers: {
        // setIsOpenUpdateUser: (state, action) => {
        //     state.isOpenUpdateUser = action.payload
        // },
        setIsOpenDeleteAccount: (state, action) => {
            state.isOpenDeleteAccount = action.payload
        },
        setIsOpenDeletePatient: (state, action) => {
            state.isOpenDeletePatient = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },

        setIsOpenDeleteMaterial: (state, action) => {
            state.isOpenDeleteMaterial = action.payload
        },
        setMaterialId: (state, action) => {
            state.materialId = action.payload
        },

        setIsOpenDeleteMaterialImport: (state, action) => {
            state.isOpenDeleteMaterialImport = action.payload
        },
        setMaterialImportId: (state,action) => {
            state.materialImportId = action.payload
        },

        setIsOpenDeleteMaterialExport: (state, action) => {
            state.isOpenDeleteMaterialExport = action.payload
        },
        setMaterialExportId: (state,action) => {
            state.materialExportId = action.payload
        },

        setIsOpenDeleteLabo: (state, action) => {
            state.isOpenDeleteLabo = action.payload
        },
        setLaboId: (state,action) => {
            state.laboId = action.payload
        },

        setIsOpenDeleteServiceAndCategory: (state, action) => {
            state.isOpenDeleteServiceAndCategory = action.payload
        },
        setCategoryServiceId: (state,action) => {
            state.categoryServiceId = action.payload
        }
    }
})
export const { setUserId } = modalSlice.actions;
export const { setLaboId } = modalSlice.actions;
export const { setMaterialId } = modalSlice.actions;
export const { setMaterialImportId } = modalSlice.actions;
export const { setMaterialExportId } = modalSlice.actions;

export const { setCategoryServiceId } = modalSlice.actions;

export default modalSlice.reducer;