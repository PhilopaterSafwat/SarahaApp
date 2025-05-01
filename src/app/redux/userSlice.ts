import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        user: {
            id: "",
            userName: "",
            email: "",
            gender: "",

        },
        messages: {
            message: ""
        }
    },
    isLoding: false,
    error: {}
}
export const getUser = createAsyncThunk("UserSlice/getUser", async () => {
    const token = localStorage.getItem("token") || ""
    const { data } = await axios.get("https://whisperapi-production.up.railway.app/user/profile", { headers: { Authorization: `Bearer ${JSON.parse(token)}` } })
    // console.log(data.data);

    return data.data
})
const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(getUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoding = false
        });
        bulider.addCase(getUser.pending, (state) => {
            state.isLoding = true
        });
    },
    reducers: {

    }
})
export const UserReducer = UserSlice.reducer