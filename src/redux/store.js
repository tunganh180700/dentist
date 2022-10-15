import { configureStore } from "@reduxjs/toolkit";
import choosenAccountSlice from "./choosenAccountSlice";
import listAccountSlice from "./listAccountSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        listAccount: listAccountSlice,
        modal: modalSlice,
        choosenAccount: choosenAccountSlice
    }
})

export default store;