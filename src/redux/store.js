import { configureStore } from "@reduxjs/toolkit";
import choosenAccountSlice from "./AccountSlice/choosenAccountSlice";
import listAccountSlice from "./AccountSlice/listAccountSlice";
import modalSlice from "./modalSlice";
import listPatientSlice from "./PatienSlice/listPatientSlice";


import choosenLaboSlice from "./LaboSlice/choosenLaboSlice";
import listLaboSlice from "./LaboSlice/listLaboSlice";

import choosenMaterialSlice from "./MaterialSlice/choosenMaterialSlice";
import listMaterialSlice from "./MaterialSlice/listMaterialSlice";


import choosenMaterialImportSlice from "./MaterialSlice/choosenMaterialImportSlice";
import listmaterialImportSlice from "./MaterialSlice/listMaterialImportSlice";


import choosenServiceAndCategorySlice from "./ServiceAndCategorySlice/choosenServiceAndCategorySlice";
import listServiceAndCategorySlice from "./ServiceAndCategorySlice/listServiceAndCategorySlice";


const store = configureStore({
    reducer: {
        listAccount: listAccountSlice,
        modal: modalSlice,
        choosenAccount: choosenAccountSlice,
        listPatient: listPatientSlice,

        choosenMaterial: choosenMaterialSlice,
        listMaterial: listMaterialSlice,

        choosenMaterialImport: choosenMaterialImportSlice,
        listMaterialImport: listmaterialImportSlice,


        choosenLabo: choosenLaboSlice,
        listLabo: listLaboSlice,

        choosenServiceAndCategory: choosenServiceAndCategorySlice,
        listServiceAndCategory: listServiceAndCategorySlice
    }
})

export default store;