import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "isAuthenticated",
    initialState: {
        value: {
            userId: null,
            email: "",
            auth: false,
            typeUser: ""
        }
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.value = action.payload;
        },
        setLoginOut: (state) => {
            state.value = { userId: null, email: "", auth: false, typeUser: "" }
        }
    }
});

export const { setAuthenticated, setLoginOut } = authSlice.actions;


export const authStore = configureStore({
    reducer: {
        isAuthenticated: authSlice.reducer
    }
})