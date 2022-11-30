import { configureStore } from "@reduxjs/toolkit";
import choosenAccountSlice from "./AccountSlice/choosenAccountSlice";
import listAccountSlice from "./AccountSlice/listAccountSlice";
import modalSlice from "./modalSlice";
import choosenPatientSlice from "./PatienSlice/choosenPatientSlice";
import listPatientSlice from "./PatienSlice/listPatientSlice";
import listTimekeepingSlice from "./TimekeepingSlice/listTimekeepingSlice";


import choosenLaboSlice from "./LaboSlice/choosenLaboSlice";
import listLaboSlice from "./LaboSlice/listLaboSlice";

import choosenMaterialSlice from "./MaterialSlice/choosenMaterialSlice";
import listMaterialSlice from "./MaterialSlice/listMaterialSlice";


import choosenMaterialImportSlice from "./MaterialSlice/choosenMaterialImportSlice";
import listmaterialImportSlice from "./MaterialSlice/listMaterialImportSlice";


import choosenMaterialExportSlice from "./MaterialSlice/choosenMaterialExportSlice";
import listMaterialExportSlice from "./MaterialSlice/listMaterialExportSlice";



import listIncomeSlice from "./IncomeSlice/listIncomeSlice";

import listCategorySlice from "./ServiceAndCategorySlice/listCategorySlice";

const store = configureStore({
    reducer: {
        listAccount: listAccountSlice,
        modal: modalSlice,
        choosenAccount: choosenAccountSlice,
        listPatient: listPatientSlice,
        choosenPatient: choosenPatientSlice,

        choosenMaterial: choosenMaterialSlice,
        listMaterial: listMaterialSlice,

        choosenMaterialImport: choosenMaterialImportSlice,
        listMaterialImport: listmaterialImportSlice,

        choosenMaterialExport: choosenMaterialExportSlice,
        listMaterialExport: listMaterialExportSlice,


        choosenLabo: choosenLaboSlice,
        listLabo: listLaboSlice,



        listIncome: listIncomeSlice,

        listCategory: listCategorySlice
    }
})

export default store;