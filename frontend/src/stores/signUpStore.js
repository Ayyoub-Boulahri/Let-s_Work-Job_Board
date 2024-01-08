import { configureStore, createSlice } from "@reduxjs/toolkit";

const typeUserSlice = createSlice({
    name: "typeUser",
    initialState: {value: ""},
    reducers: {
        setCompany: (state) => {
            state.value = "company";
        },
        setEmployee: (state) => {
            state.value = "employee";
        }
    }
});

export const { setCompany, setEmployee } = typeUserSlice.actions;

export const signUpStore = configureStore({
    reducer: {
        typeUser: typeUserSlice.reducer,
    }
})