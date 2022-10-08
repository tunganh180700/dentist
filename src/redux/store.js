import { configureStore } from "@reduxjs/toolkit";
import listAccountSlice from "./listAccountSlice";

const store = configureStore({
    reducer: {
        listAccount: listAccountSlice
    }
})

export default store;