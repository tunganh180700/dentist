import { configureStore } from "@reduxjs/toolkit";
import listAccountSlice from "./listAccountSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        listAccount: listAccountSlice,
        modal: modalSlice
    }
})

export default store;