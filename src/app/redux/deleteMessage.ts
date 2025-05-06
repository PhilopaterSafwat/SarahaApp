import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    isLoding: false,
    error: {}
}
export const deleteMessage = createAsyncThunk("deleteMessageSlice/deleteMessage", async (recipientId: string, { rejectWithValue }) => {
    try {
        const { data } = await axios.put("https://whisperapi-production.up.railway.app/message/delete", { recipientId })

        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data || { message: "حدث خطأ غير متوقع" })
    }
})

const deleteMessageSlice = createSlice({
    name: 'Deletemessage',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(deleteMessage.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoding = false
        });
        bulider.addCase(deleteMessage.pending, (state) => {
            state.isLoding = true
        });
    },
    reducers: {

    }
})
export const deleteMessageReducer = deleteMessageSlice.reducer