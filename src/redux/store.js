import { configureStore } from "@reduxjs/toolkit";
import choosenAccountSlice from "./AccountSlice/choosenAccountSlice";
import listAccountSlice from "./AccountSlice/listAccountSlice";
import modalSlice from "./modalSlice";
import choosenPatientSlice from "./PatienSlice/choosenPatientSlice";
import listPatientSlice from "./PatienSlice/listPatientSlice";

const store = configureStore({
    reducer: {
        listAccount: listAccountSlice,
        modal: modalSlice,
        choosenAccount: choosenAccountSlice,
        listPatient: listPatientSlice,
        choosenPatient: choosenPatientSlice
    }
})

export default store;