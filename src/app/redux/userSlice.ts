import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        user: {
            id: "",
            userName: "",
            email: "",
            gender: "",
            _id: ""
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
    try {
        const { data } = await axios.get("https://whisperapi-production.up.railway.app/user/profile", { headers: { Authorization: `Bearer ${JSON.parse(token)}` } })
        return data.data
    } catch (error: any) {
        console.log(error);
        console.log(error.response.data.msg);
        return error.response.data.msg
    }

})
const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload === "TokenExpiredError: jwt expired") {
                localStorage.removeItem("token")
                return;
            }
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