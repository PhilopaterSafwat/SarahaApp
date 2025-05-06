import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    isLoding: false,
    error: {}
}
export const AddFavoriteMessage = createAsyncThunk("AddFavoriteMessageSlice/AddFavoriteMessage", async (messageId: string, { rejectWithValue }) => {
    try {
        const { data } = await axios.put("https://whisperapi-production.up.railway.app/message/addFavorite", { messageId })
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data || { message: "حدث خطأ غير متوقع" })
    }
})

const AddFavoriteMessageSlice = createSlice({
    name: 'AddFavoriteMessage',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(AddFavoriteMessage.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoding = false
        });
        bulider.addCase(AddFavoriteMessage.pending, (state) => {
            state.isLoding = true
        });
    },
    reducers: {

    }
})
export const AddFavoriteMessageReducer = AddFavoriteMessageSlice.reducer