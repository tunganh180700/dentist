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

    treatmentId: 0,
    

    isOpenUpdateSpecimens: false,
    isOpenDeleteSpecimens: false,


    isOpenUpdateCategory: false,
    isOpenDeleteCategory: false,
    categoryServiceId: 0,

    isOpenUpdateService: false,
    isOpenDeleteService: false,
    serviceId: 0,
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

        setIsOpenDeleteCategory: (state, action) => {
            state.isOpenDeleteCategory = action.payload
        },
        setCategoryServicedId: (state,action) => {
            state.categoryServiceId = action.payload
        },
        setIsOpenDeleteService: (state, action) => {
            state.isOpenDeleteService = action.payload
        },
        setIsOpenDeleteSpecimens: (state, action) => {
            state.isOpenDeleteSpecimens = action.payload
        },
        setServicedId: (state,action) => {
            state.serviceId = action.payload
        },
        setTreatmentId: (state,action) => {
            state.treatmentId = action.payload
        }
    }
})
export const { setUserId } = modalSlice.actions;
export const { setLaboId } = modalSlice.actions;
export const { setMaterialId } = modalSlice.actions;
export const { setMaterialImportId } = modalSlice.actions;
export const { setMaterialExportId } = modalSlice.actions;

export const { setCategoryServicedId } = modalSlice.actions;
export const { setServicedId } = modalSlice.actions;

export const { setTreatmentId} = modalSlice.actions;

export default modalSlice.reducer;