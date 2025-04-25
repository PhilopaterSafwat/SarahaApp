import { createSlice } from "@reduxjs/toolkit";

let tokenFromStorage = "";
if (typeof window !== "undefined") {
    try {
        tokenFromStorage = JSON.parse(localStorage.getItem("token")) || "";
    } catch (e) {
        tokenFromStorage = "";
    }
}

// الحالة الابتدائية
const initialState = {
    token: tokenFromStorage
};

const UserTokenSlice = createSlice({
    name: 'UserTokenSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("token", JSON.stringify(state.token))
        }
    }
})
export const UserTokenReducer = UserTokenSlice.reducer
export const { setToken } = UserTokenSlice.actions