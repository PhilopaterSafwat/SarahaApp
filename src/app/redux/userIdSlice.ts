import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        user: {
            id: "",
            userName: "",
            email: "",
            gender: ""
        }
    },
    isLoding: false,
    error: {}
}
export const getUserById = createAsyncThunk("UserSlice/getUser", async (id: string) => {

    try {
        const { data } = await axios.get(`https://whisperapi-production.up.railway.app/user/profile/${id}`, {
            headers: {
                "accept-language": "en"

            }
        })
        
        return data.data
    } catch (error) {
        console.log(error);

    }
})
const UserIdSlice = createSlice({
    name: 'UserIdSlice',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(getUserById.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoding = false
        });
        bulider.addCase(getUserById.pending, (state) => {
            state.isLoding = true
        });
    },
    reducers: {

    }
})
export const UserIdReducer = UserIdSlice.reducer